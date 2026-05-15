import { mappings } from "@/constants/index.t";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const techIcons = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const iconsMap = (tech: string) => {
  const k = tech.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");
  console.log("from iconsMap",mappings[k as keyof typeof mappings]);
  return mappings[k as keyof typeof mappings];
};
// 
export const fetcher = async (techArray: string[]) => {
  const icons = techArray.map((tech) => iconsMap(tech));
  return icons.map((item) => {
    return {
      item,
      url: `${techIcons}/${item}/${item}-original.svg`,
    };
  });
};
