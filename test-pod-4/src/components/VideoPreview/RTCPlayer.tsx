import React, { useEffect, useRef } from 'react';

interface RTSPtoWebRTCPlayerProps {
  webrtcUrl: string;
}

const RTSPtoWebRTCPlayer: React.FC<RTSPtoWebRTCPlayerProps> = ({ webrtcUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const startPlay = (videoEl: HTMLVideoElement, url: string) => {
      const webrtc = new RTCPeerConnection({
        iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }],
      });

      webrtc.ontrack = (event) => {
        console.log(`${event.streams.length} track is delivered`);
        videoEl.srcObject = event.streams[0];
        videoEl.play();
      };

      webrtc.addTransceiver('video', { direction: 'sendrecv' });

      webrtc.onnegotiationneeded = async () => {
        const offer = await webrtc.createOffer();
        await webrtc.setLocalDescription(offer);

        fetch(url, {
          method: 'POST',
          body: new URLSearchParams({ data: btoa(webrtc.localDescription?.sdp || '') }),
        })
            .then((response) => response.text())
            .then((data) => {
              try {
                webrtc.setRemoteDescription(
                    new RTCSessionDescription({ type: 'answer', sdp: atob(data) })
                );
              } catch (e) {
                console.warn(e);
              }
            });
      };

      const webrtcSendChannel = webrtc.createDataChannel('rtsptowebSendChannel');

      webrtcSendChannel.onopen = () => {
        console.log(`${webrtcSendChannel.label} has opened`);
        webrtcSendChannel.send('ping');
      };

      webrtcSendChannel.onclose = () => {
        console.log(`${webrtcSendChannel.label} has closed`);
        startPlay(videoEl, url); // Restart the stream on close
      };

      webrtcSendChannel.onmessage = (event) => {
        console.log(event.data);
      };
    };

    if (videoRef.current && webrtcUrl) {
      startPlay(videoRef.current, webrtcUrl);
    }
  }, [webrtcUrl]);

  return (
      <div>
        <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      </div>
  );
};

export default RTSPtoWebRTCPlayer;
