import { useCallback, useEffect, useRef } from 'react';

const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4';

interface CinematicBackgroundProps {
  className: string;
}

function useVideoFade() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);
  const opacityRef = useRef(0);

  const setVideoOpacity = useCallback((value: number) => {
    opacityRef.current = value;
    if (videoRef.current) {
      videoRef.current.style.opacity = String(value);
    }
  }, []);

  const cancelFade = useCallback(() => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  const fadeTo = useCallback(
    (targetOpacity: number, duration = 500) => {
      cancelFade();

      const startOpacity = opacityRef.current;
      const startedAt = performance.now();

      const animate = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const nextOpacity = startOpacity + (targetOpacity - startOpacity) * progress;

        setVideoOpacity(nextOpacity);

        if (progress < 1) {
          frameRef.current = window.requestAnimationFrame(animate);
        } else {
          frameRef.current = null;
        }
      };

      frameRef.current = window.requestAnimationFrame(animate);
    },
    [cancelFade, setVideoOpacity]
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return undefined;
    }

    const handleLoadedData = () => {
      fadingOutRef.current = false;
      fadeTo(1);
    };

    const handleTimeUpdate = () => {
      if (!Number.isFinite(video.duration)) {
        return;
      }

      const remaining = video.duration - video.currentTime;
      if (remaining <= 0.55 && !fadingOutRef.current) {
        fadingOutRef.current = true;
        fadeTo(0);
      }
    };

    const handleEnded = () => {
      cancelFade();
      setVideoOpacity(0);

      window.setTimeout(() => {
        video.currentTime = 0;
        fadingOutRef.current = false;
        void video.play();
        fadeTo(1);
      }, 100);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      handleLoadedData();
    }

    return () => {
      cancelFade();
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [cancelFade, fadeTo, setVideoOpacity]);

  return videoRef;
}

export function CinematicBackground({ className }: CinematicBackgroundProps) {
  const videoRef = useVideoFade();

  return (
    <video
      ref={videoRef}
      className={className}
      src={HERO_VIDEO_URL}
      muted
      autoPlay
      playsInline
      preload="auto"
      style={{ opacity: 0 }}
    />
  );
}
