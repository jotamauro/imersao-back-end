import fs from "fs";
import {
  insertANewPost,
  listAllPosts,
  updateAPost,
} from "../models/postsModel.js";

import { gerarDescricaoComGemini } from "../services/geminiService.js";

export const getAllPosts = async (req, res) => {
  const posts = await listAllPosts();
  res.status(200).json(posts);
};

export const createANewPost = async (req, res) => {
  const newPost = req.body;

  try {
    const createdPost = await insertANewPost(newPost);
    res.status(200).json(createdPost);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Falha ao inserir" });
  }
};

export const sendImage = async (req, res) => {
  const newPost = {
    description: "",
    imageURL: req.file.originalname,
    alt: "",
  };

  try {
    const createdPost = await insertANewPost(newPost);
    const updatedImage = `uploads/${createdPost.insertedId}.png`;
    fs.renameSync(`./uploads/${req.file.filename}`, updatedImage);
    res.status(200).json(createdPost);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Falha ao inserir" });
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const imageURL = `http://localhost:3000/uploads/${id}.png`;

  try {
    const imageBuffer = fs.readFileSync(`./uploads/${id}.png`);
    const altText = await gerarDescricaoComGemini(imageBuffer);

    const updatedPost = {
      description: altText,
      imageURL: imageURL,
      alt: altText,
    };

    const postUpdated = await updateAPost(id, updatedPost);
    res.status(200).json(postUpdated);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Falha ao atualizar" });
  }
};
