import React from "react";
import  {fetcher, getTechIcon} from "../lib/utils";
const DisplayTechIcons = async({ techstack} :{techstack:string[]}) => {
    const techIcons=await fetcher(techstack);
    console.log(techIcons);
  return (
    <div className="flex gap-2">
      {techIcons.map(({item, url}) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
};

export default DisplayTechIcons;
