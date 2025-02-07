import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema;


const reviewSchema= new mongoose.Schema({
  name:{type:String,required:true},
  rating:{type:Number,required:true},
  comment:{type:String,required:true},
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }
},{timestamps:true})

const movieSchema = new mongoose.Schema({
 
   name:{type:String,required:true},
   year:{type:Number,required:true},
   genre:{type:ObjectId,ref:"Genre",required:true},
   detail:{type:String,required:true},
   reviews:[reviewSchema],
   cast:[{type:String}],
   numReviews:{type:Number,default:0},
   created_at:{type:Date,default:Date.now},
   image:{type:String,required:true},


},{timestamps:true})

const Movie = mongoose.model("Movie",movieSchema);
export default Movie;
