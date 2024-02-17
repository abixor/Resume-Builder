import React, { useContext } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { AppContext } from "../AppContext";

const Template1 = () => {
  const navigate = useNavigate();
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
        <div className="header">
          <div>
            <div className="full-name">
              {image && (
                <img src={image} alt="Uploaded" height={80} width={80} className="my-4" />
              )}
              <p>{fname + " " + lname}</p>
            </div>
            <div className="contact-info">
              <span className="phone-val">Phone:{phone}</span>
            </div>
            <div>
              <span className="phone-val">Address:{address} </span>
            </div>
            <div className="about">
              <span className="position">Front-End Developer </span>
              <span className="desc">
                I am a front-end developer with more than 3 years of experience
                writing html, css, and js. I'm motivated, result-focused and
                seeking a successful team-oriented company with opportunity to
                grow.
              </span>
            </div>
            <div className="details">
              <div className="section">
                <h4 className="section__title">Education</h4>
                <p>****************************************</p>
                <div className="section__list">
                  <div className="section__list-item">
                    {Educationdata.length >= 0 ? (
                      Educationdata?.map((e, i) => {
                        return (
                          <div className="left" key={i}>
                            <p>{i + 1}</p>
                            <div className="name">Degree:{e.c_Name}</div>
                            <div className="addr">College:{e.school}</div>
                            <div className="duration">
                              Passing Year:{e.c_Years}
                            </div>
                            <div className="duration">
                              Percentage:{e.percentage}%
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <h1>No Data</h1>
                    )}
                  </div>
                </div>
              </div>

              <div className="section">
                <h4 className="section__title">Projects</h4>
                <p>****************************************</p>
                <div className="section__list">
                  <div className="section__list-item">
                    {Projectdata.length >= 0 ? (
                      Projectdata?.map((e, i) => {
                        return (
                          <div className="left" key={i}>
                            <p>{i + 1}</p>
                            <div className="name">Project Name:{e.pName}</div>
                            <div className="addr">Tech Stack:{e.techStack}</div>
                            <div className="duration">Description:{e.desp}</div>
                          </div>
                        );
                      })
                    ) : (
                      <h1>No Data</h1>
                    )}
                  </div>
                </div>
              </div>
              <div className="section">
                <h4 className="section__title">Skills</h4>
                <p>****************************************</p>
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
              <div className="section">
                <h4 className="section__title">Social Media</h4>
                <p>****************************************</p>
                {Socialdata.length >= 0 ? (
                  Socialdata.map((e, i) => {
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
                  <h3>No Data</h3>
                )}
              </div>
            </div>
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

export default Template1;
