import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './redux/store.js'
import { Provider } from 'react-redux'
import {Route,RouterProvider,createRoutesFromElements} from 'react-router';
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import GenreList from './pages/admin/GenreList.jsx'
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx'
import PrivateRoute from './pages/Auth/PrivateRoute.jsx'
import Profile from './pages/User/Profile.jsx'
import AdminRoutes from './pages/admin/AdminRoutes.jsx'
import CreateMovie from './pages/admin/CreateMovie.jsx'
import AdminMoviesList from './pages/admin/AdminMoviesList.jsx'
import UpdateMovie from './pages/admin/UpdateMovie';
import AllMovies from './pages/movies/AllMovies.jsx'
import MovieDetails from './pages/movies/MovieDetails.jsx'
import AllComments from './pages/admin/AllComments.jsx'
import AdminDashBoard from './pages/admin/Dashboard/AdminDashBoard.jsx'
//Auth


//restricred



const router= createBrowserRouter(
    createRoutesFromElements(
       
        <Route path="/" element={<App/>}>
         <Route path='/movies' element={<AllMovies/>}/>
        <Route index={true} path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/movies/:id' element={<MovieDetails/>}/>
        <Route path="" element={<PrivateRoute/>}>
    <Route path='/profile' element={<Profile/>}/>
  
  
        </Route>
        <Route path='' element={<AdminRoutes/>}>
        <Route path='/admin/movies/genres' element={<GenreList/>}/>
        <Route path='/admin/movies/create' element={<CreateMovie/>}/>
        <Route path='/admin/movies-list' element={<AdminMoviesList/>}/>
        <Route path='/admin/movies/update/:id' element={<UpdateMovie/>}/>
        <Route path='/admin/movies/comments' element={<AllComments/>}/>
        <Route path='/admin/dashboard' element={<AdminDashBoard/>}/>
        </Route>
        </Route>  
    )
)


createRoot(document.getElementById('root')).render(
<Provider store={store}>
<RouterProvider router={router}/>
</Provider>

)
