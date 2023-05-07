import React, { forwardRef } from "react";

//module
import useDraggable from "module/Draggable/useDraggable";

//component
import ProfileItem from "components/ProfileItem";
import GameItem from "components/GameItem";

const gampeItems = [
  {
    imageSrc: "/assets/everest02.avif",
    title: "game1",
    desc: "game1 is GooseGooseDuck",
  },
  {
    imageSrc: "/assets/everest02.avif",
    title: "game2",
    desc: "game2 is LeagueOfLegends",
  },
  {
    imageSrc: undefined,
    title: "game3",
    desc: "game3 is ApexLegend",
  },
];

const profileItems = [
  {
    imageSrc: "/assets/everest02.avif",
    title: "game1",
    desc: "game1 is GooseGooseDuck",
  },
  {
    imageSrc: "/assets/everest02.avif",
    title: "game2",
    desc: "game2 is LeagueOfLegends",
  },
  {
    imageSrc: undefined,
    title: "game3",
    desc: "game3 is ApexLegend",
  },
];

function Root() {
  const { wrapperRef } = useDraggable();
  const { wrapperRef: profileWrapperRef } = useDraggable();

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col p-3">
          <h1 className="text-2xl font-bold">Game Droppable</h1>
          <div
            ref={wrapperRef}
            className="flex max-w-xs flex-col gap-3 p-4 transition-all"
          >
            {gampeItems.map(function (item) {
              return (
                <>
                  <GameItem {...item} />
                </>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col p-3">
          <h1 className="text-2xl font-bold">Profile Droppable</h1>
          <div
            ref={profileWrapperRef}
            className="flex max-w-xs flex-col gap-3 p-4 transition-all"
          >
            {profileItems.map(function (item) {
              return (
                <>
                  <ProfileItem {...item} />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Root;
