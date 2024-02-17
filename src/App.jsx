// import Profile from "./features/profile/Profile";
// import Education from "./features/education/Education";
// import Skill from "./features/skill/Skill";
// import Social from "./features/social/Social";
// import Project from "./features/project/Project";
import View from "../src/view/View";
import Template1 from "./view/Template1";
import Template2 from "./view/Template2";
import Template3 from "./view/Template3";
import StudentResume from "./components/StudentResume";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./style.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import Layout from "./components/Layout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>

          <Route path="/StudentResume" element={<StudentResume />} />
          </Route>
          <Route path="/View" element={<View />} />
          <Route path="/Template2" element={<Template2 />} />
          <Route path="/Template1" element={<Template1 />} />
          <Route path="/Template3" element={<Template3 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
