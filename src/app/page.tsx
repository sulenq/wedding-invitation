"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { useColorMode } from "@/components/ui/color-mode";
import { Img } from "@/components/ui/img";
import { NavLink } from "@/components/ui/nav-link";
import { P } from "@/components/ui/p";
import { AppIcon } from "@/components/widget/AppIcon";
import { ClampText } from "@/components/widget/ClampText";
import { CountDown } from "@/components/widget/CountDown";
import { DividerOrnament } from "@/components/widget/DividerOrnament";
import { ImgViewer } from "@/components/widget/ImgViewer";
import { ContainerLayout } from "@/components/widget/Page";
import { PaperTexture } from "@/components/widget/PaperTexture";
import { IMAGES_PATH } from "@/constants/paths";
import { useDimension } from "@/hooks/useDimension";
import { useIsSmScreenWidth } from "@/hooks/useIsSmScreenWidth";
import {
  Box,
  Center,
  Clipboard,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
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

const COVER = {
  bride: "Adelia",
  groom: "Fatwa.",
  img: `${IMAGES_PATH}/cover.jpeg`,
  date: "31.05.2026",
  quote:
    "Dengan memohon ridho Allah SWT, kami melangkah ke dalam ikatan pernikahan sebagai bentuk ibadah dan ketaatan kepada-Nya.",
};
const INTRO = {
  bride: "Adelia Dian Pratiwi",
  groom: "Fatwa Linovera",
  img: `${IMAGES_PATH}/intro.jpeg`,
};
const BAG = {
  intro:
    "Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada acara pernikahan kami.",
  bride: "Adelia Dian Pratiwi",
  daughterOf: "Putri termuda dari",
  brideParents: ["Widodo", "Tri Wahyuningsih"],
  groom: "Fatwa Linovera",
  sonOf: "Putra termuda dari",
  groomParents: ["Muhamad Nurfuad", "Sri Rahayu"],
};
const STORY = [
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat porro officia exercitationem earum aut dolor. Corrupti maiores, vitae et perferendis excepturi, cumque cum facere quam, qui ea architecto officia ex?",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat porro officia exercitationem earum aut dolor. Corrupti maiores, vitae et perferendis excepturi, cumque cum facere quam, qui ea architecto officia ex?",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat porro officia exercitationem earum aut dolor. Corrupti maiores, vitae et perferendis excepturi, cumque cum facere quam, qui ea architecto officia ex?",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat porro officia exercitationem earum aut dolor. Corrupti maiores, vitae et perferendis excepturi, cumque cum facere quam, qui ea architecto officia ex?",
];
const EVENT = {
  time: {
    day: "Minggu",
    date: "31",
    monthAndYear: "Mei 2026",
    akad: {
      start: "08.00 WIB",
      end: "Selesai",
    },
    resepsi: {
      start: "11.00 WIB",
      end: "13.00 WIB",
    },
  },
  place: {
    name: "Gedung Semeru BP2KLK Semarang (D'ELANG)",
    address:
      "Jl. Elang Raya No.2, Mangunharjo, Kec. Tembalang, Kota Semarang, Jawa Tengah 50272",
    mapsUrl:
      "https://www.google.com/maps/place/Gedung+Semeru+BP2KLK+Semarang+(D'ELANG)/@-7.0435184,110.4631783,17z/data=!3m1!4b1!4m6!3m5!1s0x2e708d3e64c0fd9f:0xc751ad1bae92fbf6!8m2!3d-7.0435237!4d110.4657532!16s%2Fg%2F11h53ph_8v?entry=ttu&g_ep=EgoyMDI2MDIwOC4wIKXMDSoASAFQAw%3D%3D",
  },
};
const GIFT = {
  qris: `${IMAGES_PATH}/qris.jpg`,
  bca: {
    accountNumber: "1234567890",
    accountHolder: "ADELIA DIAN PRATIWI",
  },
  mandiri: {
    accountNumber: "0987654321",
    accountHolder: "FATWA LINOVERA",
  },
};
const GALLERY_PHOTOS = [
  `${IMAGES_PATH}/gallery/1.jpeg`,
  `${IMAGES_PATH}/gallery/2.jpeg`,
  `${IMAGES_PATH}/gallery/3.jpeg`,
  `${IMAGES_PATH}/gallery/4.jpeg`,
  `${IMAGES_PATH}/gallery/5.jpeg`,
  `${IMAGES_PATH}/gallery/6.jpeg`,
];

const Cover = () => {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // Hooks
  const searchParams = useSearchParams();
  const name = searchParams.get("to") || "Tamu Undangan";
  const iss = useIsSmScreenWidth();

  // GSAP
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => "+=" + containerRef.current!.offsetHeight * 2,
          scrub: true,
          pin: true,
          pinSpacing: true,
          // markers: true, // debug
        },
      });

      tl.to(".cover_bush_l", {
        left: "-250%",
        bottom: "-50%",
        rotate: "-10deg",
        opacity: 0,
        ease: "none",
        duration: 1.5,
      })
        .to(
          ".cover_bush_r",
          {
            right: "-250%",
            bottom: "-50%",
            rotate: "5deg",
            opacity: 0,
            ease: "none",
            duration: 1.5,
          },
          "<",
        )
        .to(
          ".cover_flowers_l",
          {
            left: "-200%",
            bottom: "-10%",
            rotate: "-20deg",
            opacity: 0,
            ease: "none",
            duration: 1.5,
          },
          "<",
        )
        .to(
          ".cover_flowers_r",
          {
            right: "-240%",
            bottom: "-10%",
            rotate: "40deg",
            opacity: 0,
            ease: "none",
            duration: 1.5,
          },
          "<",
        )
        .to(
          ".cover_bg",
          {
            scale: 1.3,
            ease: "none",
            duration: 1,
          },
          "<",
        )
        .fromTo(
          ".cover_container",
          {
            opacity: 0,
            ease: "none",
            duration: 1.5,
          },
          {
            opacity: 1,
            ease: "none",
            duration: 1.5,
          },
          "<",
        )
        .to(
          ".cover_container",
          {
            opacity: 0,
            ease: "none",
            // duration: 2.5,
          },
          ">+1.5",
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
          ".cover_brief_container",
          {
            opacity: 1,
            ease: "none",
            // duration: 1.5,
          },
          ">",
        )
        .to(
          ".cover_brief_line",
          {
            height: "100px",
            ease: "none",
            // duration: 1.5,
          },
          ">",
        )
        .to(
          ".cover_brief_content",
          {
            opacity: 0,
            ease: "none",
            // duration: 1.5,
          },
          ">",
        )
        .to(
          ".cover_brief_line",
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
      {/* Contents */}
      <ContainerLayout
        minH={"100dvh"}
        align={"center"}
        justify={"center"}
        p={8}
      >
        {/* Bg */}
        <CContainer className="cover_bg" h={"full"} pos={"absolute"} top={0}>
          <Img src={COVER.img} fluid h={"full"} w={"full"} />

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
            className="cover_container"
            align={"center"}
            gap={12}
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
                {COVER.bride}
              </P>
              <P
                className="fd"
                fontSize={"3rem"}
                fontWeight={"bold"}
                // textAlign={"center"}
                lineHeight={1}
              >
                {COVER.groom}
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
                {COVER.date}
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
            className="cover_brief_container"
            h={"full"}
            align={"center"}
            p={8}
            opacity={0}
            pos={"relative"}
            justify={"center"}
          >
            <P
              className="cover_brief_content"
              fontSize={["1rem", null, "1.25rem"]}
              textAlign={"center"}
              maxW={"600px"}
            >
              {COVER.quote}
            </P>

            <Box
              className="cover_brief_line"
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

        {/* Chevron down */}
        <VStack className="chevron_down" zIndex={5} mt={"auto"}>
          <P textAlign={"center"}>Scroll</P>

          <AppIcon
            icon={ChevronDownIcon}
            boxSize={5}
            animation={"hero-chevron-down-bounce 2s linear infinite"}
          />
        </VStack>
      </ContainerLayout>

      {/* Flowers */}
      <>
        <Img
          key={`${iss}`}
          className="cover_flowers_l"
          src={
            iss
              ? `${IMAGES_PATH}/flowersSmall.png`
              : `${IMAGES_PATH}/flowers.png`
          }
          alt="flowers"
          h={"80%"}
          aspectRatio={[0.8062360802, null, 1.6877637131]}
          pos={"absolute"}
          bottom={"20%"}
          left={"-110%"}
          transform={"rotate(10deg)"}
          pointerEvents={"none"}
          zIndex={4}
        />

        <Img
          key={`${iss}`}
          className="cover_flowers_r"
          src={
            iss
              ? `${IMAGES_PATH}/flowersSmallR.png`
              : `${IMAGES_PATH}/flowersR.png`
          }
          alt="flowers"
          h={"80%"}
          aspectRatio={[0.8062360802, null, 1.6877637131]}
          pos={"absolute"}
          bottom={"15%"}
          right={"-110%"}
          transform={"rotate(-5deg)"}
          pointerEvents={"none"}
          zIndex={4}
        />
      </>

      {/* Bushes */}
      <>
        <Img
          key={`${iss}`}
          className="cover_bush_l"
          src={iss ? `${IMAGES_PATH}/bushSmall.png` : `${IMAGES_PATH}/bush.png`}
          alt="bush"
          h={"80%"}
          aspectRatio={[0.8710691824, null, 2.3899371069]}
          pos={"absolute"}
          bottom={"-20%"}
          left={"-55%"}
          pointerEvents={"none"}
          zIndex={4}
        />
        <Img
          key={`${iss}`}
          className="cover_bush_r"
          src={
            iss ? `${IMAGES_PATH}/bushSmallR.png` : `${IMAGES_PATH}/bushR.png`
          }
          alt="bush"
          h={"80%"}
          aspectRatio={[0.8710691824, null, 2.3899371069]}
          pos={"absolute"}
          bottom={"-20%"}
          right={"-55%"}
          pointerEvents={"none"}
          zIndex={4}
        />
      </>
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
          start: "top 25%",
          end: "bottom 75%",
          scrub: true,
          // pin: true,
          // pinSpacing: true,
          // markers: true, // debug
        },
      });

      tl.from(
        ".bride",
        {
          x: "-100px",
          opacity: 0,
          ease: "none",
        },
        "<",
      )
        .from(
          ".groom",
          {
            x: "100px",
            opacity: 0,
            ease: "none",
          },
          "<",
        )
        .fromTo(
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
        )
        .from(
          ".countdown",
          {
            y: "100px",
            opacity: 0,
            ease: "none",
          },
          ">",
        );
    },
    { scope: containerRef },
  );

  return (
    <CContainer
      ref={containerRef}
      gap={12}
      px={4}
      py={12}
      bg={"light"}
      color={"dark"}
      pos={"relative"}
    >
      <PaperTexture
        w={"full"}
        h={"full"}
        opacity={0.25}
        pos={"absolute"}
        top={0}
        left={0}
      />

      <DividerOrnament color="black" />

      <ContainerLayout align={"center"} gap={12}>
        <SimpleGrid columns={2} gap={"64px"}>
          <CContainer align={"end"}>
            <P
              className="fd bride"
              maxW={"100px"}
              fontSize={"1.25rem"}
              lineHeight={1.4}
              textAlign={"right"}
            >
              {INTRO.bride}
            </P>
          </CContainer>

          <CContainer mt={"50px"}>
            <P
              className="fd groom"
              maxW={"100px"}
              fontSize={"1.25rem"}
              lineHeight={1.4}
            >
              {INTRO.groom}
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

        <CContainer className="countdown" align={"center"} gap={12}>
          <Img src={INTRO.img} fluid w={"full"} maxW={"200px"} />

          <P textAlign={"center"}>{`We're getting married!`}</P>

          <CountDown targetAt="2026-05-31T08:00:00+07:00" />
        </CContainer>
      </ContainerLayout>

      <DividerOrnament color="black" />
    </CContainer>
  );
};

const BrideAndGroom = () => {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 25%",
          end: "bottom 75%",
          scrub: true,
          // pin: true,
          // pinSpacing: true,
          // markers: true, // debug
        },
      });

      tl.from(".intro", {
        opacity: 0,
        ease: "none",
      })
        .from(
          [".brideImg", ".brideInfo"],
          {
            opacity: 0,
            ease: "none",
          },
          ">",
        )
        .from(
          ".brideLineart",
          {
            x: "20px",
            opacity: 0,
            ease: "none",
          },
          ">",
        )
        .from(
          [".groomImg", ".groomInfo"],
          {
            opacity: 0,
            ease: "none",
          },
          ">",
        )
        .from(
          ".groomLineart",
          {
            x: "-20px",
            opacity: 0,
            ease: "none",
          },
          ">",
        );
    },
    { scope: containerRef },
  );

  return (
    <CContainer ref={containerRef} pos={"relative"}>
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

      <ContainerLayout gap={12} px={4} py={12}>
        <P className="intro" textAlign={"center"}>
          {BAG.intro}
        </P>

        {/* Adelia */}
        <CContainer p={4}>
          <Center px={8} pos={"relative"}>
            <Box className="brideImg">
              <Img src={`${IMAGES_PATH}/adel.jpeg`} fluid w={"full"} />
            </Box>

            <Box
              className="brideLineart"
              pos={"absolute"}
              bottom={"-50px"}
              right={0}
            >
              <Img src={`${IMAGES_PATH}/adelLineart.jpg`} fluid w={"100px"} />
            </Box>
          </Center>

          <CContainer className="brideInfo" zIndex={2}>
            <CContainer>
              <P
                className="fd"
                fontSize={"2xl"}
                fontWeight={"semibold"}
                textAlign={"center"}
                my={6}
              >
                {BAG.bride}
              </P>

              <CContainer color={"fg.muted"}>
                <P textAlign={"center"}>{BAG.daughterOf}</P>
                <P textAlign={"center"}>{BAG.brideParents[0]}</P>
                <P textAlign={"center"}>dan</P>
                <P textAlign={"center"}>{BAG.brideParents[1]}</P>
              </CContainer>
            </CContainer>
          </CContainer>
        </CContainer>

        {/* Fatwa */}
        <CContainer p={4} mt={24}>
          <Center px={8} pos={"relative"}>
            <Box className="groomImg">
              <Img src={`${IMAGES_PATH}/fatwa.jpeg`} fluid w={"full"} />
            </Box>

            <Box
              className="groomLineart"
              pos={"absolute"}
              top={"-50px"}
              left={0}
            >
              <Img src={`${IMAGES_PATH}/fatwaLineart.jpg`} fluid w={"100px"} />
            </Box>
          </Center>

          <CContainer className="groomInfo" zIndex={2}>
            <CContainer>
              <P
                className="fd"
                fontSize={"2xl"}
                fontWeight={"semibold"}
                textAlign={"center"}
                my={6}
              >
                {BAG.groom}
              </P>

              <CContainer color={"fg.muted"}>
                <P textAlign={"center"}>{BAG.sonOf}</P>
                <P textAlign={"center"}>{BAG.groomParents[0]}</P>
                <P textAlign={"center"}>dan</P>
                <P textAlign={"center"}>{BAG.groomParents[1]}</P>
              </CContainer>
            </CContainer>
          </CContainer>
        </CContainer>
      </ContainerLayout>
    </CContainer>
  );
};

const Story = () => {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 25%",
          end: "bottom 50%",
          scrub: true,
          // pin: true,
          // pinSpacing: true,
          // markers: true, // debug
        },
      });

      tl.from(".title", {
        opacity: 0,
        ease: "none",
      }).from(
        ".paragraph",
        {
          opacity: 0,
          ease: "none",
          stagger: 0.25,
          delay: 0.5,
        },
        ">",
      );
    },
    { scope: containerRef },
  );

  return (
    <CContainer ref={containerRef} pos={"relative"}>
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
          className="fd title"
          fontSize={"1.5rem"}
          fontWeight={"semibold"}
          textAlign={"center"}
          mb={8}
        >
          Cerita Kami
        </P>

        <CContainer gap={8} p={8} border={"1px solid"} borderColor={"ibody"}>
          {STORY.map((paragraph, index) => (
            <P key={index} className="paragraph">
              {paragraph}
            </P>
          ))}
        </CContainer>
      </ContainerLayout>
    </CContainer>
  );
};

const Gallery = () => {
  const GAP = 4;

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          end: "bottom 75%",
          scrub: true,
          // pin: true,
          // pinSpacing: true,
          // markers: true, // debug
        },
      });

      tl.from(".img", {
        opacity: 0,
        scale: 0.75,
        ease: "none",
        stagger: 0.25,
      });
    },
    { scope: containerRef },
  );

  return (
    <CContainer ref={containerRef} pos={"relative"} bg={"light"} color={"dark"}>
      <PaperTexture
        w={"full"}
        h={"full"}
        pos={"absolute"}
        top={0}
        left={0}
        opacity={0.25}
      />

      <ContainerLayout p={4} py={12}>
        <SimpleGrid columns={[1, null, 2]} gap={GAP}>
          <SimpleGrid columns={2} gap={GAP} h={"full"}>
            <CContainer gap={GAP} h={"full"}>
              <ImgViewer
                className="img"
                srcs={GALLERY_PHOTOS}
                srcIndex={0}
                h={"full"}
              >
                <Img
                  className="clicky"
                  src={GALLERY_PHOTOS[0]}
                  fluid
                  h={"full"}
                />
              </ImgViewer>
              <ImgViewer
                className="img"
                srcs={GALLERY_PHOTOS}
                srcIndex={1}
                h={"full"}
              >
                <Img
                  className="clicky"
                  src={GALLERY_PHOTOS[1]}
                  fluid
                  h={"full"}
                />
              </ImgViewer>
            </CContainer>

            <CContainer>
              <ImgViewer
                className="img"
                srcs={GALLERY_PHOTOS}
                srcIndex={2}
                h={"full"}
              >
                <Img
                  className="clicky"
                  src={GALLERY_PHOTOS[2]}
                  fluid
                  h={"full"}
                />
              </ImgViewer>
            </CContainer>
          </SimpleGrid>

          <CContainer gap={GAP} h={"full"}>
            <ImgViewer
              className="img"
              srcs={GALLERY_PHOTOS}
              srcIndex={3}
              h={"full"}
            >
              <Img
                className="clicky"
                src={GALLERY_PHOTOS[3]}
                fluid
                h={"full"}
              />
            </ImgViewer>

            <SimpleGrid columns={2} gap={GAP}>
              <ImgViewer
                className="img"
                srcs={GALLERY_PHOTOS}
                srcIndex={4}
                h={"full"}
              >
                <Img
                  className="clicky"
                  src={GALLERY_PHOTOS[4]}
                  fluid
                  h={"full"}
                />
              </ImgViewer>
              <ImgViewer
                className="img"
                srcs={GALLERY_PHOTOS}
                srcIndex={5}
                h={"full"}
              >
                <Img
                  className="clicky"
                  src={GALLERY_PHOTOS[5]}
                  fluid
                  h={"full"}
                />
              </ImgViewer>
            </SimpleGrid>
          </CContainer>
        </SimpleGrid>
      </ContainerLayout>
    </CContainer>
  );
};

const EventDetails = () => {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 75%",
          scrub: true,
          // pin: true,
          // pinSpacing: true,
          // markers: true, // debug
        },
      });

      tl.from(".title", {
        opacity: 0,
        ease: "none",
      })
        .from(".time", {
          opacity: 0,
          ease: "none",
        })
        .from(".place", {
          opacity: 0,
          ease: "none",
        });
    },
    { scope: containerRef },
  );

  return (
    <CContainer ref={containerRef} pos={"relative"} bg={"light"} color={"dark"}>
      <PaperTexture
        w={"full"}
        h={"full"}
        pos={"absolute"}
        top={0}
        left={0}
        opacity={0.25}
      />

      <ContainerLayout p={4} py={12}>
        <P
          className="fd title"
          fontSize={"1.5rem"}
          fontWeight={"semibold"}
          textAlign={"center"}
          mb={8}
        >
          Acara & Tempat
        </P>

        <CContainer px={4} zIndex={2}>
          <CContainer
            gap={12}
            p={8}
            border={"1px solid"}
            borderColor={"dark"}
            bg={"light"}
          >
            {/* Time */}
            <CContainer className="time" gap={8} align={"center"}>
              <CContainer>
                <P className="fd" fontWeight={"medium"} textAlign={"center"}>
                  {EVENT.time.day}
                </P>
                <P
                  className="fd"
                  fontSize={"3.5rem"}
                  fontWeight={"bold"}
                  textAlign={"center"}
                  lineHeight={1.4}
                  color={"fg.error"}
                >
                  {EVENT.time.date}
                </P>
                <P className="fd" fontWeight={"medium"} textAlign={"center"}>
                  {EVENT.time.monthAndYear}
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
                    <P textAlign={"center"}>{EVENT.time.akad.start}</P>
                    <P textAlign={"center"}>-</P>
                    <P textAlign={"center"}>{EVENT.time.akad.end}</P>
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
                    <P textAlign={"center"}>{EVENT.time.resepsi.start}</P>
                    <P textAlign={"center"}>-</P>
                    <P textAlign={"center"}>{EVENT.time.resepsi.end}</P>
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

                <ClampText
                  fontSize={"sm"}
                  color={"fg.muted"}
                  textAlign={"center"}
                >
                  Jika tidak muncul konfirmasi tambah ke kalender, silakan buka
                  file .ics (download) secara manual.
                </ClampText>
              </CContainer>
            </CContainer>

            {/* Place */}
            <CContainer className="place" align={"center"} gap={6}>
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
                {EVENT.place.name}
              </P>

              <P textAlign={"center"}>{EVENT.place.address}</P>

              <NavLink
                to={EVENT.place.mapsUrl}
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

const Gift = () => {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 75%",
          scrub: true,
          // pin: true,
          // pinSpacing: true,
          // markers: true, // debug
        },
      });

      tl.from(".title", {
        opacity: 0,
        ease: "none",
      })
        .from(".qris", {
          opacity: 0,
          ease: "none",
        })
        .from(".bca", {
          opacity: 0,
          ease: "none",
        })
        .from(".mandiri", {
          opacity: 0,
          ease: "none",
        });
    },
    { scope: containerRef },
  );

  return (
    <CContainer ref={containerRef} pos={"relative"} bg={"light"} color={"dark"}>
      <PaperTexture
        w={"full"}
        h={"full"}
        pos={"absolute"}
        top={0}
        left={0}
        opacity={0.25}
      />

      <ContainerLayout p={4} py={12}>
        <P
          className="fd title"
          fontSize={"1.5rem"}
          fontWeight={"semibold"}
          textAlign={"center"}
          mb={8}
        >
          Hadiah Pernikahan
        </P>

        <CContainer gap={4}>
          <CContainer className="qris" gap={2}>
            <P fontSize={"1rem"} fontWeight={"semibold"} textAlign={"center"}>
              QRIS
            </P>
            <Img
              src={`${IMAGES_PATH}/qris.jpg`}
              fluid
              w={"full"}
              maxW={"240px"}
              mx={"auto"}
            />
          </CContainer>

          <CContainer className="bca">
            <P fontSize={"1rem"} fontWeight={"semibold"} textAlign={"center"}>
              BCA
            </P>

            <HStack justify={"center"}>
              <P
                textAlign={"center"}
              >{`${GIFT.bca.accountNumber} (${GIFT.bca.accountHolder})`}</P>

              <Clipboard.Root value={GIFT.bca.accountNumber}>
                <Clipboard.Trigger asChild>
                  <Btn iconButton variant="ghost" size="xs" color={"dark"}>
                    <Clipboard.Indicator />
                  </Btn>
                </Clipboard.Trigger>
              </Clipboard.Root>
            </HStack>
          </CContainer>

          <CContainer className="mandiri">
            <P fontSize={"1rem"} fontWeight={"semibold"} textAlign={"center"}>
              Mandiri
            </P>

            <HStack justify={"center"}>
              <P
                textAlign={"center"}
              >{`${GIFT.mandiri.accountNumber} (${GIFT.mandiri.accountHolder})`}</P>

              <Clipboard.Root value={GIFT.mandiri.accountNumber}>
                <Clipboard.Trigger asChild>
                  <Btn iconButton variant="ghost" size="xs" color={"dark"}>
                    <Clipboard.Indicator />
                  </Btn>
                </Clipboard.Trigger>
              </Clipboard.Root>
            </HStack>
          </CContainer>
        </CContainer>
      </ContainerLayout>
    </CContainer>
  );
};

const Footer = () => {
  // Refs
  const imgRef = useRef<HTMLImageElement>(null);

  // Hooks
  const imgDimension = useDimension(imgRef);

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

      <ContainerLayout px={8} py={12}>
        <CContainer
          gap={4}
          p={8}
          border={"1px solid"}
          borderColor={"light"}
          pos={"relative"}
          justify={"end"}
          mt={`${imgDimension.height! / 2}px`}
        >
          <Img
            ref={imgRef}
            src={`${IMAGES_PATH}/footer.png`}
            fluid
            w={"full"}
            mt={"-70%"}
          />

          <CContainer gap={4} my={12}>
            <P
              className="fd"
              fontSize={"2rem"}
              fontWeight={"bold"}
              textAlign={"center"}
            >
              Thank You!
            </P>

            <P textAlign={"center"}>
              Saat kami memulai perjalanan hidup bersama sebagai satu keluarga,
              kami berterima kasih atas doa, dukungan, dan kehadiran Anda.
            </P>
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
    <CContainer overflowX={"clip"}>
      <Cover />
      <Intro />
      <BrideAndGroom />
      <Story />
      <Gallery />
      <EventDetails />
      <Gift />
      <Footer />
    </CContainer>
  );
}
