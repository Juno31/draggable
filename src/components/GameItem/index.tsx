import React from "react";

export interface GameItemProps {
  imageSrc?: string;
  title?: string;
  desc?: string;
}

function GameItem({ imageSrc, title, desc }: GameItemProps) {
  return (
    <>
      <div className="flex w-60 cursor-pointer flex-col overflow-hidden rounded-md border border-black border-opacity-50 shadow-xl">
        <div className="w-full">
          <img
            src={imageSrc ?? "/assets/everlast01.jpeg"}
            className="object-cover"
          />
        </div>
        <div className="p-3">
          <h1>{title}</h1>
          <h1>{desc}</h1>
        </div>
      </div>
    </>
  );
}

export default GameItem;
