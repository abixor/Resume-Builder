import React, { useContext } from "react";
import { AppContext } from "../AppContext";

const NavbarPage = () => {

  const {setEducation, setProfile, setProject, setSkill, setSocial, setView} = useContext(AppContext)

  const handleProfile = () => {
    setEducation(false);
      setProfile(true);
      setProject(false);
      setSkill(false);
      setSocial(false);
      setView(false);
  }
  const handleEducation = () => {
    setEducation(true);
    setProfile(false);
    setProject(false);
    setSkill(false);
    setSocial(false);
    setView(false);
  }
  const handleSkill = () => {
    setEducation(false);
    setProfile(false);
    setProject(false);
    setSkill(true);
    setSocial(false);
    setView(false);
  }
  const handleProject = () => {
    setEducation(false);
    setProfile(false);
    setProject(true);
    setSkill(false);
    setSocial(false);
    setView(false);
  }
  const handleSocial = () => {
    setEducation(false);
    setProfile(false);
    setProject(false);
    setSkill(false);
    setSocial(true);
    setView(false);
  }
  
  return (
    <div>
      <h3 className="bg-danger text-light fw-bolder text-center my-2 p-3">RESUME GENERATOR</h3>
      <div className="d-flex justify-content-evenly my-5">
        <button onClick={handleProfile} className="border-0">
        <p className="mx-3 ">Profile Section</p>
        </button>
        <button onClick={handleEducation} className="border-0">
        <p className="mx-3 ">Education Section</p>
        </button>
        <button onClick={handleSkill} className="border-0">
        <p className="mx-3 ">Skills Sector</p>
        </button>
        <button onClick={handleProject} className="border-0">
        <p className="mx-3 ">Mini Project</p>
        </button>
        <button onClick={handleSocial} className="border-0">
        <p className="mx-3 ">Social</p>
        </button>
      </div>
    </div>
  );
};

export default NavbarPage;
