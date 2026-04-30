"use client";

import { CContainer } from "@/components/ui/c-container";
import { SVGS_PATH } from "@/constants/paths";
import { Props__Img } from "@/constants/props";
import Image from "next/image";
import { useState, forwardRef } from "react";

export const Img = forwardRef<HTMLImageElement, Props__Img>((props, ref) => {
  const {
    src,
    alt,
    onError,
    objectFit,
    objectPos,
    imageProps,
    fluid,
    fallbackSrc,
    wide,
    ...restProps
  } = props;

  const resolvedFallbackSrc =
    fallbackSrc ??
    (wide ? `${SVGS_PATH}/no-img-wide.svg` : `${SVGS_PATH}/no-img.svg`);

  const [currentSrc, setCurrentSrc] = useState(src || resolvedFallbackSrc);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (currentSrc !== resolvedFallbackSrc) {
      setCurrentSrc(resolvedFallbackSrc);
    }
    if (onError) onError(e);
  };

  const isGif =
    typeof currentSrc === "string" &&
    currentSrc.split("?")[0].toLowerCase().endsWith(".gif");

  return (
    <CContainer
      flexShrink={0}
      w="auto"
      h="auto"
      justify="center"
      align="center"
      pos="relative"
      overflow={restProps.rounded ? "clip" : ""}
      // Fix iOS stretch bug: when w="fit", we must break the parent's align="stretch"
      alignSelf={
        restProps.w === "fit" || restProps.width === "fit" ? "start" : undefined
      }
      {...restProps}
    >
      <Image
        ref={ref}
        src={currentSrc}
        alt={alt || "image"}
        onError={handleError}
        style={{
          objectFit: (objectFit as any) ?? "cover",
          objectPosition: objectPos ?? "center",
          // Fix iOS stretch bug: use width auto when fitting to content
          width:
            restProps.w === "fit" || restProps.width === "fit"
              ? "auto"
              : "100%",
          height: "100%",
          maxWidth: "100%",
        }}
        fill={!fluid}
        width={fluid ? 100 : undefined}
        height={fluid ? 100 : undefined}
        quality={100}
        unoptimized={isGif}
        sizes={
          imageProps?.sizes ??
          "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        }
        {...imageProps}
      />
    </CContainer>
  );
});

Img.displayName = "Img";
