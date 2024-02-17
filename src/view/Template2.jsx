import React, { useContext } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { AppContext } from "../AppContext";

const Template2 = () => {
  const Profiledata = useSelector((state) => state.profile.profileData);
  const Educationdata = useSelector((state) => state.education.educationData);
  const Skilldata = useSelector((state) => state.skill.skillData);
  const Projectdata = useSelector((state) => state.project.projectData);
  const Socialdata = useSelector((state) => state.social.socialData);
  const { fname, lname, phone, address, image } = Profiledata;

  const { setProfileData } = useContext(AppContext);

  const handlePrintOut = () => {
    setProfileData(false);
    setTimeout(() => {
      window.print();
    }, 500);
  };
  setTimeout(() => {
    setProfileData(true);
  }, 3000);

  return (
    <div>
      <div className="container">
        <div className="resume">
          <div className="header">
            {Profiledata ? (
              <div>
                {image && (
                  <img
                    src={image}
                    alt="Uploaded"
                    height={80}
                    width={80}
                    className="my-4"
                  />
                )}

                <h1>{fname + " " + lname}</h1>
                <p>{phone}</p>
                <p>{address}</p>
                <hr />
              </div>
            ) : (
              <h1>No Data</h1>
            )}
          </div>

          <div className="education">
            <h2>Education</h2>
            <p>********************</p>
            {Educationdata.length >= 0 ? (
              Educationdata?.map((e, i) => {
                return (
                  <div key={i}>
                    <p>{i + 1}</p>
                    <p>Degree:{e.c_Name}</p>
                    <p>College:{e.school}</p>
                    <p>Years:{e.c_Years}</p>
                    <p>Percentage: {e.percentage}%</p>
                    <hr />
                  </div>
                );
              })
            ) : (
              <h1>No Data</h1>
            )}
          </div>
          <div className="skill">
            <h2>Skills</h2>
            <p>********************</p>
            {Skilldata.length >= 0 ? (
              Skilldata?.map((e, i) => {
                return (
                  <ul key={i}>
                    <li>{e.skill}</li>
                  </ul>
                );
              })
            ) : (
              <h1>No Data</h1>
            )}
          </div>

          <div className="project">
            <h2>Project</h2>
            <p>********************</p>

            {Projectdata.length >= 0 ? (
              Projectdata?.map((e, i) => {
                return (
                  <div key={i}>
                    <p>{i + 1}</p>

                    <p>Project Name:{e.pName}</p>
                    <p>Tech Stack:{e.techStack}</p>
                    <p>Description:{e.desp}</p>
                    <hr />
                  </div>
                );
              })
            ) : (
              <h1>No Data</h1>
            )}
          </div>

          <div className="social">
            <h2>Social Media</h2>
            <p>********************</p>

            {Socialdata.length >= 0 ? (
              Socialdata?.map((e, i) => {
                return (
                  <ul key={i}>
                    <li>
                      <a href={e.social} target="_blank">
                        {e.social}
                      </a>
                    </li>
                  </ul>
                );
              })
            ) : (
              <h1>No Data</h1>
            )}
          </div>
        </div>
        <div className="d-flex">
          <Button
            onClick={() => handlePrintOut()}
            variant="outline-secondary"
            id="printPageButton"
          >
            Print Out
          </Button>
          <BackButton />
        </div>
      </div>
    </div>
  );
};

export default Template2;
