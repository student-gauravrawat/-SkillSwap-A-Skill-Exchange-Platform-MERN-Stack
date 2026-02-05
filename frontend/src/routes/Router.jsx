import { createBrowserRouter } from "react-router-dom";
import {Home, About, Contact, LoginHere, Signup, MainLayout} from "../all_components/index"
import PublicRoute from "./PublicRoute"
import ProtectedRoute from "./ProtectedRoute"
import Profile from "../all_components/pages/Profile"
import ChangePassword from "../all_components/pages/ChangePassword";
import EditPage from "../all_components/pages/EditPage";
import EditPhoto from "../all_components/pages/EditPhoto";
import SkillEdit from "../all_components/pages/SkillEdit";
import SkillEditLearn from "../all_components/pages/SkillEditLearn";
import UserProfile from "../all_components/pages/UserProfile";
import HomePage from "../all_components/chat_components/HomePage"
import EmailVerify from "../all_components/pages/EmailVerify";

const router = createBrowserRouter([
   
   {
    path: "/login",
    element: (
        <PublicRoute>
            <LoginHere />
        </PublicRoute>

      ),
   },
   {
     path: "/signup",
     element: (
      <PublicRoute>
         <Signup/>
      </PublicRoute>
     )
   },
   {
     path: "/emailverify",
     element: (
      <PublicRoute>
         <EmailVerify/>
      </PublicRoute>
     )
   },
   {
     path: "/",
     element: (
        <ProtectedRoute>
           <MainLayout/>
        </ProtectedRoute>
     ),
     
     children: [
        {index: true, element: <Home/>},
        {path:"about", element:<About/>},
        {path: "contact", element: <Contact/>},
        {path:"/profile", element: <Profile/>},
        {path:"/edit", element: <EditPage/>},
        {path:"/changepass", element: <ChangePassword/>},
        {path:"/editimg", element: <EditPhoto/>},
        {path:"/skilledit", element: <SkillEdit/>},
        {path:"/skilleditlearn", element: <SkillEditLearn/>},
        {path:"/userprofile/:userId", element: <UserProfile/>},
        {path:"/chathomepage", element: <HomePage/>},
     ]
   },
  
])

export default router