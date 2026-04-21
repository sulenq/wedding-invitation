"use client";

import { AppIcon } from "@/components/widget/AppIcon";
import { DraggableBtn } from "@/components/widget/DraggableBtn";
import { Circle } from "@chakra-ui/react";
import { MusicIcon, PlayIcon } from "lucide-react";
import { useInvitationContext } from "@/context/useInvitationContext";
import { useEffect, useRef, useState } from "react";

export const BgMusic = () => {
  // Props
  const {
    invitation: { isOpened },
  } = useInvitationContext();

  // States
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userPausedRef = useRef(false);

  // Handle playing state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = (isOpenedValue: boolean) => {
      if (userPausedRef.current) return;

      if (isOpenedValue && !isPlaying) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      }
    };

    if (isOpened && !isPlaying) {
      // Initial attempt (works on permissive browsers/laptops)
      handlePlay(isOpened);
    }

    // // Capture the click event that opened the invitation
    // // This is crucial for mobile devices to play music immediately
    // const onGlobalClick = () => {
    //   if (userPausedRef.current) return;
    //   // Access store state directly to avoid stale closures
    //   const currentIsOpened =
    //     useInvitationContext.getState().invitation.isOpened;

    //   // We try to play immediately. If isOpened is about to be true but not yet,
    //   // the gesture context will still be valid for a few ms.
    //   // But ideally, the setInvitation has already started.
    //   handlePlay(currentIsOpened || true); // Passing true here as a fallback since the click IS opening it
    // };

    // if (!isPlaying && !userPausedRef.current) {
    //   window.addEventListener("click", onGlobalClick);
    //   window.addEventListener("touchstart", onGlobalClick);
    // }

    // return () => {
    //   window.removeEventListener("click", onGlobalClick);
    //   window.removeEventListener("touchstart", onGlobalClick);
    // };
  }, [isOpened, isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      userPausedRef.current = true;
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          userPausedRef.current = false;
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
        defaultPos={"top-left"}
        rounded={"full"}
        bg={"d3"}
        visibility={isOpened ? "visible" : "hidden"}
        opacity={isOpened ? 1 : 0}
        transition={"300ms"}
        onClick={togglePlay}
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
