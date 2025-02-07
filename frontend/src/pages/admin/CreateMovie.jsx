import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateMovieMutation, useUploadImageMutation } from '../../redux/api/movies';
import { useFetchGenresQuery } from '../../redux/api/genre';
import { toast } from 'react-toastify';
import { Loader2, Upload, Film, Home, List, Plus, Settings } from 'lucide-react';

const CreateMovie = () => {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const [movieData, setMovieData] = useState({
    name: "",
    year: new Date().getFullYear(),
    detail: "",
    cast: [],
    rating: 0,
    image: null,
    genre: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});

  const [createMovie, { isLoading: isCreatingMovie }] = useCreateMovieMutation();
  const [uploadImage, { isLoading: isUploadingImage }] = useUploadImageMutation();
  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

  useEffect(() => {
    if (genres?.length > 0) {
      setMovieData(prev => ({ ...prev, genre: genres[0]._id }));
    }
  }, [genres]);

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
    // Clear error for the field being changed
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
      setErrors(prev => ({ ...prev, image: null }));
    }
  };

  const handleCreateMovie = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!movieData.name) newErrors.name = 'Name is required';
    if (!movieData.year) newErrors.year = 'Year is required';
    if (!movieData.detail) newErrors.detail = 'Detail is required';
    if (!movieData.genre) newErrors.genre = 'Genre is required';
    if (!selectedImage) newErrors.image = 'Image is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      let uploadedImagePath = null;

      if (selectedImage) {
        const imageFormData = new FormData();
        imageFormData.append("image", selectedImage);
        const uploadResponse = await uploadImage(imageFormData).unwrap();
        uploadedImagePath = uploadResponse.image;
      }

      await createMovie({
        ...movieData,
        image: uploadedImagePath,
      }).unwrap();

      toast.success("Movie created successfully!");
      navigate("/admin/movies/list");
    } catch (error) {
      toast.error(error?.data?.message || "Error creating movie");
    }
  };

  if (isLoadingGenres) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-gray-900 text-gray-100">
      <div className="max-w-2xl mx-auto p-4 animate-fadeIn">
        <div className="flex items-center space-x-2 mb-8">
          <Film className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl md:text-3xl font-bold">Create Movie</h1>
        </div>

        <form onSubmit={handleCreateMovie} className="space-y-6">
          <div className="space-y-4">
            {/* Name Input */}
            <div className="animate-slideUp" style={{ animationDelay: '100ms' }}>
              <label className="block text-sm font-medium mb-1">
                Movie Name
                {errors.name && <span className="text-red-500 ml-1">*</span>}
              </label>
              <input
                type="text"
                name="name"
                className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${
                  errors.name ? 'border-red-500' : 'border-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
                value={movieData.name}
                onChange={handleChange}
                placeholder="Enter movie name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Year Input */}
            <div className="animate-slideUp" style={{ animationDelay: '200ms' }}>
              <label className="block text-sm font-medium mb-1">
                Release Year
                {errors.year && <span className="text-red-500 ml-1">*</span>}
              </label>
              <input
                type="number"
                name="year"
                className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${
                  errors.year ? 'border-red-500' : 'border-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
                value={movieData.year}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear() + 5}
              />
            </div>

            {/* Detail Input */}
            <div className="animate-slideUp" style={{ animationDelay: '300ms' }}>
              <label className="block text-sm font-medium mb-1">
                Movie Details
                {errors.detail && <span className="text-red-500 ml-1">*</span>}
              </label>
              <textarea
                name="detail"
                className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${
                  errors.detail ? 'border-red-500' : 'border-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 min-h-[100px]`}
                value={movieData.detail}
                onChange={handleChange}
                placeholder="Enter movie description"
              />
            </div>

            {/* Cast Input */}
            <div className="animate-slideUp" style={{ animationDelay: '400ms' }}>
              <label className="block text-sm font-medium mb-1">
                Cast (comma-separated)
              </label>
              <input
                type="text"
                name="cast"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                value={movieData.cast.join(", ")}
                onChange={handleChange}
                placeholder="Enter cast names separated by commas"
              />
            </div>

            {/* Genre Select */}
            <div className="animate-slideUp" style={{ animationDelay: '500ms' }}>
              <label className="block text-sm font-medium mb-1">
                Genre
                {errors.genre && <span className="text-red-500 ml-1">*</span>}
              </label>
              <select
                name="genre"
                className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${
                  errors.genre ? 'border-red-500' : 'border-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
                value={movieData.genre}
                onChange={handleChange}
              >
                {genres?.map((genre) => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div className="animate-slideUp" style={{ animationDelay: '600ms' }}>
              <label className="block text-sm font-medium mb-1">
                Movie Poster
                {errors.image && <span className="text-red-500 ml-1">*</span>}
              </label>
              <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
                errors.image ? 'border-red-500' : 'border-gray-700'
              } border-dashed rounded-lg hover:border-blue-500 transition duration-200 group cursor-pointer`}>
                <div className="space-y-1 text-center">
                  {previewUrl ? (
                    <div className="relative group">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="mx-auto h-32 w-auto rounded transition-transform duration-200 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200">
                        <p className="text-sm text-white">Click to change</p>
                      </div>
                    </div>
                  ) : (
                    <Upload className="mx-auto h-12 w-12 text-gray-400 transition-transform duration-200 group-hover:scale-110" />
                  )}
                  <div className="flex text-sm text-gray-400">
                    <label className="relative cursor-pointer rounded-md font-medium text-blue-500 hover:text-blue-400 focus-within:outline-none">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 animate-slideUp" style={{ animationDelay: '700ms' }}>
            <button
              type="button"
              onClick={() => navigate('/admin/movies-list')}
              className="px-4 py-2 rounded-lg text-gray-300 hover:text-white transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreatingMovie || isUploadingImage}
              className="px-6 py-2 bg-blue-500 rounded-lg font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isCreatingMovie || isUploadingImage ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <span>Create Movie</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Bottom Navigation */}
   

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default CreateMovie;