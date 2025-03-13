import { NavLink } from "react-router";

import VimeoBakcground from "./VimeoBackground.jsx";

export default function Home() {
  const videos = ["1047919336", "1047919663", "1011376077"];

  return (
    <>
      <VimeoBakcground videoId={videos[1]} />
      <div className="flex h-screen w-full flex-col justify-end p-4 font-[Nimbus-Cond] text-xs">
        <NavLink>
          <div className="grid w-full grid-cols-4">
            <div></div>
            <h2 className="opacity-50">Engel</h2>
            <div></div>
            <div className=""></div>
          </div>
        </NavLink>
        <NavLink to="/project">
          <div className="grid w-full grid-cols-4 hover:bg-white/10 hover:font-[Nimbus-CondItal]">
            <div className="">{`34°36′14″S 58°22′54″O`}</div>
            <h2>YA PASO - Gregorio</h2>
            <div className="">2024</div>
            <div className="">Music Video</div>
          </div>
        </NavLink>
        <NavLink>
          <div className="grid w-full grid-cols-4">
            <div></div>
            <h2 className="opacity-50">NUNCA TE VAYAS DE CASA - CHECHI</h2>
            <div></div>
            <div className=""></div>
          </div>
        </NavLink>
        <NavLink>
          <div className="grid w-full grid-cols-4">
            <div></div>
            <h2 className="opacity-50">
              Creo en el tiempo como en una margarita
            </h2>
            <div></div>
            <div className=""></div>
          </div>
        </NavLink>
      </div>
    </>
  );
}
