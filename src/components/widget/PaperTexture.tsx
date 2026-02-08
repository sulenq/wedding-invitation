"use client";

import { Img } from "@/components/ui/img";
import { IMAGES_PATH } from "@/constants/paths";
import { Props__Img } from "@/constants/props";

interface Props extends Props__Img {}

export const PaperTexture = (props: Props) => {
  return <Img src={`${IMAGES_PATH}/paperTexture.png`} fluid {...props} />;
};
