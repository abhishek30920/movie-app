import React from 'react'

function Loader() {
  return (
    // loader ui
    <div className='flex justify-center items-center h-screen'>
      <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-white'>
        <div className='flex justify-center items-center'>
            <div className='w-10 h-10 bg-gray-900 dark:bg-white rounded-full'></div>
        </div>
      </div>
    </div>

  )
}



export default Loader
