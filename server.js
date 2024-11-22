import express from "express";
import { routes } from "./src/routes/postsRouter.js";

const app = express();
app.use(express.static("uploads"));
routes(app);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
