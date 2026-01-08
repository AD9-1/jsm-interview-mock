import React from "react";

const DisplayTechIcons = ({ techstack }: string[]) => {
  return (
    <div className="flex gap-2">
      {techstack.map((tech) => (
        <p key={tech}>{tech}</p>
      ))}
    </div>
  );
};

export default DisplayTechIcons;
