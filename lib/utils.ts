import { mappings } from "@/constants/index.t";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const techIcons = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const iconsMap = (tech: string) => {
  const k = tech.toLowerCase().replace("/.js$/", "").replace(/\s+/g, "");
  return mappings[k as keyof typeof mappings];
};
export const getTechIcon = async (techArray: string[]) => {
 return techArray.map((tech) => {
    const iconName = iconsMap(tech);
    return { iconName, url: `${iconName}/${iconName}/${iconName}-original.svg` };
  });
};
