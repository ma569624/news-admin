import React, { useContext } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import Producted from "./Protected";
import Sign from "../pages/createuser/CreateUser";
import TopLinks from "../pages/top-links/TopLinks";
import AddTopLinks from "../pages/top-links/AddTopLinks";
import EditTopLinks from "../pages/top-links/EditTopLinks";
import Blogs from "../pages/blogs/Blogs";
import AddBlogs from "../pages/blogs/AddBlogs";
import EditBlogs from "../pages/blogs/EditBlogs";
import Page from "../pages/page/Page";
import AddCategorie from "../pages/categories/AddCategorie";
import Categorie from "../pages/categories/Categorie";
import EditCategorie from "../pages/categories/EditCategorie";
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
import TajaSamachar from "../pages/Tagline/TajaSamachar";
import EditTajaSamachar from "../pages/Tagline/EditTajaSamachar";
import Youtube from "../pages/youtube/Youtube";
import LoginLogs from "../pages/login/LoginLogs";
import UserManager from "../pages/createuser/UserManager";
import EditUser from "../pages/createuser/EditUser";
import Subscribers from "../pages/subscribers/Subscribers";
import ForgetPassword from "../pages/createuser/ForgetPassword";

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
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route element={<Producted />}>
                <Route path="/blogs/:categories" element={<Blogs />} />
                <Route path="/" element={<Welcome />} />

                <Route path="/blogs" element={<Blogs />} />
                <Route path="/add-blogs" element={<AddBlogs />} />
                <Route
                  path="/edit-blogs/:id/:categorie"
                  element={<EditBlogs />}
                />

                <Route element={<AdminRoutes />}>
                  <Route path="/address" element={<EditAddress />} />
                  <Route path="/logs" element={<LoginLogs />} />
                  <Route path="/Subscribers" element={<Subscribers />} />
                  <Route path="/usermanager" element={<UserManager />} />
                  <Route path="/edituser/:id" element={<EditUser />} />
                  <Route path="/rules" element={<Rules />} />
                  <Route path="/add-categorie" element={<AddCategorie />} />
                  <Route path="/categorie" element={<Categorie />} />
                 
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

                <Route path="/edit-categorie/:id" element={<EditCategorie />} />
                <Route path="/youtube" element={<Youtube />} />


                <Route path="/advert" element={<Adverd />} />
                <Route path="/add-advert" element={<AddAdverd />} />
                <Route path="/edit-advert/:id" element={<EditAdverd />} />

                <Route path="/tagline" element={<EditTagline />} />
                <Route path="/tajasamachar" element={<TajaSamachar />} />
                <Route path="/edittajasamachar/:id" element={<EditTajaSamachar />} />
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
