import cors from "cors";
import express from "express";
import multer from "multer";

import {
  createANewPost,
  getAllPosts,
  sendImage,
  updatePost,
} from "../controllers/postsController.js";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}-${Date.now()}`);
  },
});

const upload = multer({ dest: "./uploads", storage });

export const routes = (app) => {
  app.use(express.json());
  app.use(cors(corsOptions));

  app.get("/posts", getAllPosts);
  app.post("/posts", createANewPost);
  app.post("/upload", upload.single("file"), sendImage);
  app.put("/upload/:id", updatePost);
};
