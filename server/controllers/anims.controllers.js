import Anim from "../models/Anim.js";
import { uploadFile, deleteFile, renameFile } from "../libs/cloudinary.js";
import fs from "fs/promises";

export const getAnims = async (req, res) => {
  try {
    const anims = await Anim.find().sort({ title: 1 });

    res.send(anims);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAnim = async (req, res) => {
  try {
    const anim = await Anim.findById(req.params.id);

    if (!anim) return res.sendStatus(404);
    res.json(anim);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createAnim = async (req, res) => {
  try {
    const { title, description } = req.body;
    let media;

    if (req.files?.media) {
      const fileType = req.files.media.mimetype.split("/")[0];
      const result = await uploadFile(req.files.media.tempFilePath, title);
      await fs.unlink(req.files.media.tempFilePath);
      media = {
        url: result.secure_url,
        public_id: result.public_id,
        fileType: fileType,
      };
    }

    const newAnim = new Anim({ title, description, media });
    await newAnim.save();

    res.json(newAnim);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateAnim = async (req, res) => {
  try {
    const anim = await Anim.findById(req.params.id);
    if (!anim) return res.sendStatus(404);

    let oldName = anim.media.public_id;
    let newName = anim.media.public_id.split("/")[0] + "/" + req.body.title;

    const result = await renameFile(oldName, newName);

    let media = anim.media;

    media = {
      ...media,
      url: result.secure_url,
      public_id: result.public_id,
    };

    const updatedAnim = await Anim.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        media,
      },
      {
        new: true,
      }
    );

    if (!updatedAnim) return res.sendStatus(404);

    res.json(updatedAnim);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteAnim = async (req, res) => {
  try {
    const deletedAnim = await Anim.findByIdAndDelete(req.params.id);
    if (!deletedAnim) return res.sendStatus(404);

    if (deletedAnim.media.public_id) {
      await deleteFile(deletedAnim.media.public_id, deletedAnim.media.fileType);
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
