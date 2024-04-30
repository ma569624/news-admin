import React, { useContext } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import Producted from "./Protected";
import Sign from "../pages/createuser/Sign";
import TopLinks from "../pages/top-links/TopLinks";
import AddTopLinks from "../pages/top-links/AddTopLinks";
import EditTopLinks from "../pages/top-links/EditTopLinks";
import Blogs from "../pages/blogs/Blogs";
import AddBlogs from "../pages/blogs/AddBlogs";
import EditBlogs from "../pages/blogs/EditBlogs";
import Page from "../pages/page/Page";
import AddHome from "../pages/categories/AddHome";
import Home from "../pages/categories/Home";
import EditHome from "../pages/categories/EditHome";
import Poll from "../pages/votpoll/Poll";
import AddPoll from "../pages/votpoll/AddPoll";
import EditPoll from "../pages/votpoll/EditPoll";
import Adverd from "../pages/advertisement/Adverd";
import AddAdverd from "../pages/advertisement/AddAdverd.";
import EditAdverd from "../pages/advertisement/EditAdverd";
import RashiFal from "../pages/team/Team";
import AddRashiFal from "../pages/team/Addteam";
import EditRashiFal from "../pages/team/Editteam";
import EditAddress from "../pages/EditAddress";
import Rules from "../pages/rules/Rules";
import Founder from "../pages/Founder/Founder";
import AddFounder from "../pages/Founder/AddFounder";
import EditFounder from "../pages/Founder/EditFounder";
import EditTagline from "../pages/Tagline/EditTagline";
import Nav from "../component/nav/Nav";
import { ApiContext } from "../Context/ApiContext";
import { Welcome } from "../pages/Welcome";
import Working from "../pages/Working";
import AdminRoutes from "./AdminRoutes";

const Router = () => {
  const { isAuthenticated } = useContext(ApiContext);
  return (
    <HashRouter>
      {isAuthenticated && <Nav />}
      <main>
        <div className="wrapper">
          <div className="content-wrapper">
            <Routes>
              <Route path="/*" element={<></>} />
              <Route element={<Producted />}>
                <Route path="/blogs/:categories" element={<Blogs />} />
                <Route path="/" element={<Welcome />} />

                <Route path="/blogs" element={<Blogs />} />
                <Route path="/add-blogs" element={<AddBlogs />} />
                <Route
                  path="/edit-blogs/:id"
                  element={<EditBlogs />}
                />

                <Route element={<AdminRoutes />}>
                  <Route path="/address" element={<EditAddress />} />
                  <Route path="/rules" element={<Rules />} />
                  <Route path="/homeview" element={<AddHome />} />
                  <Route path="/home" element={<Home />} />
                 
                  <Route path="/poll" element={<Poll />} />
                  <Route path="/add-poll" element={<AddPoll />} />
                  <Route path="/edit-poll/:id" element={<EditPoll />} />
                  <Route path="/founder" element={<Founder />} />
                  <Route path="/add-founder" element={<AddFounder />} />
                  <Route path="/edit-founder" element={<EditFounder />} />

                  <Route path="/team" element={<RashiFal />} />
                  <Route path="/add-team" element={<AddRashiFal />} />
                  <Route path="/edit-team/:id" element={<EditRashiFal />} />
                  <Route path="/top-links" element={<TopLinks />} />
                  <Route path="/add-top-links" element={<AddTopLinks />} />
                  <Route
                    path="/edit-top-links/:id"
                    element={<EditTopLinks />}
                  />

                  <Route path="/create-user" element={<Sign />} />
                </Route>

                <Route path="/home/:id" element={<EditHome />} />


                <Route path="/advert" element={<Adverd />} />
                <Route path="/add-advert" element={<AddAdverd />} />
                <Route path="/edit-advert/:id" element={<EditAdverd />} />

                <Route path="/tagline" element={<EditTagline />} />
              </Route>
              {!isAuthenticated && <Route path="/login" element={<Login />} />}
            </Routes>
          </div>
        </div>
      </main>
    </HashRouter>
  );
};

export default Router;
