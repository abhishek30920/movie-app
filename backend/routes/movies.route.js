import express from "express";
const router = express.Router();
import { protect,AuthorizeAdmin } from "../middlewares/authMiddleware.js";

//contollers
import checkId from './../middlewares/checkId.js';
import {createMovie,getMovies,getMovieById, updateMovie, movieReview, deleteMovie ,deleteComment,getNewMovies,getTopMovies,getRandomMovies} from '../controllers/movies.controller.js';

//public routes
 router.get('/all-movies',getMovies);
router.get('/specific-movie/:id',checkId,getMovieById);
router.post('/create-movie',protect,AuthorizeAdmin,createMovie);
router.put('/update-movie/:id',protect,AuthorizeAdmin,updateMovie);
router.get('/new-movies',getNewMovies);
router.get('/top-rated-movies',getTopMovies);
router.get('/random-movies',getRandomMovies);
router.post('/:id/reviews',protect,checkId,movieReview);
router.delete("/delete-movie/:id",protect,AuthorizeAdmin,deleteMovie);
router.delete("/delete-comment",protect,AuthorizeAdmin,deleteComment);
export default router;

