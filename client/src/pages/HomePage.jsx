import { useAnims } from "../context/AnimProvider";
import { useNavigate } from "react-router-dom";
import { VscEmptyWindow } from "react-icons/vsc";

import AnimCard from "../components/AnimCard";

export function HomePage() {
  const navigate = useNavigate();
  const { anims } = useAnims();

  if (anims.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center text-white">
        <VscEmptyWindow
          className="w-48 h-48 hover:cursor-pointer"
          onClick={() => {
            navigate(`/new`);
          }}
        />
        <h1 className="text-2xl">No hay animaciones publicadas</h1>
      </div>
    );
  }

  return (
    <div className="text-white mb-4">
      <header className="flex justify-between py-4">
        <h1>{`Animaciones (${anims.length})`}</h1>
      </header>

      <div className="grid grid-cols-4 gap-2">
        {anims.map((anim) => (
          <AnimCard anim={anim} key={anim._id} />
        ))}
      </div>
    </div>
  );
}
