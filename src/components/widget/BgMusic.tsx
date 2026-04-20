"use client";

import { AppIcon } from "@/components/widget/AppIcon";
import { DraggableBtn } from "@/components/widget/DraggableBtn";
import { Circle } from "@chakra-ui/react";
import { MusicIcon } from "lucide-react";
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
    const handleOpen = () => {
      if (audioRef.current) {
        const audio = audioRef.current;
        const playPromise = audio.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {
              // Play failed (likely missing file or auto-play restriction)
              setIsPlaying(false);
            });
        }
      }
    };

    if (isOpened) handleOpen();
  }, [isOpened]);

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
        bg={"gray.700"}
        visibility={isOpened ? "visible" : "hidden"}
        opacity={isOpened ? 1 : 0}
        transition={"300ms"}
        onClick={togglePlay}
        {...restProps}
      >
        <Circle
          p={"8px"}
          aspectRatio={1}
          bg={"bg.muted"}
          color={"light"}
          animation={isPlaying ? "rotate360 10s linear infinite" : ""}
        >
          <AppIcon icon={MusicIcon} mr={"2px"} />
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
