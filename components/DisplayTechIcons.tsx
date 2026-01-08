import React from "react";
import  {getTechIcon} from "../lib/utils";
const DisplayTechIcons = async({ techstack} :{techstack:string[]}) => {
    const techIcons=await getTechIcon(techstack);
    console.log(techIcons);
  return (
    <div className="flex gap-2">
      {techIcons.slice(0,3).map(({tech, url}) => (
        <p key={tech}>{tech}</p>
      ))}
    </div>
  );
};

export default DisplayTechIcons;
