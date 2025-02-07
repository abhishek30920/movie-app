import express from 'express'
const router=express.Router()


import { AuthorizeAdmin,protect } from '../middlewares/authMiddleware.js'
import { createGenre, listGenres, readGenre, removeGenre, updateGenre } from '../controllers/Genre.controller.js';


router.route("/").post(protect,AuthorizeAdmin,createGenre)
router.route("/:id").put(protect, AuthorizeAdmin, updateGenre);
router.route("/:id").delete(protect, AuthorizeAdmin, removeGenre);
router.route("/genres").get(listGenres);
router.route("/:id").get(readGenre);


export default router;