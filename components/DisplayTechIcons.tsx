import React from "react";
import { fetcher, getTechIcon } from "../lib/utils";
import Image from "next/image";
const DisplayTechIcons = async ({ techstack }: { techstack: string[] }) => {
  const techIcons = await fetcher(techstack);
  console.log(techIcons);
  return (
    <div className="flex gap-2">
      {techIcons.map(({ item, url }) => (
        <div key={item} className="p-2 rounded-4xl group relative bg-[#241b30]">
          <span
            className=" hidden absolute bottom-full right-0.5 group-hover:block
          bg-[#49454e] p-1 text-white text-[10px] rounded-xl"
          >
            {item}
          </span>
          <Image src={url} width={12} height={20} alt={item}></Image>
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;
