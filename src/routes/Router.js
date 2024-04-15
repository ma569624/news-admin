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
import Page from '../pages/page/Page'
import AddHome from '../pages/block/AddHome'
import Home from '../pages/block/Home'
import EditHome from '../pages/block/EditHome'
import Rajiya from '../pages/rajiya/Rajiya'
import AddRajiya from '../pages/rajiya/AddRajiya'
import EditRajiya from '../pages/rajiya/EditRajiya'
import Poll from '../pages/votpoll/Poll'
import AddPoll from '../pages/votpoll/AddPoll'
import EditPoll from '../pages/votpoll/EditPoll'
import Adverd from '../pages/advertisement/Adverd'
import AddAdverd from '../pages/advertisement/AddAdverd.'
import EditAdverd from '../pages/advertisement/EditAdverd'
import RashiFal from '../pages/team/Team'
import AddRashiFal from '../pages/team/Addteam'
import EditRashiFal from '../pages/team/Editteam'
import EditAddress from '../pages/EditAddress'
import Rules from '../pages/rules/Rules'
import Founder from '../pages/Founder/Founder'
import AddFounder from '../pages/Founder/AddFounder'
import EditFounder from '../pages/Founder/EditFounder'
import EditTagline from '../pages/Tagline/EditTagline'


const Router = () => {
  return (
    <Routes>
      <Route path='/*' element={<Navigate to={'/'} />} />
      <Route element={<Producted />}>
        <Route path='/' element={<Page />}>
          <Route path='/blogs/:categories' element={<Blogs />} />
          
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/add-blogs/:position' element={<AddBlogs />} />
          <Route path='/edit-blogs/:id/:category' element={<EditBlogs />} />

    

          <Route path='/address' element={<EditAddress />} />
          <Route path='/rules' element={<Rules />} />

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
          
          <Route path='/tagline' element={<EditTagline />} />


          <Route path='/founder' element={<Founder />} />
          <Route path='/add-founder' element={<AddFounder />} />
          <Route path='/edit-founder/:id' element={<EditFounder />} />

          <Route path='/team' element={<RashiFal />} />
          <Route path='/add-team' element={<AddRashiFal />} />
          <Route path='/edit-team/:id' element={<EditRashiFal />} />


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
