import React from 'react'
import Header from './movies/Header'
import MoviesContainerPage from './movies/MoviesContainerPage'

function Home() {
  return (
    <div>
    <Header/>
    <section >
       <MoviesContainerPage/>
    </section>
    </div>
  )
}


export default Home
