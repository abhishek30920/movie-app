import React from 'react'

const GenreForm = ({value, setValue, onSubmit, buttonText="Submit", handleDelete=null}) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-4">Add Genre</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input 
          type="text" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-800" 
          placeholder="Genre Name"
        />
        <div className="flex gap-3">
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            {buttonText}
          </button>
          {handleDelete && (
            <button 
              onClick={handleDelete} 
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default GenreForm
