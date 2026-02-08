"use client";

import { useEffect, useState } from "react";
import { SimpleGrid, VStack } from "@chakra-ui/react";
import { P } from "@/components/ui/p";

type CountDownProps = {
  targetAt: string | number | Date;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const calcTimeLeft = (target: number): TimeLeft => {
  const diff = Math.max(target - Date.now(), 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
};

export const CountDown = ({ targetAt }: CountDownProps) => {
  const targetTime = new Date(targetAt).getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calcTimeLeft(targetTime),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calcTimeLeft(targetTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return (
    <SimpleGrid columns={4} gap={4}>
      <VStack>
        <P
          fontSize="1.25rem"
          fontWeight="semibold"
          fontVariantNumeric="tabular-nums"
        >
          {`${timeLeft.days}`}
        </P>
        <P fontSize="sm">Days</P>
      </VStack>

      <VStack>
        <P
          fontSize="1.25rem"
          fontWeight="semibold"
          fontVariantNumeric="tabular-nums"
        >
          {`${timeLeft.hours}`}
        </P>
        <P fontSize="sm">Hours</P>
      </VStack>

      <VStack>
        <P
          fontSize="1.25rem"
          fontWeight="semibold"
          fontVariantNumeric="tabular-nums"
        >
          {`${timeLeft.minutes}`}
        </P>
        <P fontSize="sm">Minutes</P>
      </VStack>

      <VStack>
        <P
          fontSize="1.25rem"
          fontWeight="semibold"
          fontVariantNumeric="tabular-nums"
        >
          {`${timeLeft.seconds}`}
        </P>
        <P fontSize="sm">Seconds</P>
      </VStack>
    </SimpleGrid>
  );
};
