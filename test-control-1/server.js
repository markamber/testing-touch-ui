import express from 'express';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createRtspToHlsServer = (port = 8080) => {
    const app = express();
    const hlsFolder = path.join(__dirname, 'hls');

    // Ensure HLS folder exists
    if (!fs.existsSync(hlsFolder)){
        fs.mkdirSync(hlsFolder);
    }

    // Function to start FFmpeg process for HLS
    const startFFmpeg = (rtspUrl) => {
        const ffmpeg = spawn('ffmpeg', [
            '-i', rtspUrl,
            '-c', 'copy', // Correct stream copying
            '-start_number', '0',
            '-hls_time', '2',
            '-hls_list_size', '5',
            '-f', 'hls',
            path.join(hlsFolder, 'output.m3u8')
        ]);

        ffmpeg.stdout.on('data', (data) => {
            console.log(`FFmpeg stdout: ${data}`);
        });

        ffmpeg.stderr.on('data', (data) => {
            console.error(`FFmpeg stderr: ${data}`);
        });

        ffmpeg.on('close', (code) => {
            console.log(`FFmpeg process exited with code ${code}`);
        });

        return ffmpeg;
    };


    // Route to request the video stream
    app.get('/stream', (req, res) => {
        const rtspUrl = req.query.url; // Assuming the RTSP URL is passed as a query parameter

        if (!rtspUrl) {
            return res.status(400).send('RTSP URL is required');
        }

        // Start FFmpeg process for the RTSP stream
        startFFmpeg(rtspUrl);

        // Serve the HLS playlist
        res.sendFile(path.join(hlsFolder, 'output.m3u8'));
    });

    // Serve static files (HLS segments and playlist)
    app.use('/hls', express.static(hlsFolder));

    // Start the Express server
    app.listen(port, () => {
        console.log(`RTSP to HLS server is running on port ${port}`);
    });
};

export default createRtspToHlsServer;
