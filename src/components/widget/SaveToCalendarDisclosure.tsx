"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import {
  DisclosureBody,
  DisclosureContent,
  DisclosureHeader,
  DisclosureRoot,
} from "@/components/ui/disclosure";
import { DisclosureHeaderContent } from "@/components/ui/disclosure-header-content";
import { P } from "@/components/ui/p";
import { AppIcon } from "@/components/widget/AppIcon";
import useBackOnClose from "@/hooks/useBackOnClose";
import { disclosureId } from "@/utils/disclosure";
import { Box } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  eventTitle: string;
  eventDescription: string;
  eventLocation: string;
  icsPath: string;
  startUTC: string; // e.g. "20260531T010000Z"
  endUTC: string; // e.g. "20260531T060000Z"
}

export const SaveToCalendarDisclosure = ({
  eventTitle,
  eventDescription,
  eventLocation,
  icsPath,
  startUTC,
  endUTC,
}: Props) => {
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(disclosureId("save-to-calendar"), open, onOpen, onClose);

  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    setIsIOS(/iphone|ipad|ipod/i.test(navigator.userAgent));
    setIsAndroid(/android/i.test(navigator.userAgent));
  }, []);

  const icsUrl = icsPath;
  const googleUrl =
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent(eventTitle)}` +
    `&dates=${startUTC}%2F${endUTC}` +
    `&details=${encodeURIComponent(eventDescription)}` +
    `&location=${encodeURIComponent(eventLocation)}`;

  type CalOption = {
    label: string;
    sublabel: string;
    href: string;
    download?: string;
    newTab?: boolean;
  };

  const options: CalOption[] = [
    // ICS — works natively on iOS (opens Apple Calendar directly), download on Android
    {
      label: isIOS
        ? "Apple Calendar"
        : isAndroid
          ? "Kalender Bawaan Android"
          : "Download ICS",
      sublabel: isIOS
        ? "Buka langsung di Apple Calendar"
        : isAndroid
          ? "Buka dengan kalender default Android"
          : "File .ics untuk semua aplikasi kalender",
      href: icsUrl,
      // No download attr on iOS — let Safari handle .ics natively (no warning)
      download: isIOS ? undefined : "pernikahan-fatwa-adelia.ics",
    },
    // Google Calendar — available all platforms
    {
      label: "Google Calendar",
      sublabel: "Buka di Google Calendar",
      href: googleUrl,
      newTab: true,
    },
  ];

  return (
    <>
      <Btn variant={"outline"} color={"dark"} onClick={onOpen}>
        <AppIcon icon={CalendarIcon} />
        Simpan ke Kalender
      </Btn>

      <DisclosureRoot open={open} size={"xs"}>
        <DisclosureContent>
          <DisclosureHeader>
            <DisclosureHeaderContent title={"Simpan ke Kalender"} />
          </DisclosureHeader>

          <DisclosureBody>
            <CContainer gap={2} py={2}>
              {options.map((opt) => (
                <a
                  key={opt.label}
                  href={opt.href}
                  download={opt.download}
                  target={opt.newTab ? "_blank" : undefined}
                  rel={"noopener noreferrer"}
                  onClick={onClose}
                >
                  <Box
                    p={4}
                    border={"1px solid"}
                    borderColor={"d0"}
                    rounded={"lg"}
                    cursor={"pointer"}
                    transition={"all 0.15s"}
                    _hover={{ bg: "d0" }}
                    _active={{ bg: "d1" }}
                  >
                    <CContainer gap={0.5}>
                      <P fontWeight={"semibold"}>{opt.label}</P>
                      <P fontSize={"sm"} color={"fg.muted"}>
                        {opt.sublabel}
                      </P>
                    </CContainer>
                  </Box>
                </a>
              ))}
            </CContainer>
          </DisclosureBody>
        </DisclosureContent>
      </DisclosureRoot>
    </>
  );
};
