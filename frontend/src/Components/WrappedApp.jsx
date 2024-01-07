import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import Contest from "./Contest";
import Register from "./Register";
import Login from "./Login";
import Wallet from "./Wallet";
import Transactions from "./Transactions";
import ProtectedRoutes from "./ProtectedRoutes";
import CreateContest from "./CreateContest";
import ProfilePage from "./ProfilePage";
import ChangeEmailForm from "./ChangeEmail";
import ChangePasswordForm from "./ChangePassword";
import ExpiredContest from "./ExpiredContest";
// import * as actions from "../state/index";
// import { loginState, loggedUser, userId } from "../state/actions/index";
// import axios from "axios";

function WrappedApp() {
  // Your useEffect logic here

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<Contest />} />
          <Route
            path='/about'
            element={<ProtectedRoutes Component={About} />}
          />
          <Route path='/contact' element={<Contact />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createcontest' element={<CreateContest />} />
          <Route
            path='/wallet'
            element={<ProtectedRoutes Component={Wallet} />}
          />
          <Route
            path='/transactions'
            element={<ProtectedRoutes Component={Transactions} />}
          />
          <Route
            path='/profile'
            element={<ProtectedRoutes Component={ProfilePage} />}
          />
          <Route
            path='/changeEmail'
            element={<ProtectedRoutes Component={ChangeEmailForm} />}
          />
          <Route
            path='/changePassword'
            element={<ProtectedRoutes Component={ChangePasswordForm} />}
          />
          <Route path='/expiredContest' element={<ExpiredContest />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default WrappedApp;
