import React, { useContext } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { AppContext } from "../AppContext";

const Template3 = () => {
  const navigate = useNavigate();
  const Profiledata = useSelector((state) => state.profile.profileData);
  const Educationdata = useSelector((state) => state.education.educationData);
  const Skilldata = useSelector((state) => state.skill.skillData);
  const Projectdata = useSelector((state) => state.project.projectData);
  const Socialdata = useSelector((state) => state.social.socialData);

  const { fname, lname, phone, address, image } = Profiledata;

  const {setProfileData} = useContext(AppContext)

  const handlePrintOut=()=>{
    setProfileData(false);
    setTimeout(()=>{
      window.print();
    },500)
  };
  setTimeout(()=>{
    setProfileData(true)
  },3000)

  return (
    <div>
      
      <div className="container">
        <div className="">
          {image && (
            <img src={image} alt="Uploaded" height={80} width={80} className="my-4" />
          )}

          <h2>{fname + " " + lname}</h2>
          <h2>{phone}</h2>
          <h2>{address}</h2>
        </div>
        <div className="">
          <h2 className="fw-bolder text-light bg-danger px-2"># EDUCATION</h2>
          {Educationdata.length >= 0 ? (
            Educationdata.map((e, i) => {
              return (
                <div key={i}>
                  <p>{i + 1}</p>
                  <h4>Course Name: {e.c_Name}</h4>
                  <h4>Completion Year: {e.c_Years}</h4>
                  <h4>College: {e.school}</h4>
                  <h4>Percentage: {e.percentage}%</h4>
                </div>
              );
            })
          ) : (
            <h3> No Data</h3>
          )}
        </div>
        <div className="">
          <h2 className="fw-bolder text-light bg-danger px-2"># PROJECT</h2>

          {Projectdata.length >= 0 ? (
            Projectdata.map((e, i) => {
              return (
                <div key={i}>
                  <p>{i + 1}</p>
                  <h4>Project Name: {e.pName}</h4>
                  <h4>Tech Stack: {e.techstack}</h4>
                  <h4>Description: {e.desp}</h4>
                </div>
              );
            })
          ) : (
            <h3> No Data</h3>
          )}
        </div>
        <div>
          <h2 className="fw-bolder text-light bg-danger px-2"># SKILLS</h2>

          {Skilldata.length >= 0 ? (
            Skilldata.map((e, i) => {
              return (
                <ul key={i}>
                  <li>{e.skill}</li>
                </ul>
              );
            })
          ) : (
            <h3>No Data</h3>
          )}
        </div>
        <div>
          <h2 className="fw-bolder text-light bg-danger px-2">
            # SOCIAL MEDIA
          </h2>

          {Socialdata.length >= 0 ? (
            Socialdata.map((e, i) => {
              return (
                <ul key={i}>
                  <li><a href={e.social} target="_blank">{e.social}</a></li>
                </ul>
              );
            })
          ) : (
            <h3>No Data</h3>
          )}
        </div>
        <div className="d-flex">
        <Button onClick={() =>handlePrintOut()} variant="outline-secondary" id="printPageButton" >
        Print Out
        </Button>
        <BackButton/>
        </div>
      </div>
    </div>
  );
};

export default Template3;
