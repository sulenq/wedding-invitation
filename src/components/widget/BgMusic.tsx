"use client";

import { AppIcon } from "@/components/widget/AppIcon";
import { DraggableBtn } from "@/components/widget/DraggableBtn";
import { Circle } from "@chakra-ui/react";
import { MusicIcon, PlayIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface BgMusicProps {
  isOpened: boolean;
}
export const BgMusic = (props: BgMusicProps) => {
  // Props
  const { isOpened, ...restProps } = props;

  // States
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      if (isOpened && !isPlaying) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Still blocked or failed
            setIsPlaying(false);
          });
      }
    };

    if (isOpened && !isPlaying) {
      // Initial attempt
      handlePlay();

      // Mobile Gesture Fallback:
      // iOS/Android require a valid gesture like 'touchend' or 'click' to unlock audio.
      const gestures = ["touchend", "click", "mousedown", "touchstart"];
      const onGesture = () => {
        handlePlay();
      };

      gestures.forEach((event) => {
        window.addEventListener(event, onGesture, { once: true });
      });

      return () => {
        gestures.forEach((event) => {
          window.removeEventListener(event, onGesture);
        });
      };
    }
  }, [isOpened, isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {});
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={"/assets/music/bgMusic.mp3"}
        loop
        preload={"auto"}
        onError={() => {
          // Handle unsuitable resource silently
          setIsPlaying(false);
        }}
      />

      <DraggableBtn
        // className={"debug"}
        iconButton
        rounded={"full"}
        bg={"d3"}
        visibility={isOpened ? "visible" : "hidden"}
        opacity={isOpened ? 1 : 0}
        transition={"300ms"}
        onClick={togglePlay}
        {...restProps}
      >
        <Circle
          p={"8px"}
          w={"36px"}
          h={"36px"}
          bg={"d4"}
          color={"light"}
          animation={isPlaying ? "rotate360 10s linear infinite" : ""}
        >
          <AppIcon
            icon={isPlaying ? MusicIcon : PlayIcon}
            mr={isPlaying ? "2px" : ""}
          />
        </Circle>
      </DraggableBtn>

      <style jsx global>{`
        body.is-opened .music-control {
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};
