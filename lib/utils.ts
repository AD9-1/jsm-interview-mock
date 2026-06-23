import { mappings } from "@/constants/index.t";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const interviewCoverImages = [
  "amazon.jpg",
  "facebook.png",
  "instagram.png",
  "microsoft.png",
  "musigma.jpg",
  "quora.png",
  "reddit.jpg",
  "Revi.png",
  "teams.png",
  "twitter.png"
];
const techIcons = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const iconsMap = (tech: string) => {
  const k = tech.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");

  return  mappings[k];
};
//
export const fetcher = async (techArray: string[]) => {
  const icons = techArray?.map((tech) => iconsMap(tech));
  return icons.map((item) => {
    return {
      item,
      url: `${techIcons}/${item}/${item}-original.svg`,
    };
  });
};

export function getRandomInterviewCoverImage() {
  const index = Math.floor(Math.random() * interviewCoverImages.length);
  return `/covers/${interviewCoverImages[index]}`;
}
