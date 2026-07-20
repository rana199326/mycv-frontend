import { Routes, Route, Navigate } from "react-router-dom";
import { UserListPage } from "@pages/userListPage/UserListPage";
import { UserEditPage } from "@pages/userEditPage/UserEditPage";
import { LoginPage } from "@pages/login/LoginPage";
import Navbar from "@components/layout/NavBar";
import Footer from "@components/layout/Footer";
import UIKitPage from "@pages/home/HomePage";
import Welcome from "@pages/welcome/WelcomePage";
import Profile from "@pages/profile/ProfilePage";
import Identity from "@pages/identity/IdentityPage";
import EditIdentity from "@pages/identity/EditIdentity";
import Register from "@pages/register/Register";
import EmailVerification from "@pages/register/EmailVerification";
import EmailConfirmation from "@pages/register/EmailConfirmation";

import EditEducation from "@pages/education/EditEducation";
import  EducationListPage  from "@pages/education/EducationListPage";
import School from "@pages/education/SchoolPage";
import EditSchool from "@pages/education/EditSchool";

import { ExperienceListPage } from "@pages/experienceListPage/ExperienceListPage";
import { ExperienceViewPage } from "@pages/experienceViewPage/ExperienceViewPage";
import { ExperienceEditPage } from "@pages/experienceEditPage/ExperienceEditPage";
import { EmployerListPage } from "@pages/employerListPage/EmployerListPage";
import { EmployerEditPage } from "@pages/employerEditPage/EmployerEditpage";

import { SkillListPage } from "@pages/skillListPage/SkillListPage";
import { LanguageListPage } from "@pages/languageListPage/LanguageListPage";
import { OfferListPage } from "@pages/offerListPage/OfferListPage";
import Interview from "@pages/interview/InterviewPage";
import InterviewListPage from "@pages/interview/InterviewListPage";
import CvListPage from "@pages/CV/CvPage";
import  CvCreatePage from "@pages/CV/CvCreatePage";
import CvIdentityPage from "@pages/CV/CvIdentityPage";
import CvEducationPage from "@pages/CV/CvEducationPage";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/identity" element={<Identity />} />
          <Route path="/edit-identity" element={<EditIdentity />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/users/:id" element={<UserEditPage />} />
          <Route path="/home" element={<UIKitPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/register/confirmation"
            element={<EmailConfirmation />}
          />
          <Route path="/experiences" element={<ExperienceListPage />} />
          <Route path="/register/verification" element={<EmailVerification/>} />
          <Route path="/register/confirmation"element={<EmailConfirmation />}/>

          <Route path="/experience" element={<ExperienceListPage />} />
          <Route path="/experience/new" element={<ExperienceEditPage />} />
          <Route path="/experience/:id/edit" element={<ExperienceEditPage />} />
          <Route path="/experience/:id" element={<ExperienceViewPage />} />
          <Route path="/employer" element={<EmployerListPage />} />
          <Route path="/employer/new" element={<EmployerEditPage />} />
          <Route path="/employer/:id/edit" element={<EmployerEditPage />} />

          <Route path="/edit-education/:id" element={<EditEducation />} />
          <Route path="/school" element={<School />} />
          <Route path="/edit-school" element={<EditSchool />} />
          <Route path="/edit-school/:id" element={<EditSchool />} />
          <Route path="/skills" element={<SkillListPage />} />
          <Route path="/languages" element={<LanguageListPage />} />
          <Route path="/educations" element={<EducationListPage />} />
            <Route path="/edit-education" element={<EditEducation />} />
            <Route path="/school" element={<School />} />
            <Route path="/edit-school" element={<EditSchool />} />
            <Route path="/edit-school/:id" element={<EditSchool />} />
          <Route path="/skill" element={<SkillListPage />} />
          <Route path="/language" element={<LanguageListPage />} />
          <Route path="/offer" element={<OfferListPage />} />
          <Route path="/edit-interview" element={<Interview />} />
          <Route path="/interview" element={<InterviewListPage />} />
          <Route path="/cvs" element={<CvListPage />} />
          <Route path="/cv-new" element={<CvCreatePage />} />
          <Route path="/cv-identity" element={<CvIdentityPage />} />
          <Route path="/cv-education" element={<CvEducationPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
