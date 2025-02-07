import genreModel from "../models/genre.model.js";
import Movie from "../models/movies.js";

//admin
export const createMovie = async (req,res)=>{
  try{
    if( !req.body.name || !req.body.year || !req.body.genre || !req.body.detail || !req.body.cast || !req.body.image){
      return res.status(400).json({message:"All fields are required"});
    }

    const genres = await genreModel.findById(req.body.genre);
    if(!genres){
      return res.status(400).json({message:"Genre not found"});
    }

    const movies = await Movie.findOne({name:req.body.name});
    if(movies){
      return res.status(400).json({message:"Movie already exists"});
    }



    const {title,name,year,genre,detail,cast,image} = req.body;
    const movie = new Movie({title,name,year,genre,detail,cast,image});
    await movie.save();
    res.status(201).json({message:"Movie created successfully",movie});
  }catch(error){
    console.log(error);
    res.status(500).json({message:"Internal server error"});
  }
}

export const getMovies = async (req,res)=>{
 try{
  const movies = await Movie.find();
  res.status(200).json({movies});
 }catch(error){
  console.log(error);
  res.status(500).json({message:error.message});
 }
}

export const getMovieById = async (req,res)=>{
  try{
    const movie = await Movie.findById(req.params.id);
    if(!movie){
      return res.status(404).json({message:"Movie not found"});
    }
    res.status(200).json({movie});
  }catch(error){
    console.log(error);
    res.status(500).json({message:error.message});
  }
}

export const updateMovie = async (req,res)=>{
  try{
    const {id} = req.params;
    const {name,year,genre,detail,cast,image} = req.body;
    const movie = await Movie.findByIdAndUpdate(id,{name,year,genre,detail,cast,image},{new:true});
    if(!movie){
      return res.status(404).json({message:"Movie not found"});
    }
    res.status(200).json({message:"Movie updated successfully",movie});
  }catch(error){
    console.log(error);
    res.status(500).json({message:error.message});
  }
}

export const movieReview = async (req,res)=>{
  try{

    const {rating,comment} = req.body;
    const movie = await Movie.findById(req.params.id);
    if(movie){
      const alreadyReviewed = movie.reviews.find((review)=>review.user.toString() === req.user._id.toString());
      if(alreadyReviewed){
        return res.status(400).json({message:"You have already reviewed this movie"});
      }
      console.log("---------------------------------------------")
      console.log(req.user);
      const review = {
        name:req.user.userName,
        rating,
        comment,
        user:req.user._id
      }
      movie.reviews.push(review);
      movie.numReviews = movie.reviews.length;
      movie.rating = movie.reviews.reduce((acc,review)=>acc+review.rating,0)/movie.reviews.length;
      await movie.save();
      res.status(200).json({message:"Review added successfully",movie});
    }
    else{
      return res.status(404).json({message:"Movie not found"});
    }
   
  }
  catch(error){
    console.log(error);
    res.status(500).json({message:error.message});
  }
}
  


export const deleteMovie = async (req,res)=>{
  try{
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if(!movie){
      return res.status(404).json({message:"Movie not found"});
    }
    res.status(200).json({message:"Movie deleted successfully",movie});
  }catch(error){
    console.log(error);
    res.status(500).json({message:error.message});
  }
}

export const deleteComment = async (req,res)=>{
  try{
     const {movieId,reviewId} = req.body;
     console.log(movieId,reviewId);
     const movie = await Movie.findById(movieId);
     if(!movie){
      return res.status(404).json({message:"Movie not found"});
     }
    const reviewIndex = movie.reviews.findIndex((review)=>review._id.toString() === reviewId.toString());// find the index of the comment to be deleted
    if(reviewIndex === -1){
      return res.status(404).json({message:"Comment not found"});   // 
    }
    movie.reviews.splice(reviewIndex,1); // delete the comment // how it is working .. ?
    //splice is used to remove the element from the array at the specified index
    movie.numReviews = movie.reviews.length;// update the number of reviews
    movie.rating = movie.reviews.reduce((acc,review)=>acc+review.rating,0)/movie.reviews.length;// update the rating
    await movie.save();
    res.status(200).json({message:"Comment deleted successfully",movie});
  }
  catch(error){
    console.log(error);
    res.status(500).json({message:error.message});
  }
}

export const getNewMovies = async (req,res)=>{
  try{
    const movies = await Movie.find().sort({created_at:-1}).limit(10);
    res.status(200).json({movies});
  }catch(error){
    console.log(error);
    res.status(500).json({message:error.message});
  }
}

export const getTopMovies = async (req,res)=>{
  try{
    const movies = await Movie.find().sort({numReviews:-1}).limit(10);
    res.status(200).json({movies});
  }catch(error){
    console.log(error);
    res.status(500).json({message:error.message});
  }
}

export const getRandomMovies = async (req,res)=>{
  try{
   const movies = await Movie.aggregate([
    {$sample:{size:10}}  // $sample is used to get random movies  // size is the number of movies to be returned
   ]);
   res.status(200).json({movies});
  }
  catch(error){
    console.log(error);
    res.status(500).json({message:error.message});
  }

}
