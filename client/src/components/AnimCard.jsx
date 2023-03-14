import { useNavigate } from "react-router-dom";
import { useAnims } from "../context/AnimProvider";
import MediaPlayer from "./MediaPlayer";

export default function AnimCard({ anim }) {
  const navigate = useNavigate();

  const { deleteAnim } = useAnims();

  return (
    <div
      className="bg-zinc-800 text-white rounded-sm shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer w-[360] h-[540]"
      onClick={() => {
        navigate(`/anims/${anim._id}`);
      }}
    >
      {/* Informacion */}
      <div className="px-4 py-7">
        <div className="flex justify-between">
          <h3 className="text-lg">{anim.title}</h3>
          <button
            className="bg-red-600 hover:bg-red-500 text-sm px-2 py-1 rounded-sm"
            onClick={(e) => {
              e.stopPropagation();
              deleteAnim(anim._id);
            }}
          >
            Eliminar
          </button>
        </div>
        <p className="text-sm">{anim.description}</p>
      </div>
      {/* Reproductor */}
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="flex justify-center"
      >
        {anim.media && (
          <MediaPlayer
            type={anim.media.fileType}
            public_id={anim.media.public_id}
          />
        )}
      </div>
    </div>
  );
}
