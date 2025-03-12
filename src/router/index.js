import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { PrivateRoute } from "../utils/routing/PrivateRoute";

import Layout from "../components/Layout";
import NotFound from "../pages/NotFound";

// AUTH PAGES
import Auth from "../pages/Auth";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

// PAGES FOR LOGGED USERS
import Home from "../pages/Home";
import UploadImage from "../pages/UploadImage";
import MyImages from "../pages/MyImages";
import ImageDetails from "../pages/ImageDetails";
import MyPatients from "../pages/MyPatients";
import PatientImages from "../pages/PatientImages";
import MyPatientsImages from "../pages/MyPatientsImages";
import FeedbackHistory from "../pages/FeedbackHistory";
import UserProfile from "../pages/UserProfile";

// ROLES
const admin = "admin";
const clinician = "clinician";
const patient = "user";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* AUTH PAGES */}
                <Route path="/" element={<Auth />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                {/* PAGES FOR LOGGED USERS */}
                <Route path="app" element={<Layout />}>
                    <Route path="" element={<PrivateRoute element={<Home />} roles={[admin, clinician, patient]} />} />
                    <Route
                        path="image/:id"
                        element={<PrivateRoute element={<ImageDetails />} roles={[clinician, patient]} />}
                    />
                    {/* PATIENTS */}
                    <Route path="user">
                        <Route path="upload" element={<PrivateRoute element={<UploadImage />} roles={[patient]} />} />
                        <Route path="myimages" element={<PrivateRoute element={<MyImages />} roles={[patient]} />} />
                    </Route>
                    {/* CLINICIANS */}
                    <Route path="clinician">
                        <Route path="mypatients" element={<PrivateRoute element={<MyPatients />} roles={[clinician]} />} />
                        <Route
                            path="patient/:id"
                            element={<PrivateRoute element={<PatientImages />} roles={[clinician]} />}
                        />
                        <Route path="images" element={<PrivateRoute element={<MyPatientsImages />} roles={[clinician]} />} />
                        <Route
                            path="feedbackhistory"
                            element={<PrivateRoute element={<FeedbackHistory />} roles={[clinician]} />}
                        />
                    </Route>
                    <Route
                        path="profile"
                        element={<PrivateRoute element={<UserProfile />} roles={[clinician, patient]} />}
                    />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
