"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { useColorMode } from "@/components/ui/color-mode";
import { HelperText } from "@/components/ui/helper-text";
import { Img } from "@/components/ui/img";
import { NavLink } from "@/components/ui/nav-link";
import { P } from "@/components/ui/p";
import { AppIcon } from "@/components/widget/AppIcon";
import { CountDown } from "@/components/widget/CountDown";
import { DividerOrnament } from "@/components/widget/DividerOrnament";
import { ContainerLayout } from "@/components/widget/Page";
import { PaperTexture } from "@/components/widget/PaperTexture";
import { IMAGES_PATH } from "@/constants/paths";
import { Box, Center, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRightIcon,
  CalendarIcon,
  ChevronDownIcon,
  MapPinIcon,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // Hooks
  const searchParams = useSearchParams();
  const name = searchParams.get("to") || "Kamu Ga Diundang";

  // GSAP
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => "+=" + containerRef.current!.offsetHeight * 6,
          scrub: true,
          pin: true,
          pinSpacing: true,
          // markers: true, // debug
        },
      });

      tl.fromTo(
        ".hero_bush",
        {
          scale: 1.5,
          ease: "none",
          // duration: 2.5,
        },
        {
          scale: 3,
          ease: "none",
          // duration: 2.5,
        },
      )
        .to(
          ".hero_bush_2",
          {
            scale: 1.8,
            ease: "none",
            // duration: 2.5,
          },
          "<",
        )
        .to(
          ".hero_bg",
          {
            scale: 1.3,
            ease: "none",
            // duration: 2.5,
          },
          "<",
        )
        .to(
          ".hero_container",
          {
            opacity: 0,
            ease: "none",
            // duration: 2.5,
          },
          ">",
        )
        .to(
          ".chevron_down",
          {
            opacity: 0,
            ease: "none",
            // duration: 2.5,
          },
          "<",
        )
        .to(
          ".hero_brief_container",
          {
            opacity: 1,
            ease: "none",
            // duration: 1.5,
          },
          ">",
        )
        .to(
          ".hero_brief_line",
          {
            height: "100px",
            ease: "none",
            // duration: 1.5,
          },
          ">",
        )
        .to(
          ".hero_brief_content",
          {
            opacity: 0,
            ease: "none",
            // duration: 1.5,
          },
          ">",
        )
        .to(
          ".hero_brief_line",
          {
            opacity: 0,
            ease: "none",
            // duration: 1.5,
          },
          "<",
        );
    },
    { scope: containerRef },
  );

  return (
    <CContainer ref={containerRef} pos={"relative"} overflow={"clip"}>
      <ContainerLayout
        minH={"100dvh"}
        align={"center"}
        justify={"center"}
        p={8}
      >
        {/* Bg */}
        <CContainer className="hero_bg" h={"full"} pos={"absolute"} top={0}>
          <Img src={`${IMAGES_PATH}/heroBg.jpeg`} fluid h={"full"} w={"full"} />

          <PaperTexture h={"full"} w={"full"} pos={"absolute"} top={0} />
        </CContainer>

        {/* Cover content */}
        <CContainer
          h={"full"}
          align={"center"}
          gap={8}
          pos={"absolute"}
          top={0}
          left={0}
          bg={"blackAlpha.700"}
        >
          <CContainer
            className="hero_container"
            align={"center"}
            gap={"48px"}
            my={"auto"}
          >
            <P
              className="fd"
              fontSize={"1.25rem"}
              textAlign={"center"}
              letterSpacing={4}
            >
              THE WEDDING OF
            </P>

            <CContainer w={"fit"}>
              <P
                className="fd"
                fontSize={"3rem"}
                fontWeight={"bold"}
                // textAlign={"center"}
                lineHeight={1}
              >
                Adelia
              </P>
              <P
                className="fd"
                fontSize={"3rem"}
                fontWeight={"bold"}
                // textAlign={"center"}
                lineHeight={1}
              >
                Fatwa.
              </P>
            </CContainer>

            <CContainer>
              <DividerOrnament />

              <P
                className="fd"
                fontSize={"1.25rem"}
                textAlign={"center"}
                letterSpacing={4}
              >
                31.05.2026
              </P>
            </CContainer>

            <CContainer
              maxW={"300px"}
              align={"center"}
              p={4}
              bg={"whiteAlpha.200"}
            >
              <P className="fd" fontSize={"1rem"} opacity={0.8}>
                Kepada Yth. Bpk / Ibu / Saudara/i
              </P>

              <P className="fd" fontSize={"1.5rem"} fontWeight={"bold"} my={4}>
                {name}
              </P>
            </CContainer>
          </CContainer>
        </CContainer>

        {/* Quote */}
        <CContainer h={"full"} position={"absolute"} top={0} zIndex={6}>
          <CContainer
            className="hero_brief_container"
            h={"full"}
            align={"center"}
            p={8}
            opacity={0}
            pos={"relative"}
            justify={"center"}
          >
            <P
              className="hero_brief_content"
              fontSize={["1rem", null, "1.25rem"]}
              textAlign={"center"}
              maxW={"600px"}
            >
              “Dengan memohon ridho Allah SWT, kami melangkah ke dalam ikatan
              pernikahan sebagai bentuk ibadah dan ketaatan kepada-Nya.”
            </P>

            <Box
              className="hero_brief_line"
              bg={"light"}
              opacity={0.5}
              w={"1.2px"}
              h={"0"}
              pos={"absolute"}
              bottom={"50px"}
              zIndex={5}
            />
          </CContainer>
        </CContainer>

        {/* Bushes */}
        <>
          <Img
            className="hero_bush_2"
            src={`${IMAGES_PATH}/heroBush.png`}
            alt="bush"
            h={"full"}
            w={"full"}
            pos={"absolute"}
            top={0}
            pointerEvents={"none"}
            zIndex={4}
          />
          <Img
            className="hero_bush"
            src={`${IMAGES_PATH}/heroBush.png`}
            alt="bush"
            h={"full"}
            w={"full"}
            pos={"absolute"}
            top={0}
            pointerEvents={"none"}
            zIndex={5}
          />
        </>

        {/* Chevron down */}
        <AppIcon
          className="chevron_down"
          icon={ChevronDownIcon}
          boxSize={5}
          color={"fg.muted"}
          animation={"hero-chevron-down-bounce 2s linear infinite"}
          zIndex={5}
          mt={"auto"}
        />
      </ContainerLayout>
    </CContainer>
  );
};

const Intro = () => {
  const LINE_H = `200px`;

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          end: "+=300",
          scrub: true,
          // pin: true,
          // pinSpacing: true,
          // markers: true, // debug
        },
      });

      tl.fromTo(
        ".intro_line",
        {
          height: "0px",
          ease: "none",
          // duration: 2.5,
        },
        {
          height: LINE_H,
          ease: "none",
          // duration: 2.5,
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <CContainer
      ref={containerRef}
      gap={"48px"}
      px={4}
      py={"48px"}
      bg={"light"}
      color={"dark"}
      pos={"relative"}
    >
      <PaperTexture
        h={"full"}
        opacity={0.25}
        pos={"absolute"}
        top={0}
        left={0}
      />

      <DividerOrnament color="black" />

      <ContainerLayout align={"center"} gap={"48px"}>
        <SimpleGrid columns={2} gap={"64px"}>
          <CContainer align={"end"}>
            <P
              className="fd"
              maxW={"100px"}
              fontSize={"1.25rem"}
              lineHeight={1.4}
              textAlign={"right"}
            >
              Adelia Dian Pratiwi
            </P>
          </CContainer>

          <CContainer mt={"50px"}>
            <P
              className="fd"
              maxW={"100px"}
              fontSize={"1.25rem"}
              lineHeight={1.4}
            >
              Fatwa Linovera
            </P>
          </CContainer>
        </SimpleGrid>

        <VStack h={LINE_H}>
          <Box
            className="intro_line"
            bg={"dark"}
            w={"1.2px"}
            h={"0"}
            zIndex={5}
          />
        </VStack>

        <Img
          src={`${IMAGES_PATH}/intro.jpeg`}
          fluid
          w={"full"}
          maxW={"200px"}
        />
        <P textAlign={"center"}>{`We're getting married!`}</P>

        <CountDown targetAt="2026-05-31T08:00:00+07:00" />
      </ContainerLayout>

      <DividerOrnament color="black" />
    </CContainer>
  );
};

const BrideAndGroom = () => {
  return (
    <CContainer pos={"relative"}>
      <PaperTexture
        w={"full"}
        h={"full"}
        pos={"absolute"}
        top={0}
        left={0}
        opacity={0.125}
      />

      <Img
        src={`${IMAGES_PATH}/brideAndGroom.gif`}
        fluid
        aspectRatio={16 / 10}
        w={"full"}
      />

      <ContainerLayout gap={"48px"} px={4} py={"48px"}>
        <P textAlign={"center"}>
          Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk
          hadir dan memberikan doa restu pada acara pernikahan kami.
        </P>

        {/* Adelia */}
        <CContainer p={4}>
          <Center px={8} pos={"relative"}>
            <Img src={`${IMAGES_PATH}/adel.jpeg`} fluid w={"full"} />
            <Img
              src={`${IMAGES_PATH}/adelLineart.jpg`}
              fluid
              w={"100px"}
              pos={"absolute"}
              bottom={"-50px"}
              right={0}
            />
          </Center>

          <CContainer zIndex={2}>
            <P
              className="fd"
              fontSize={"2xl"}
              fontWeight={"semibold"}
              textAlign={"center"}
              my={6}
            >
              Adelia Dian Pratiwi
            </P>

            <CContainer color={"fg.muted"}>
              <P textAlign={"center"}>Putri termuda dari</P>
              <P textAlign={"center"}>Widodo</P>
              <P textAlign={"center"}>dan</P>
              <P textAlign={"center"}>Tri Wahyuningsih</P>
            </CContainer>
          </CContainer>
        </CContainer>

        {/* Fatwa */}
        <CContainer p={4} mt={24}>
          <Center px={8} pos={"relative"}>
            <Img src={`${IMAGES_PATH}/fatwa.jpeg`} fluid w={"full"} />
            <Img
              src={`${IMAGES_PATH}/fatwaLineart.jpg`}
              fluid
              w={"100px"}
              pos={"absolute"}
              top={"-50px"}
              left={0}
            />
          </Center>

          <CContainer zIndex={2}>
            <P
              className="fd"
              fontSize={"2xl"}
              fontWeight={"semibold"}
              textAlign={"center"}
              my={6}
            >
              Fatwa Linovera
            </P>

            <CContainer color={"fg.muted"}>
              <P textAlign={"center"}>Putra termuda dari</P>
              <P textAlign={"center"}>Muhamad Nurfuad</P>
              <P textAlign={"center"}>dan</P>
              <P textAlign={"center"}>Sri Rahayu</P>
            </CContainer>
          </CContainer>
        </CContainer>
      </ContainerLayout>
    </CContainer>
  );
};

const Story = () => {
  return (
    <CContainer pos={"relative"}>
      <PaperTexture
        w={"full"}
        h={"full"}
        pos={"absolute"}
        top={0}
        left={0}
        opacity={0.125}
      />

      <Img
        src={`${IMAGES_PATH}/brideAndGroom.gif`}
        fluid
        aspectRatio={16 / 10}
        w={"full"}
      />

      <ContainerLayout p={4} py={12}>
        <P
          className="fd"
          fontSize={"1.5rem"}
          fontWeight={"semibold"}
          textAlign={"center"}
          mb={8}
        >
          Cerita Kami
        </P>

        <CContainer
          gap={8}
          p={8}
          border={"1px solid"}
          borderColor={"ibody"}
          rounded={"md"}
        >
          <P>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            porro officia exercitationem earum aut dolor. Corrupti maiores,
            vitae et perferendis excepturi, cumque cum facere quam, qui ea
            architecto officia ex?
          </P>
          <P>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            porro officia exercitationem earum aut dolor. Corrupti maiores,
            vitae et perferendis excepturi, cumque cum facere quam, qui ea
            architecto officia ex?
          </P>
          <P>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            porro officia exercitationem earum aut dolor. Corrupti maiores,
            vitae et perferendis excepturi, cumque cum facere quam, qui ea
            architecto officia ex?
          </P>
          <P>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            porro officia exercitationem earum aut dolor. Corrupti maiores,
            vitae et perferendis excepturi, cumque cum facere quam, qui ea
            architecto officia ex?
          </P>
        </CContainer>
      </ContainerLayout>
    </CContainer>
  );
};

const EventDetails = () => {
  return (
    <CContainer pos={"relative"} bg={"light"} color={"dark"}>
      <PaperTexture
        w={"full"}
        h={"full"}
        pos={"absolute"}
        top={0}
        left={0}
        opacity={0.25}
      />

      <Img
        src={`${IMAGES_PATH}/brideAndGroom.gif`}
        fluid
        aspectRatio={16 / 10}
        w={"full"}
      />

      <ContainerLayout p={4} py={"48px"}>
        <P
          className="fd"
          fontSize={"1.5rem"}
          fontWeight={"semibold"}
          textAlign={"center"}
          mb={8}
        >
          Acara & Tempat
        </P>

        <CContainer px={8} zIndex={2}>
          <CContainer
            gap={12}
            p={8}
            border={"1px solid"}
            borderColor={"dark"}
            rounded={"md"}
            bg={"light"}
          >
            {/* Time */}
            <CContainer gap={8} align={"center"}>
              <CContainer>
                <P className="fd" textAlign={"center"}>
                  Minggu
                </P>
                <P
                  className="fd"
                  fontSize={"3.5rem"}
                  fontWeight={"bold"}
                  textAlign={"center"}
                  lineHeight={1.4}
                  color={"fg.error"}
                >
                  31
                </P>
                <P className="fd" textAlign={"center"}>
                  Mei 2026
                </P>
              </CContainer>

              <HStack w={"full"} align={"stretch"}>
                <CContainer gap={8} align={"center"} py={4}>
                  <P
                    className="fd"
                    fontSize={"1.25rem"}
                    fontWeight={"semibold"}
                    textAlign={"center"}
                  >
                    Akad
                  </P>

                  <CContainer align={"center"}>
                    <P textAlign={"center"}>08.00 WIB</P>
                    <P textAlign={"center"}>-</P>
                    <P textAlign={"center"}>09.00 WIB</P>
                  </CContainer>
                </CContainer>

                <Box flexShrink={0} w={"1.2px"} bg={"dark"} />

                <CContainer gap={8} align={"center"} py={4}>
                  <P
                    className="fd"
                    fontSize={"1.25rem"}
                    fontWeight={"semibold"}
                    textAlign={"center"}
                  >
                    Resepsi
                  </P>

                  <CContainer align={"center"}>
                    <P textAlign={"center"}>08.00 WIB</P>
                    <P textAlign={"center"}>-</P>
                    <P textAlign={"center"}>09.00 WIB</P>
                  </CContainer>
                </CContainer>
              </HStack>

              <CContainer align={"center"} gap={4}>
                <a href="/assets/icss/resepsi.ics">
                  <Btn variant={"outline"} color={"dark"}>
                    <AppIcon icon={CalendarIcon} />
                    Simpan ke Kalender
                  </Btn>
                </a>

                <HelperText textAlign={"center"}>
                  Jika tidak muncul konfirmasi tambah ke kalender, silakan buka
                  file .ics secara manual.
                </HelperText>
              </CContainer>
            </CContainer>

            {/* Place */}
            <CContainer align={"center"} gap={6}>
              <AppIcon
                icon={MapPinIcon}
                boxSize={10}
                strokeWidth={2}
                color={"fg.error"}
              />

              <P
                className="fd"
                fontSize={"1.25rem"}
                fontWeight={"semibold"}
                textAlign={"center"}
              >
                {`Gedung Semeru BP2KLK Semarang (D'ELANG)`}
              </P>

              <P textAlign={"center"}>
                Jl. Elang Raya No.2, Mangunharjo, Kec. Tembalang, Kota Semarang,
                Jawa Tengah 50272
              </P>

              <NavLink
                to="https://www.google.com/maps/place/Gedung+Semeru+BP2KLK+Semarang+(D'ELANG)/@-7.0435184,110.4631783,17z/data=!3m1!4b1!4m6!3m5!1s0x2e708d3e64c0fd9f:0xc751ad1bae92fbf6!8m2!3d-7.0435237!4d110.4657532!16s%2Fg%2F11h53ph_8v?entry=ttu&g_ep=EgoyMDI2MDIwOC4wIKXMDSoASAFQAw%3D%3D"
                external
                rel="noopener noreferrer"
              >
                <Btn variant={"outline"} color={"dark"}>
                  Google Maps
                  <AppIcon icon={ArrowUpRightIcon} />
                </Btn>
              </NavLink>
            </CContainer>
          </CContainer>
        </CContainer>
      </ContainerLayout>
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
      <Intro />
      <BrideAndGroom />
      <Story />
      <EventDetails />
    </CContainer>
  );
}
