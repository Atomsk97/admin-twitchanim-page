import { v2 as cloudinary } from "cloudinary";
import { CLOUD_NAME, API_KEY, API_SECRET } from "../config.js";

// Configuration
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

// Upload
export const uploadFile = async (filePath, name) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "anims",
    public_id: name,
    resource_type: "auto",
    invalidate: true,
  });
};

//Rename
export const renameFile = async (oldName, newName) => {
  return await cloudinary.uploader.rename(oldName, newName, {
    invalidate: true,
  });
};

// Delete
export const deleteFile = async (id, fileType) => {
  return await cloudinary.uploader.destroy(id, {
    resource_type: fileType,
    invalidate: true,
  });
};
