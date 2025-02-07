import React from "react";
import { useState } from "react";

import { toast } from "react-toastify";
import { useFetchGenresQuery,useCreateGenreMutation,useUpdateGenreMutation ,useDeleteGenreMutation} from "../../redux/api/genre";
import GenreForm from "../../component/GenreForm";
import Modal from "../../component/Modal";

function GenreList() {
  const {data:genres, isLoading, refetch}=useFetchGenresQuery()
  const [name,setName]=useState('')
  const [selectedGenre,setSelectedGenre]=useState(null)
  const [updatingName,setUpdatingName]=useState('')
  const [modalVisible,setModalVisible]=useState(false)

  const [createGenre]=useCreateGenreMutation()
  const [updateGenre]=useUpdateGenreMutation()
  const [deleteGenre]=useDeleteGenreMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createGenre({ name }).unwrap();
      setName('');
      toast.success('Genre created successfully');
      setModalVisible(false);
      refetch(); // This should work now with await
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateGenre({ id: selectedGenre, name: updatingName }).unwrap();
      setModalVisible(false);
      setUpdatingName('');
      setSelectedGenre(null);
      refetch();
      toast.success('Genre updated successfully');
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGenre(id).unwrap();
      refetch();
      toast.success('Genre deleted successfully');
      setModalVisible(false);
      setSelectedGenre(null);
      setUpdatingName('');
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Manage Genres</h1>
        
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-6 mb-8 shadow-lg border border-gray-600">
          <GenreForm value={name} setValue={setName} onSubmit={handleSubmit} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <div className="col-span-full flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : genres?.length === 0 ? (
            <div className="col-span-full text-center text-white text-lg">
              No genres found
            </div>
          ) : (
            genres?.map((genre) => (
              <div
                key={genre._id}
                className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-600"
              >
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-semibold text-white">
                    {genre.name}
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        setModalVisible(true);
                        setSelectedGenre(genre._id);
                        setUpdatingName(genre.name);
                      }}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg font-medium text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(genre._id)}
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg font-medium text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-xl border border-gray-600">
          <h2 className="text-2xl font-bold text-white mb-4">Update Genre</h2>
          <GenreForm
            value={updatingName}
            setValue={setUpdatingName}
            onSubmit={handleUpdate}
            buttonText="Update"
            handleDelete={() => handleDelete(selectedGenre)}
          />
        </div>
      </Modal>
    </div>
  );
}

export default GenreList;
