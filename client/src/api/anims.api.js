import axios from "axios";

export const getAnimsRequests = async () => {
  return await axios.get("http://localhost:4000/anims/");
};

export const getAnimRequests = async (id) => {
  return await axios.get("http://localhost:4000/anims/" + id);
};

export const createAnimRequests = async (values) => {
  const form = new FormData();

  for (let key in values) {
    form.append(key, values[key]);
  }

  return await axios.post("http://localhost:4000/anims/", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateAnimRequests = async (id, values) => {
  return await axios.put("http://localhost:4000/anims/" + id, values);
};

export const deleteAnimRequests = async (id) => {
  return await axios.delete("http://localhost:4000/anims/" + id);
};
