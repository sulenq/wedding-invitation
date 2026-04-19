"use client";

import { useColorMode } from "@/components/ui/color-mode";
import { LoadingBar } from "@/components/widget/LoadingBar";
import { Logo } from "@/components/widget/Logo";
import useADM from "@/context/useADM";
import { useFirefoxPaddingY } from "@/hooks/useFirefoxPaddingY";
import useOfflineAlert from "@/hooks/useOfflineAlert";
import { Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import GlobalDisclosure from "./GlobalDisclosure";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const DefaultFallback = () => {
  return (
    <Center w={"100w"} minH={"100dvh"} color={"fg.subtle"}>
      {/* <Img
        fluid
        alt={`${APP.name} Logo`}
        src={`${SVGS_PATH}/logo_gray.svg`}
        width={"170px"}
        height={"fit"}
        ml={"40px"}
        imageProps={{
          priority: true,
        }}
      /> */}

      <Logo size={200} ml={"40px"} color={"white"} />
    </Center>
  );
};

// persist mounted state across route changes
let mountedGlobal = false;

export default function ClientSideOnly(props: Props) {
  // Props
  const { children, fallback } = props;

  // Contexts
  const { setColorMode } = useColorMode();
  const ADM = useADM((s) => s.ADM);

  // Hooks
  useFirefoxPaddingY();

  // States
  const [mounted, setMounted] = useState(mountedGlobal);

  // Utils
  function updateDarkMode() {
    const hour = new Date().getHours();
    setColorMode(hour >= 18 || hour < 6 ? "dark" : "light");
  }

  // Handle mount (cold start)
  useEffect(() => {
    mountedGlobal = true;
    setMounted(true);
  }, []);

  // Handle offline alert
  useOfflineAlert({ mounted });

  useEffect(() => {
    if (ADM) {
      const interval = setInterval(() => {
        const hour = new Date().getHours();
        if (hour === 6 || hour === 18) {
          updateDarkMode();
        }
      }, 60 * 1000);

      return () => clearInterval(interval);
    }
  }, []);
  useEffect(() => {
    if (ADM) {
      updateDarkMode();
    }
  }, [ADM]);

  if (!mounted) return <>{fallback || <DefaultFallback />}</>;

  return (
    <>
      <LoadingBar />
      <GlobalDisclosure />

      {children}
    </>
  );
}
