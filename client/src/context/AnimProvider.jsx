import { useState, useContext, useEffect } from "react";
import {
  getAnimsRequests,
  getAnimRequests,
  createAnimRequests,
  updateAnimRequests,
  deleteAnimRequests,
} from "../api/anims.api.js";

import { AnimContext } from "./AnimContext";

export const useAnims = () => {
  const context = useContext(AnimContext);
  if (!context) {
    throw new Error("useAnims must be used within a AnimProvider");
  }
  return context;
};

export const AnimProvider = ({ children }) => {
  const [anims, setAnims] = useState([]);

  async function getAnims() {
    const response = await getAnimsRequests();
    setAnims(response.data);
  }

  useEffect(() => {
    getAnims();
  }, []);

  const getAnim = async (id) => {
    const response = await getAnimRequests(id);
    return response.data;
  };

  const createAnim = async (values) => {
    const response = await createAnimRequests(values);
    setAnims([...anims, response.data]);
  };

  const updateAnim = async (id, values) => {
    const response = await updateAnimRequests(id, values);
    setAnims(anims.map((anim) => (anim._id === id ? response.data : anim)));
  };

  const deleteAnim = async (id) => {
    const response = await deleteAnimRequests(id);
    if (response.status === 204) {
      setAnims(anims.filter((anim) => anim._id !== id));
    }
  };

  return (
    <AnimContext.Provider
      value={{
        anims,
        getAnims,
        getAnim,
        createAnim,
        updateAnim,
        deleteAnim,
      }}
    >
      {children}
    </AnimContext.Provider>
  );
};
