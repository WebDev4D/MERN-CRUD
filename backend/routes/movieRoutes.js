import { Router } from "express";
import {
  createMovie,
  deleteMovie,
  fetchAllMovies,
  fetchMovie,
  updateMovie,
} from "../controllers/movieControllers/index.js";

const router = Router();

router.route("/").get(fetchAllMovies).post(createMovie);
router.route("/:id").get(fetchMovie).put(updateMovie).delete(deleteMovie);

export default router;
