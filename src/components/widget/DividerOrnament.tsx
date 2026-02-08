"use client";

import { CContainer } from "@/components/ui/c-container";
import { StackProps } from "@chakra-ui/react";

interface Props extends StackProps {
  color?: string;
}

export const DividerOrnament = (props: Props) => {
  // Props
  const { color, ...restProps } = props;

  // States
  const resolvedColor = color || "white";

  return (
    <CContainer maxW={"300px"} mx={"auto"} {...restProps}>
      <svg
        width="100%"
        height="80"
        viewBox="0 0 900 80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          fill="none"
          stroke={resolvedColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
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
    </CContainer>
  );
};
