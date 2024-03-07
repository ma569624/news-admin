import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/login/Login'
import Producted from './Protected'
import Sign from '../pages/signup/Sign'
import TopLinks from '../pages/top-links/TopLinks'
import AddTopLinks from '../pages/top-links/AddTopLinks'
import EditTopLinks from '../pages/top-links/EditTopLinks'
import Blogs from '../pages/blogs/Blogs'
import AddBlogs from '../pages/blogs/AddBlogs'
import EditBlogs from '../pages/blogs/EditBlogs'
import Categories from '../pages/categories/Categories'
import AddCategories from '../pages/categories/AddCategories'
import EditCategories from '../pages/categories/EditCategories'
import ViewHome from '../pages/home/ViewHome'
import Colors from '../pages/colors/Colors'
import Page from '../pages/page/Page'
import Media from '../pages/media/Media'
import AddHome from '../pages/home/AddHome'
import Home from '../pages/home/Home'
import EditHome from '../pages/home/EditHome'
import TopKhabre from '../pages/top-khabare/TopKhabre'
import AddTopKhabre from '../pages/top-khabare/AddTopKhabre'
import EditTopKhabre from '../pages/top-khabare/EditTopKhabre'
import AddBadiKhabare from '../pages/badi-khabre/AddBadiKhabare'
import BadiKhabare from '../pages/badi-khabre/BadiKhabare'
import EditBadiKhabare from '../pages/badi-khabre/EditBadiKhabare'
import AddJaraidhar from '../pages/jaraidhar/AddJaraIdhar'
import EditJaraIdhar from '../pages/jaraidhar/EditJaraIdhar'
import Jaraidhar from '../pages/jaraidhar/JaraIdhar'
import Rajiya from '../pages/rajiya/Rajiya'
import AddRajiya from '../pages/rajiya/AddRajiya'
import EditRajiya from '../pages/rajiya/EditRajiya'
import Poll from '../pages/votpoll/Poll'
import AddPoll from '../pages/votpoll/AddPoll'
import EditPoll from '../pages/votpoll/EditPoll'
import Adverd from '../pages/advertisement/Adverd'
import AddAdverd from '../pages/advertisement/AddAdverd.'
import EditAdverd from '../pages/advertisement/EditAdverd'
import RashiFal from '../pages/rashifal/RashiFal'
import AddRashiFal from '../pages/rashifal/AddRashiFal.'
import EditRashiFal from '../pages/rashifal/EditRashifal'

const Router = () => {
  return (
    <Routes>
      <Route path='/*' element={<Navigate to={'/blogs'} />} />
      <Route element={<Producted />}>
        <Route path='/' element={<Page />}>
          <Route path='/blogs/:categories' element={<Blogs />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/add-blogs' element={<AddBlogs />} />
          <Route path='/edit-blogs/:id' element={<EditBlogs />} />

          <Route path='/top-khabre/:categories' element={<TopKhabre />} />
          <Route path='/add-top-khabre' element={<AddTopKhabre />} />
          <Route path='/edit-top-khabre/:id' element={<EditTopKhabre />} />
    
          <Route path='/categories' element={<Categories />} />
          <Route path='/add-categories' element={<AddCategories />} />
          <Route path='/edit-categories/:id' element={<EditCategories />} />

          <Route path='/colors' element={<Colors />} />
          <Route path='/media' element={<Media />} />

          <Route path='/homeview' element={<AddHome />} />
          <Route path='/home' element={<Home />} />
          <Route path='/home/:id' element={<EditHome />} />

          <Route path='/addrajiya' element={<AddRajiya />} />
          <Route path='/rajiya' element={<Rajiya />} />
          <Route path='/rajiya/:id' element={<EditRajiya />} />

          <Route path='/poll' element={<Poll />} />
          <Route path='/add-poll' element={<AddPoll />} />
          <Route path='/edit-poll/:id' element={<EditPoll />} />

          <Route path='/advert' element={<Adverd />} />
          <Route path='/add-advert' element={<AddAdverd />} />
          <Route path='/edit-advert/:id' element={<EditAdverd />} />

          <Route path='/rashifal' element={<RashiFal />} />
          <Route path='/add-rashifal' element={<AddRashiFal />} />
          <Route path='/edit-rashifal/:id' element={<EditRashiFal />} />

          <Route path='/addmainnew' element={<AddJaraidhar />} />
          <Route path='/editmainnew/:id' element={<EditJaraIdhar />} />
          <Route path='/mainnew' element={<Jaraidhar />} />

          <Route path='/add-badi-khabar' element={<AddBadiKhabare />} />
          <Route path='/badi-khabar' element={<BadiKhabare />} />
          <Route path='/edit-badi-khabar/:id' element={<EditBadiKhabare />} />

          <Route path='/top-links' element={<TopLinks />} />
          <Route path='/add-top-links' element={<AddTopLinks />} />
          <Route path='/edit-top-links/:id' element={<EditTopLinks />} />
        </Route>

      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Sign />} />
    </Routes>
  )
}

export default Router
