"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { useColorMode } from "@/components/ui/color-mode";
import { Img } from "@/components/ui/img";
import { NavLink } from "@/components/ui/nav-link";
import { P } from "@/components/ui/p";
import { AppIcon } from "@/components/widget/AppIcon";
import { CountDown } from "@/components/widget/CountDown";
import { DividerOrnament } from "@/components/widget/DividerOrnament";
import { ImgViewer } from "@/components/widget/ImgViewer";
import { Logo } from "@/components/widget/Logo";
import { ContainerLayout } from "@/components/widget/Page";
import { PaperTexture } from "@/components/widget/PaperTexture";
import { SaveToCalendarDisclosure } from "@/components/widget/SaveToCalendarDisclosure";
import { BgMusic } from "@/components/widget/BgMusic";
import { IMAGES_PATH, SVGS_PATH } from "@/constants/paths";
import { useDimension } from "@/hooks/useDimension";
import { useIsSmScreenWidth } from "@/hooks/useIsSmScreenWidth";
import {
  Box,
  Center,
  Clipboard,
  HStack,
  Image,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRightIcon, ChevronDownIcon, MapPinIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const COVER = {
  bride: "Adelia",
  groom: "Fatwa",
  img: `${IMAGES_PATH}/cover.jpg`,
  date: "31.05.2026",
  quote:
    "Dengan memohon ridho Allah SWT, kami melangkah ke dalam ikatan pernikahan sebagai bentuk ibadah dan ketaatan kepada-Nya.",
};
const INTRO = {
  bride: "Adelia Dian Pratiwi",
  groom: "Fatwa Linovera",
  img: `${IMAGES_PATH}/intro.gif`,
};
const BAG = {
  intro:
    "Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada acara pernikahan kami.",
  bride: {
    name: "Adelia Dian Pratiwi",
    childOf: "Putri dari",
    parents: ["Bapak Widodo", "Ibu Tri Wahyuningsih"],
    img: `${IMAGES_PATH}/bride.jpg`,
    gif: `${IMAGES_PATH}/bride.gif`,
  },
  groom: {
    name: "Fatwa Linovera",
    childOf: "Putra dari",
    parents: ["Bapak Muhamad Nurfuad", "Ibu Sri Rahayu"],
    img: `${IMAGES_PATH}/groom.jpg`,
    gif: `${IMAGES_PATH}/groom.gif`,
  },
};
const STORY = [
  "Kami pertama kali “bertemu” di sebuah antrean yang tidak bergerak sama sekali. Entah sistemnya yang bermasalah atau memang waktunya yang sedang tidak berpihak, kami sama-sama terjebak di situ cukup lama. Dari sekadar saling melirik karena bosan, berlanjut ke obrolan ringan yang awalnya tidak punya tujuan apa-apa.",
  "Setelah itu, kami seperti sering bertemu di tempat-tempat yang bahkan tidak kami rencanakan. Dari lokasi yang terlalu jauh untuk disebut kebetulan, sampai acara yang sebenarnya tidak terlalu ingin kami hadiri. Anehnya, setiap pertemuan terasa seolah sudah ada jalurnya sendiri, meskipun tidak pernah benar-benar kami atur.",
  "Seiring waktu, muncul berbagai momen yang terasa penting—percakapan panjang di waktu yang tidak ideal, keputusan spontan yang tiba-tiba terasa berarti, dan hal-hal kecil yang entah bagaimana jadi alasan untuk terus melangkah. Tidak selalu masuk akal, tapi cukup untuk membuat kami tetap berjalan ke arah yang sama.",
  "Dan ya, cerita ini memang <b>FIKTIF</b>. Versi aslinya jauh lebih sederhana, mungkin juga lebih random, dan jelas tidak se-terstruktur ini. Tapi tidak apa-apa, yang penting doakan saja kami semoga selalu bahagia dunia dan akhirat.",
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
    accountNumber: "8915347271",
    accountHolder: "ADELIA DIAN PRATIWI",
  },
  mandiri: {
    accountNumber: "1360019337945",
    accountHolder: "FATWA LINOVERA",
  },
};
const GALLERY_PHOTOS = [
  `${IMAGES_PATH}/gallery/1.jpg`,
  `${IMAGES_PATH}/gallery/15.jpg`,
  `${IMAGES_PATH}/gallery/3.jpg`,
  `${IMAGES_PATH}/gallery/4.jpg`,
  `${IMAGES_PATH}/gallery/5.jpg`,
  `${IMAGES_PATH}/gallery/13.jpg`,
];
const FOOTER = {
  img: `${IMAGES_PATH}/footer.jpg`,
};

const Cover = ({
  isOpened,
  // onOpen,
}: {
  isOpened: boolean;
  // onOpen: () => void;
}) => {
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
        left: "-100%",
        bottom: "-50%",
        rotate: "-10deg",
        opacity: 0,
        ease: "none",
        duration: 1.5,
      })
        .to(
          ".cover_bush_r",
          {
            right: "-100%",
            bottom: "-50%",
            rotate: "5deg",
            opacity: 0,
            ease: "none",
            duration: 1.5,
          },
          "<",
        )
        .to(
          ".blur_filter",
          {
            opacity: 0,
            ease: "none",
            duration: 1,
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
            right: "-200%",
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
        .from(
          ".cover_content",
          {
            opacity: 0,
            ease: "none",
            duration: 1,
          },
          ">+1",
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
          ">+0.5",
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
      <ContainerLayout h={"100lvh"} align={"center"} justify={"center"} p={8}>
        {/* Bg */}
        <CContainer className={"cover_bg"} h={"100vh"} pos={"absolute"} top={0}>
          <Image src={COVER.img} h={"100lvh"} w={"full"} />

          {/* <PaperTexture
            h={"full"}
            w={"full"}
            opacity={0.25}
            pos={"absolute"}
            top={0}
          /> */}
        </CContainer>

        {/* Cover content */}
        <CContainer
          className={"cover_content"}
          h={"full"}
          align={"center"}
          gap={8}
          pb={"100px"}
          pos={"absolute"}
          top={0}
          left={0}
          backgroundColor={"blackAlpha.600"}
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

            <CContainer w={"fit"} align={"center"}>
              <P
                className="fd"
                fontSize={"3rem"}
                fontWeight={"bold"}
                // textAlign={"center"}
                lineHeight={1}
              >
                {COVER.groom}
              </P>

              <P
                className="fd"
                fontSize={"3rem"}
                fontWeight={"bold"}
                // textAlign={"center"}
                lineHeight={1}
              >
                {COVER.bride}
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
              w={"1.2px"}
              h={"0"}
              pos={"absolute"}
              bottom={"50px"}
              zIndex={5}
            />
          </CContainer>
        </CContainer>

        {/* Chevron down */}
        <VStack
          className="chevron_down"
          zIndex={11}
          mt={"auto"}
          mb={"50px"}
          // visibility={isOpened ? "visible" : "hidden"}
        >
          <P fontWeight={"medium"} textAlign={"center"}>
            Scroll
          </P>

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
          key={`flowers-l-${iss}`}
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
          left={"-40%"}
          transform={"rotate(10deg)"}
          pointerEvents={"none"}
          zIndex={4}
        />

        <Img
          key={`flowers-r-${iss}`}
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
          right={"-40%"}
          transform={"rotate(-5deg)"}
          pointerEvents={"none"}
          zIndex={4}
        />
      </>

      {/* Bushes */}
      <>
        <Img
          key={`bush-l-${iss}`}
          className="cover_bush_l"
          src={iss ? `${IMAGES_PATH}/bushSmall.png` : `${IMAGES_PATH}/bush.png`}
          alt="bush"
          h={"80%"}
          aspectRatio={[0.8710691824, null, 2.3899371069]}
          pos={"absolute"}
          bottom={"-20%"}
          left={"-10%"}
          pointerEvents={"none"}
          zIndex={4}
        />
        <Img
          key={`bush-r-${iss}`}
          className="cover_bush_r"
          src={
            iss ? `${IMAGES_PATH}/bushSmallR.png` : `${IMAGES_PATH}/bushR.png`
          }
          alt="bush"
          h={"80%"}
          aspectRatio={[0.8710691824, null, 2.3899371069]}
          pos={"absolute"}
          bottom={"-20%"}
          right={"-10%"}
          pointerEvents={"none"}
          zIndex={4}
        />
      </>

      {/* Blur overlay */}
      <CContainer
        className={"blur_filter"}
        align={"center"}
        justify={"center"}
        gap={8}
        w={"full"}
        h={"full"}
        p={8}
        backdropFilter={"blur(4px)"}
        pos={"absolute"}
        top={0}
        left={0}
        zIndex={10}
        transition={"all 0.5s ease"}
        opacity={isOpened ? 0 : 1}
        pointerEvents={isOpened ? "none" : "auto"}
      >
        <Logo size={200} ml={"40px"} my={"auto"} className={"blur_filter"} />

        {/* <Btn
          size={"sm"}
          variant={"solid"}
          colorPalette={"white"}
          px={8}
          rounded={"full"}
          visibility={isOpened ? "hidden" : "visible"}
          mb={12}
          onClick={onOpen}
          zIndex={9999}
        >
          Buka Undangan
        </Btn> */}
      </CContainer>
    </CContainer>
  );
};

const Intro = () => {
  const LINE_H_NUM = 400;

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 25%",
          end: "bottom 110%",
          scrub: true,
          // pin: true,
          // pinSpacing: true,
          // markers: true, // debug
        },
      });

      tl.from(
        ".bride",
        {
          x: `-50px`,
          opacity: 0,
          ease: "none",
        },
        "<",
      )
        .from(
          ".groom",
          {
            x: `50px`,
            opacity: 0,
            ease: "none",
          },
          "<",
        )
        .to(
          ".bride",
          {
            y: LINE_H_NUM + 180 + 50,
            ease: "linear",
            duration: 2,
          },
          ">+0.125",
        )
        .to(
          ".groom",
          {
            y: LINE_H_NUM + 180,
            ease: "linear",
            duration: 2,
          },
          "<",
        )
        .fromTo(
          ".intro_line",
          {
            height: "0px",
            ease: "none",
          },
          {
            height: LINE_H_NUM,
            ease: "none",
            duration: 1.5,
          },
          "<",
        )
        .from(
          ".countdown",
          {
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

      <ContainerLayout align={"center"} gap={12} zIndex={2}>
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

        <VStack h={`${LINE_H_NUM}px`}>
          <Box
            className="intro_line"
            bg={"dark"}
            w={"1.2px"}
            h={"0"}
            zIndex={5}
          />
        </VStack>

        <CContainer
          className="countdown"
          align={"center"}
          gap={12}
          mt={"100px"}
        >
          <Img
            src={INTRO.img}
            fluid
            w={"full"}
            maxW={"240px"}
            transform={"scaleX(-1)"}
          />

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
          end: "bottom bottom",
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
          "<+0.2",
        )
        .from(
          ".brideLineart",
          {
            x: "20px",
            opacity: 0,
            ease: "none",
          },
          "<+0.05",
        )
        .from(
          [".groomImg", ".groomInfo"],
          {
            opacity: 0,
            ease: "none",
            delay: 1,
          },
          "<+0.05",
        )
        .from(
          ".groomLineart",
          {
            x: "-20px",
            opacity: 0,
            ease: "none",
          },
          "<+0.05",
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
          <Center px={8} pos={"relative"} maxW={"360px"} mx={"auto"}>
            <Box className="brideImg">
              <Img src={BAG.bride.img} fluid w={"full"} />
            </Box>

            <Box
              className="brideLineart"
              pos={"absolute"}
              bottom={"-30px"}
              right={"-40px"}
            >
              <Img src={BAG.bride.gif} fluid w={"140px"} />
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
                {BAG.bride.name}
              </P>

              <CContainer color={"fg.muted"}>
                <P textAlign={"center"}>{BAG.bride.childOf}</P>
                <P textAlign={"center"}>{BAG.bride.parents[0]}</P>
                <P textAlign={"center"}>dan</P>
                <P textAlign={"center"}>{BAG.bride.parents[1]}</P>
              </CContainer>
            </CContainer>
          </CContainer>
        </CContainer>

        {/* Fatwa */}
        <CContainer p={4} mt={24}>
          <Center
            // className="debug"
            maxW={"360px"}
            px={8}
            mx={"auto"}
            pos={"relative"}
          >
            <Box className="groomImg">
              <Img src={BAG.groom.img} fluid w={"full"} />
            </Box>

            <Box
              className="groomLineart"
              pos={"absolute"}
              top={"-120px"}
              left={"-30px"}
            >
              <Img src={BAG.groom.gif} fluid w={"150px"} />
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
                {BAG.groom.name}
              </P>

              <CContainer color={"fg.muted"}>
                <P textAlign={"center"}>{BAG.groom.childOf}</P>
                <P textAlign={"center"}>{BAG.groom.parents[0]}</P>
                <P textAlign={"center"}>dan</P>
                <P textAlign={"center"}>{BAG.groom.parents[1]}</P>
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
          start: "top 75%",
          end: "bottom bottom",
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
          stagger: 0.1,
          delay: 0.1,
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
        src={`${IMAGES_PATH}/brideAndGroom2.gif`}
        fluid
        aspectRatio={16 / 10}
        w={"full"}
      />

      <ContainerLayout px={8} py={12}>
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
          {STORY.map((paragraph, index) => {
            return (
              <P key={index} className="paragraph">
                {paragraph}
              </P>
            );
          })}
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
  // Top Gallery
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".topGallery",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
          // pin: true,
          // pinSpacing: true,
          // markers: true, // debug
        },
      });

      tl.from(".img1", {
        opacity: 0,
        scale: 0.75,
        ease: "none",
        stagger: 0.1,
      });
    },
    { scope: containerRef },
  );

  // Bottom Gallery
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".bottomGallery",
          start: "top bottom",
          end: "110% bottom",
          scrub: true,
          // pin: true,
          // pinSpacing: true,
          // markers: true, // debug
        },
      });

      tl.from(".img2", {
        opacity: 0,
        scale: 0.75,
        ease: "none",
        stagger: 0.1,
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
            {/* Top */}
            <CContainer className={"topGallery"} gap={GAP} h={"full"}>
              <ImgViewer
                className="img1"
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
                className="img1"
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
                className="img1"
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

          {/* Bottom */}
          <CContainer className={"bottomGallery"} gap={GAP} h={"full"}>
            <ImgViewer
              className="img2"
              srcs={GALLERY_PHOTOS}
              srcIndex={3}
              h={"full"}
              w={"full"}
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
                className="img2"
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
                className="img2"
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
          start: "top 50%",
          end: "bottom 75%",
          // scrub: true,
          // pin: true,
          // pinSpacing: true,
          // markers: true, // debug
        },
      });

      tl.from(
        ".title",
        {
          opacity: 0,
          ease: "none",
        },
        "<+0.2",
      )
        .from(
          ".time",
          {
            opacity: 0,
            ease: "none",
          },
          "<+0.2",
        )
        .from(
          ".place",
          {
            opacity: 0,
            ease: "none",
          },
          "<+0.2",
        );
    },
    { scope: containerRef },
  );

  return (
    <CContainer
      // className="debug"
      ref={containerRef}
      pos={"relative"}
      bg={"light"}
      color={"dark"}
    >
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
                <SaveToCalendarDisclosure
                  eventTitle={"Pernikahan Fatwa & Adelia"}
                  eventDescription={
                    `Akad Nikah: 08.00 WIB s/d Selesai\n` +
                    `Resepsi: 11.00 WIB s/d 13.00 WIB\n\n` +
                    EVENT.place.name +
                    `\n` +
                    EVENT.place.address
                  }
                  eventLocation={EVENT.place.address}
                  icsPath={"/assets/icss/resepsi.ics"}
                  startUTC={"20260531T010000Z"}
                  endUTC={"20260531T060000Z"}
                />
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

  // States
  // const [showRekening, setShowRekening] = useState<boolean>(false);

  // GSAP
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          end: "bottom 75%",
          // scrub: true,
          // pin: true,
          // pinSpacing: true,
          // markers: true, // debug
        },
      });

      tl.from(".title", {
        opacity: 0,
        ease: "none",
      })
        .from(
          ".subTitle",
          {
            opacity: 0,
            ease: "none",
          },
          "<+0.2",
        )
        .from(
          ".rekeningToggleButton",
          {
            opacity: 0,
            ease: "none",
          },
          "<+0.2",
        )
        .from(
          ".bca",
          {
            opacity: 0,
            ease: "none",
          },
          "<+0.2",
        )
        .from(
          ".mandiri",
          {
            opacity: 0,
            ease: "none",
          },
          "<+0.2",
        );
    },
    { scope: containerRef },
  );

  return (
    <CContainer
      ref={containerRef}
      // bgImage={`url(${IMAGES_PATH}/gallery/11.jpg)`}
      bgSize={"cover"}
      bgPos={"center"}
      color={"dark"}
      pos={"relative"}
    >
      {/* <PaperTexture
        w={"full"}
        h={"full"}
        pos={"absolute"}
        top={0}
        left={0}
        opacity={0.25}
      /> */}

      <CContainer bg={"d2"} color={"light"}>
        <ContainerLayout p={4} py={12} zIndex={2}>
          <CContainer gap={2} mb={4}>
            <P
              className="fd title"
              fontSize={"1.5rem"}
              fontWeight={"semibold"}
              textAlign={"center"}
            >
              Hadiah Pernikahan
            </P>

            <P className={"subTitle"} textAlign={"center"} color={"fg.muted"}>
              Tanpa mengurangi rasa hormat, bagi Bapak/Ibu/Saudara/i yang ingin
              memberikan tanda kasih untuk kami, dapat melalui:
            </P>
          </CContainer>

          {/* <Center className={"rekeningToggleButton"}>
            <Btn
              w={"fit"}
              mx={"auto"}
              rounded={0}
              onClick={() => {
                setShowRekening((ps) => !ps);
              }}
            >
              {showRekening ? "Sembunyikan" : "Kirim Hadiah"}
            </Btn>
          </Center> */}

          <CContainer
            gap={8}
            maxW={"400px"}
            p={4}
            mx={"auto"}
            // display={showRekening ? "flex" : "none"}
            // opacity={showRekening ? 1 : 0}
            transition={"200ms"}
          >
            <CContainer
              className={"bca"}
              aspectRatio={3 / 2}
              justify={"space-between"}
              p={4}
              bg={"#0060af"}
              rounded={"24px"}
              color={"white"}
              overflow={"clip"}
              pos={"relative"}
            >
              {/* Pattern */}
              <>
                <Box
                  w={"320px"}
                  h={"320px"}
                  bg={"whiteAlpha.100"}
                  rounded={"lg"}
                  pos={"absolute"}
                  right={"-180px"}
                  top={"-100px"}
                  transform={"rotate(20deg)"}
                />

                <Box
                  w={"360px"}
                  h={"360px"}
                  bg={"whiteAlpha.100"}
                  rounded={"lg"}
                  pos={"absolute"}
                  right={"-260px"}
                  top={"-100px"}
                  transform={"rotate(17deg)"}
                />

                <Box
                  w={"350px"}
                  h={"350px"}
                  bg={"whiteAlpha.100"}
                  rounded={"lg"}
                  pos={"absolute"}
                  right={"-280px"}
                  top={"-100px"}
                  transform={"rotate(8deg)"}
                />
              </>

              {/* Content */}
              <>
                <Img
                  src={`${SVGS_PATH}/logo_bca.svg`}
                  alt={"BCA"}
                  fluid
                  h={"18px"}
                  w={"fit"}
                />

                <CContainer gap={1}>
                  <HStack>
                    <P fontWeight={"semibold"}>{`${GIFT.bca.accountNumber}`}</P>

                    <Clipboard.Root value={GIFT.bca.accountNumber}>
                      <Clipboard.Trigger asChild>
                        <Btn
                          iconButton
                          variant={"ghost"}
                          size={"2xs"}
                          color={"white"}
                        >
                          <Clipboard.Indicator />
                        </Btn>
                      </Clipboard.Trigger>
                    </Clipboard.Root>
                  </HStack>

                  <P fontSize={"sm"}>{`a.n. ${GIFT.bca.accountHolder}`}</P>
                </CContainer>
              </>
            </CContainer>

            <CContainer
              className={"mandiri"}
              aspectRatio={3 / 2}
              justify={"space-between"}
              p={4}
              bg={"#228ecdff"}
              rounded={"24px"}
              color={"white"}
              overflow={"clip"}
              pos={"relative"}
            >
              {/* Pattern */}
              <Box
                pos={"absolute"}
                top={0}
                left={0}
                w={"full"}
                h={"full"}
                pointerEvents={"none"}
              >
                <Box
                  w={"300px"}
                  h={"300px"}
                  bg={"whiteAlpha.100"}
                  rounded={"full"}
                  pos={"absolute"}
                  right={"-120px"}
                  bottom={"-150px"}
                />
                <Box
                  w={"200px"}
                  h={"200px"}
                  bg={"whiteAlpha.200"}
                  rounded={"full"}
                  pos={"absolute"}
                  right={"-50px"}
                  bottom={"-100px"}
                />
                {/* Yellow Accent */}
                <Box
                  w={"350px"}
                  h={"350px"}
                  border={"2px solid"}
                  borderColor={"#ffb800"}
                  opacity={0.8}
                  rounded={"full"}
                  pos={"absolute"}
                  right={"-250px"}
                  bottom={"-200px"}
                />
              </Box>

              {/* Content */}
              <>
                <Img
                  src={`${SVGS_PATH}/logo_mandiri.svg`}
                  alt={"Mandiri"}
                  fluid
                  h={"18px"}
                  w={"fit"}
                />

                <CContainer gap={1}>
                  <HStack>
                    <P
                      fontWeight={"semibold"}
                    >{`${GIFT.mandiri.accountNumber}`}</P>

                    <Clipboard.Root value={GIFT.mandiri.accountNumber}>
                      <Clipboard.Trigger asChild>
                        <Btn
                          iconButton
                          variant={"ghost"}
                          size={"2xs"}
                          color={"white"}
                        >
                          <Clipboard.Indicator />
                        </Btn>
                      </Clipboard.Trigger>
                    </Clipboard.Root>
                  </HStack>

                  <P fontSize={"sm"}>{`a.n. ${GIFT.mandiri.accountHolder}`}</P>
                </CContainer>
              </>
            </CContainer>
          </CContainer>
        </ContainerLayout>
      </CContainer>
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

      <ContainerLayout px={8} pt={8} pb={12} zIndex={2}>
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
            src={FOOTER.img}
            fluid
            w={"full"}
            mt={"-70%"}
            filter={"grayscale(1)"}
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
  // States
  const [isOpened, setIsOpened] = useState(false);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // Hooks
  const { setColorMode } = useColorMode();

  // Force dark mode
  useEffect(() => {
    setColorMode("dark");
  }, []);

  // Handle scroll to open
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10 && !isOpened) {
        setIsOpened(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpened]);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!isOpened) document.body.scrollTo(0, 0);

    if (isOpened) {
      ScrollTrigger.refresh();
      const ro = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });

      ro.observe(containerRef.current);

      return () => {
        document.body.style.overflow = "";
        ro.disconnect();
      };
    }

    document.body.style.overflow = "";
  }, [isOpened]);

  return (
    <CContainer
      ref={containerRef}
      overflowX={"clip"}
      maxH={isOpened ? "auto" : "100lvh"}
      // overflowY={isOpened ? "visible" : "hidden"}
    >
      <BgMusic isOpened={isOpened} />
      <Cover
        isOpened={isOpened}
        // onOpen={() => setIsOpened(true)}
      />
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
