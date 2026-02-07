"use client";

import { CContainer } from "@/components/ui/c-container";
import { useColorMode } from "@/components/ui/color-mode";
import { P } from "@/components/ui/p";
import { AppIcon } from "@/components/widget/AppIcon";
import { Box } from "@chakra-ui/react";
import { ArrowDownIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Hero = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Guest";

  return (
    <CContainer
      maxW={"720px"}
      minH={"100dvh"}
      align={"center"}
      justify={"center"}
      p={8}
      mx={"auto"}
    >
      <CContainer align={"center"} my={"auto"}>
        <P className="fd" fontSize={"2rem"} textAlign={"center"} mt={8}>
          THE WEDDING OF
        </P>

        <CContainer w={"fit"} mt={12}>
          <P
            className="fd"
            fontSize={"4rem"}
            fontWeight={"bold"}
            // textAlign={"center"}
            lineHeight={1}
          >
            Adelia
          </P>
          <P
            className="fd"
            fontSize={"4rem"}
            fontWeight={"bold"}
            // textAlign={"center"}
            lineHeight={1}
          >
            Fatwa.
          </P>
        </CContainer>

        <Box maxW={"400px"} mx={"auto"} mt={24}>
          <svg
            width="100%"
            height="80"
            viewBox="0 0 900 80"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fill="none"
              stroke="#fff"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="40" y1="40" x2="330" y2="40" />
              <circle cx="350" cy="40" r="6" />
              <circle cx="370" cy="40" r="4" />

              <g transform="translate(450 40)">
                <ellipse cx="0" cy="-14" rx="6" ry="10" />
                <ellipse cx="14" cy="0" rx="10" ry="6" />
                <ellipse cx="0" cy="14" rx="6" ry="10" />
                <ellipse cx="-14" cy="0" rx="10" ry="6" />
              </g>

              <circle cx="530" cy="40" r="4" />
              <circle cx="550" cy="40" r="6" />
              <line x1="570" y1="40" x2="860" y2="40" />
            </g>
          </svg>
        </Box>

        <P className="fdn" fontSize={"2rem"} textAlign={"center"}>
          31.05.2026
        </P>

        <CContainer
          maxW={"350px"}
          align={"center"}
          p={4}
          bg={"whiteAlpha.200"}
          mt={24}
        >
          <P className="fd" fontSize={"1.25rem"} color={"fg.muted"}>
            Kepada Yth. Bpk / Ibu / Saudara/i
          </P>

          <P className="fd" fontSize={"2rem"} fontWeight={"bold"} my={4}>
            {name}
          </P>
        </CContainer>
      </CContainer>

      <AppIcon
        icon={ArrowDownIcon}
        boxSize={5}
        color={"fg.muted"}
        mt={"auto"}
      />
    </CContainer>
  );
};

export default function Page() {
  // Hooks
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode("dark");
  }, []);

  return (
    <CContainer>
      <Hero />
    </CContainer>
  );
}
