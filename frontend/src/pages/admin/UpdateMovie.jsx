import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetSpecificMovieQuery,
  useUpdateMovieMutation,
  useUploadImageMutation,
  useDeleteMovieMutation,
} from '../../redux/api/movies';
import { useFetchGenresQuery } from '../../redux/api/genre';
import { toast } from 'react-toastify';
import { 
  Loader2, 
  Upload, 
  Film, 
  AlertCircle, 
  ArrowLeft,
  Trash2 
} from 'lucide-react';

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const [movieData, setMovieData] = useState({
    name: "",
    year: new Date().getFullYear(),
    genre: "",
    detail: "",
    cast: [],
    image: null,
    numReviews: 0,
    reviews: []
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { data: initialMovieData, isLoading: isLoadingMovie } = useGetSpecificMovieQuery(id);
  const { data: genres } = useFetchGenresQuery();
  const [updateMovie, { isLoading: isUpdatingMovie }] = useUpdateMovieMutation();
  const [uploadImage, { isLoading: isUploadingImage }] = useUploadImageMutation();
  const [deleteMovie, { isLoading: isDeleting }] = useDeleteMovieMutation();

  useEffect(() => {
    if (initialMovieData?.movie) {
      setMovieData(initialMovieData.movie);
      if (initialMovieData.movie.image) {
        setPreviewUrl(initialMovieData.movie.image);
      }
    }
  }, [initialMovieData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cast") {
      setMovieData(prev => ({
        ...prev,
        cast: value.split(",").map(item => item.trim())
      }));
    } else {
      setMovieData(prev => ({ ...prev, [name]: value }));
    }
    setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpdateMovie = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!movieData.name) newErrors.name = 'Name is required';
    if (!movieData.year) newErrors.year = 'Year is required';
    if (!movieData.detail) newErrors.detail = 'Detail is required';
    if (!movieData.genre) newErrors.genre = 'Genre is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      let uploadedImagePath = movieData.image;

      if (selectedImage) {
        const imageFormData = new FormData();
        imageFormData.append("image", selectedImage);
        const uploadResponse = await uploadImage(imageFormData).unwrap();
        uploadedImagePath = uploadResponse.image;
      }

      await updateMovie({
        id,
        updatedMovie: {
          ...movieData,
          image: uploadedImagePath,
        }
      }).unwrap();

      toast.success("Movie updated successfully!");
      navigate("/admin/movies");
    } catch (error) {
      toast.error(error?.data?.message || "Error updating movie");
    }
  };

  const handleDeleteMovie = async () => {
    try {
      await deleteMovie(id).unwrap();
      toast.success("Movie deleted successfully");
      navigate("/admin/movies");
    } catch (error) {
      toast.error(error?.data?.message || "Error deleting movie");
    }
  };

  if (isLoadingMovie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/admin/movies/list')}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-2">
              <Film className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold">Update Movie</h1>
            </div>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="p-2 text-red-400 hover:bg-gray-800 rounded-full transition-colors"
          >
            <Trash2 className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdateMovie} className="space-y-6 bg-gray-800 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Movie Name
                  {errors.name && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={movieData.name}
                  onChange={handleChange}
                  placeholder="Enter movie name"
                />
              </div>

              {/* Year Input */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Release Year
                  {errors.year && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                  type="number"
                  name="year"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={movieData.year}
                  onChange={handleChange}
                  min="1900"
                  max={new Date().getFullYear() + 5}
                />
              </div>

              {/* Genre Select */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Genre
                  {errors.genre && <span className="text-red-500 ml-1">*</span>}
                </label>
                <select
                  name="genre"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={movieData.genre}
                  onChange={handleChange}
                >
                  <option value="">Select Genre</option>
                  {genres?.map((genre) => (
                    <option key={genre._id} value={genre._id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cast Input */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Cast (comma-separated)
                </label>
                <input
                  type="text"
                  name="cast"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={movieData.cast.join(", ")}
                  onChange={handleChange}
                  placeholder="Enter cast names separated by commas"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Detail Input */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Movie Details
                  {errors.detail && <span className="text-red-500 ml-1">*</span>}
                </label>
                <textarea
                  name="detail"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-h-[150px]"
                  value={movieData.detail}
                  onChange={handleChange}
                  placeholder="Enter movie description"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Movie Poster
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg hover:border-blue-500 transition-colors">
                  <div className="space-y-2 text-center">
                    {previewUrl ? (
                      <div className="relative group">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="mx-auto h-32 w-auto rounded"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Upload className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    ) : (
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-400">
                      <label className="relative cursor-pointer rounded-md font-medium text-blue-500 hover:text-blue-400">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-400">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={() => navigate('/admin/movies')}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdatingMovie || isUploadingImage}
              className="px-6 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isUpdatingMovie || isUploadingImage ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <span>Update Movie</span>
              )}
            </button>
          </div>
        </form>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full">
              <div className="flex items-center space-x-2 mb-4">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <h2 className="text-lg font-semibold">Delete Movie</h2>
              </div>
              <p className="mb-6">Are you sure you want to delete this movie? This action cannot be undone.</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteMovie}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 flex items-center space-x-2"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <span>Delete</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateMovie;