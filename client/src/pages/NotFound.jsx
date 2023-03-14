import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <div className="text-2xl mb-4">
        Lo siento, parece que lo que buscas está en otro castillo
      </div>
      <div className="text-stone-300 hover:cursor-pointer flex w-fit text-lg animate-pulse">
        <p
          onClick={() => {
            navigate("/");
          }}
        >
          {"Ta bien >>"}
        </p>
      </div>
    </>
  );
}
