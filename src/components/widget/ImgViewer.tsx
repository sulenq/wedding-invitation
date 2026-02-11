"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { CloseButton } from "@/components/ui/close-button";
import { DialogBody, DialogContent, DialogRoot } from "@/components/ui/dialog";
import { Img } from "@/components/ui/img";
import { AppIcon } from "@/components/widget/AppIcon";
import { SVGS_PATH } from "@/constants/paths";
import useBackOnClose from "@/hooks/useBackOnClose";
import { back } from "@/utils/client";
import { disclosureId } from "@/utils/disclosure";
import { HStack, StackProps, useDisclosure } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

interface Props extends StackProps {
  id?: string;
  src?: string;
  fallbackSrc?: string;
  disabled?: boolean;
  srcs?: string[];
  srcIndex?: number;
}

export const ImgViewer = (props: Props) => {
  // Props
  const {
    children,
    id,
    src,
    fallbackSrc,
    disabled = false,
    srcs,
    srcIndex = 0,
    ...restProps
  } = props;

  // Hooks
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(disclosureId(id || `${src}`), open, onOpen, onClose);

  // States
  const [currentIndex, setCurrentIndex] = useState<number>(srcIndex);

  return (
    <>
      <CContainer
        w={"fit"}
        cursor={disabled ? "" : "pointer"}
        onClick={
          disabled
            ? () => {}
            : (e) => {
                e.stopPropagation();
                onOpen();
              }
        }
        {...restProps}
      >
        {children}
      </CContainer>

      <DialogRoot open={open} size={"cover"}>
        <DialogContent bg={"transparent"} onClick={back}>
          <DialogBody p={0}>
            <CContainer flex={1} h={"full"} justify={"center"}>
              <CloseButton
                colorPalette={"light"}
                w={"fit"}
                onClick={(e) => {
                  e.stopPropagation();
                  back();
                }}
                ml={"auto"}
              />

              <CContainer gap={4} align={"center"} m={"auto"}>
                <Img
                  key={srcs?.[currentIndex] || src}
                  src={
                    srcs?.[currentIndex] ||
                    src ||
                    fallbackSrc ||
                    `${SVGS_PATH}/no-img.svg`
                  }
                  fluid
                  bg={"body"}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  imageProps={{
                    unoptimized: true,
                  }}
                />
              </CContainer>

              <HStack mx={"auto"}>
                <Btn
                  iconButton
                  variant={"ghost"}
                  colorPalette={"white"}
                  disabled={currentIndex === 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (currentIndex === 0) return;
                    setCurrentIndex((ps) => ps - 1);
                  }}
                >
                  <AppIcon icon={ChevronLeftIcon} />
                </Btn>

                <Btn
                  iconButton
                  variant={"ghost"}
                  colorPalette={"white"}
                  disabled={currentIndex === (srcs?.length || 0) - 1}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (currentIndex === (srcs?.length || 0) - 1) return;
                    setCurrentIndex((ps) => ps + 1);
                  }}
                >
                  <AppIcon icon={ChevronRightIcon} />
                </Btn>
              </HStack>
              {/* 
              <NavLink to={src} w={"fit"} external mx={"auto"}>
                <Btn
                  size={"md"}
                  variant={"ghost"}
                  colorPalette={"light"}
                  pr={3}
                >
                  {l.open}
                  <Icon>
                    <IconArrowUpRight stroke={1.5} />
                  </Icon>
                </Btn>
              </NavLink> */}
            </CContainer>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </>
  );
};
