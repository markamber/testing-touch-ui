import RTCPlayer from "./RTCPlayer.tsx";
import {Card} from "@mantine/core";

const VideoPreview = () => {
    const webrtcUrl = 'http://192.168.20.166:8083/stream/27aec28e-6181-4753-9acd-0456a75f0289/channel/0/webrtc';

    return (
        <Card w={400} withBorder>
            <RTCPlayer webrtcUrl={webrtcUrl} />
        </Card>
    )
};

export default VideoPreview;
