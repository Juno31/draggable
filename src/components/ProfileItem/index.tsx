import React from "react";

export interface ProfileItemProps {
  imageSrc?: string;
  title?: string;
  desc?: string;
}

function ProfileItem({ imageSrc, title, desc }: ProfileItemProps) {
  return (
    <>
      <div className="flex h-20 w-max cursor-pointer flex-row items-center gap-3 rounded-md border border-black border-opacity-50">
        <img
          src={imageSrc ?? "/assets/everlast01.jpeg"}
          className="h-full object-cover"
        />
        <div className="flex w-[200px] flex-col gap-1 p-3">
          <h1>{title}</h1>
          <h1>{desc}</h1>
        </div>
      </div>
    </>
  );
}

export default ProfileItem;
