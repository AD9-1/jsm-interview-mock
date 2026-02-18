import React from "react";
import { cn, fetcher, getTechIcon } from "../lib/utils";
import Image from "next/image";
import clsx from "clsx";
const DisplayTechIcons = async ({ techstack }: { techstack: string[] }) => {
  const techIcons = await fetcher(techstack);
  console.log("from DisplayTechocons",techIcons);
  return (
    <div className="flex">
      {techIcons.map(({ item, url }, index) => (
        <div
          key={item}
          className={clsx(
            "p-2 rounded-4xl group relative bg-[#241b30] border",
            index > 0 && "-ml-3"
          )}//include -ml-3 only if index is greater than 0
        >
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
