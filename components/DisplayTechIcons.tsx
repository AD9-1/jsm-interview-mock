import React from "react";
import { fetcher, getTechIcon } from "../lib/utils";
import Image from "next/image";
const DisplayTechIcons = async ({ techstack }: { techstack: string[] }) => {
  const techIcons = await fetcher(techstack);
  console.log(techIcons);
  return (
    <div className="flex gap-2">
      {techIcons.map(({ item, url }) => (
        <div key={item} className="p-2 rounded-4xl relative bg-[#756789]">
          <span className="absolute hover:bg-[#211137] hover:p-2 hover:text-white">
            {item}
          </span>
          <Image src={url} width={20} height={20} alt={item}></Image>
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;
