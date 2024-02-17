import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { setProfileData } from "../features/profile/ProfileSlice";
import { setEducationData } from "../features/education/EducationSlice";
import { setSkillData } from "../features/skill/SkillSlice";
import { setSocialData } from "../features/social/SocialSlice";
import { setProjectData } from "../features/project/ProjectSlice";
import { AppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";

const StudentResume = () => {

  // Import states from the AppContext Components------------------------------
  const {
    profile,
    setProfile,
    setEducation,
    setProject,
    setSkill,
    setSocial,
    education,
    project,
    skill,
    view,
    social,
    setView,
  } = useContext(AppContext);

  const navigate = useNavigate()

  const dispatch = useDispatch();

  // Regex for Validations------------------------------------------------
  const fnameRegex = /^[a-zA-Z]+$/;
  const lnameRegex = /^[a-zA-Z]+$/;
  const phoneRegex = /^[0-9]+$/;
  const c_NameRegex = /^[0-9 a-zA-Z_., ]*$/;
  const numberRegex = /^[0-9_.]+$/;
  const percentageRegex = /^100(\.0{0,2}?)?$|^\d{0,2}(\.\d{0,2})?$/;
  const skillRegex = /^[a-zA-Z 0-9 .+\-]*$/;
  const regexUIrl = new RegExp(
    "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
  );

  
  // Profile Code-----------------------------------------

  //useState for the Profile----------------------------------
  const [base64Image, setBase64Image] = useState("");
  const [profileInput, setProfileInput] = useState({
    fname: "",
    lname: "",
    phone: "",
    address: "",
    image: "",
  });
  const [image, setImage] = useState(null);

  // Function to handle Profile Inputs-----------------------
  const handleProfileInput = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const blob = new Blob([reader.result], { type: file.type });
          convertBlobToBase64(blob); // Call function to convert Blob to base64
        };
        reader.readAsArrayBuffer(file);
      }
    } else {
      setProfileInput({
        ...profileInput,
        [name]: value,
      });
    }
  };

  // handle convert blob image to Base64
  const convertBlobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result); // Update the state with the base64 string
      setProfileInput({
        ...profileInput,
        image: reader.result,
      });
    };
    reader.readAsDataURL(blob);
  };

  // Function to handle the next Button on Profile Page------------------------------
  const nextPageProfile = () => {
    setEducation(true);
    setProfile(false);
    setProject(false);
    setSkill(false);
    setSocial(false);
    setView(false);
  };

  // Function to handle the Save And Continue Button on the Profile Page----------------------------
  const saveContinueProfile = (e) => {
    e.preventDefault();
    if ([profileInput].map((data) => data.fname).includes("")) {
      alert("Please entre your First Name");
    } else if (!fnameRegex.test(profileInput.fname) && profileInput.fname) {
      alert("The First Name should consist of letters only.");
    } else if (!lnameRegex.test(profileInput.lname) && profileInput.lname) {
      alert("The Last Name should consist of letters only.");
    } else if (!phoneRegex.test(profileInput.phone) && profileInput.phone) {
      alert("The contact number field should only contain numbers");
    } else if (
      profileInput.phone.length < 10 ||
      profileInput.phone.length > 10
    ) {
      alert("Please enter a 10-digit phone number in the contact field.");
    } else if ([profileInput].map((data) => data.lname).includes("")) {
      alert("Please entre your Last name");
    } else if ([profileInput].map((data) => data.phone).includes("")) {
      alert("Please entre your Mobile Number");
    } else if ([profileInput].map((data) => data.address).includes("")) {
      alert("Please entre your address");
    } else if ([profileInput].map((data) => data.image).includes("")) {
      alert("Please entre your image");
    } else {
      dispatch(setProfileData(profileInput));
      setEducation(true);
      setProfile(false);
      setProject(false);
      setSkill(false);
      setSocial(false);
      setView(false);
    }
  };

  // Education Code----------------------------------

  // useState for the Education--------------------------------------
  const [educationInput, setEducationInput] = useState([
    {
      c_Name: "",
      c_Years: "",
      school: "",
      percentage: "",
    },
  ]);

  // handle input change on Education component--------------------------
  const handleInputChangeEducation = (e, index) => {
    const { name, value } = e.target;
    const list = [...educationInput];
    list[index][name] = value;
    setEducationInput(list);
  };

  // handle click event of the Remove button on Education component-------------------------
  const handleRemoveClickEducation = (index) => {
    const list = [...educationInput];
    list.splice(index, 1);
    setEducationInput(list);
  };

  // handle click event of the Add button on Education component-------------------------
  const handleAddClickEducation = () => {
    setEducationInput([
      ...educationInput,
      {
        c_Name: "",
        c_Years: "",
        school: "",
        percentage: "",
      },
    ]);
  };

  // handle click event of the Next Page button on Education component-------------------------
  const nextPageEducation = () => {
    setSkill(true);
    setEducation(false);
    setProject(false);
    setSocial(false);
    setView(false);
  };

  // handle click event of the Save and Continue button on Education component-------------------------
  const saveContinueEducation = () => {
    if (educationInput.map((data) => data.c_Name).includes("")) {
      alert("Please entre your Degree Name");
    } else if (!c_NameRegex.test(educationInput.map((data) => data.c_Name))) {
      alert("The Degree Name should consist of letters only.");
    } else if (!c_NameRegex.test(educationInput.map((e) => e.school))) {
      alert("The College Name should consist of letters only.");
    } else if (
      !percentageRegex.test(educationInput.map((e) => e.percentage).at(-1))
    ) {
      alert(
        "The Percentage field should not contain more than two digits numbers."
      );
    } else if (educationInput.map((data) => data.c_Years).includes("")) {
      alert("Please entre your Passing Year");
    } else if (educationInput.map((data) => data.school).includes("")) {
      alert("Please entre your college/School Name");
    } else if (educationInput.map((data) => data.percentage).includes("")) {
      alert("Please entre your Percentage");
    } else if (
      Number(
        educationInput.map((data) => data.percentage).reduce((a, b) => a + b)
      ) < 1
    ) {
      alert("Candidates who score zero percent are not eligible.");
    } else {
      dispatch(setEducationData(educationInput));
      setEducation(false);
      setProfile(false);
      setSkill(true);
      setProject(false);
      setSocial(false);
      setView(false);
    }
  };

  // handle click event of the Back button on Education component-------------------------
  const handleBackEducation = () => {
    setProfile(true);
    setEducation(false);
    setProject(false);
    setSkill(false);
    setSocial(false);
    setView(false);
  };

// Skill component Code----------------------------------------------

//useState for the skill component---------------------------
  const [skillInput, setSkillInput] = useState([
    {
      skill: "",
    },
  ]);

  // handle input change on the skill component----------------------
  const handleInputChangeSkill = (e, index) => {
    const { name, value } = e.target;
    const list = [...skillInput];
    list[index][name] = value;
    setSkillInput(list);
  };

  // handle click event of the Remove button on the skill component----------------------
  const handleRemoveClickSkill = (index) => {
    const list = [...skillInput];
    list.splice(index, 1);
    setSkillInput(list);
  };

  // handle click event of the Add button on the skill component----------------------
  const handleAddClickSkill = () => {
    setSkillInput([
      ...skillInput,
      {
        skill: "",
      },
    ]);
  };

  // handle click event of the Next Page button on skill component-------------------------
  const nextPageSkill = () => {
    setProfile(false);
    setEducation(false);
    setProject(true);
    setSkill(false);
    setSocial(false);
  };

  // handle click event of the Save and Continue button on skill component-------------------------
  const saveContinueSkill = () => {
    if (skillInput.map((data) => data.skill).includes("")) {
      alert("Please entre your skill");
    } else if (!skillRegex.test(skillInput.map((e) => e.skill).at(-1))) {
      alert("Make sure to enter a skill that is recognized.");
    } else {
      dispatch(setSkillData(skillInput));
      setProfile(false);
      setEducation(false);
      setProject(true);
      setSkill(false);
      setSocial(false);
    }
  };

  // handle click event of the Back button on skill component-------------------------
  const handleBackSkill = () => {
    setProfile(false);
    setEducation(true);
    setProject(false);
    setSkill(false);
    setSocial(false);
    setView(false);
  };

  // Social Component Code-----------------------------

  // useState for the Social component-----------------------------------
  const [socialInput, setSocialInput] = useState([
    {
      social: "",
    },
  ]);

  // handle input change for social component---------------------------------
  const handleInputChangeSocial = (e, index) => {
    const { name, value } = e.target;
    const list = [...socialInput];
    list[index][name] = value;
    setSocialInput(list);
  };

  // handle click event of the Remove button for social component---------------------------------
  const handleRemoveClickSocial = (index) => {
    const list = [...socialInput];
    list.splice(index, 1);
    setSocialInput(list);
  };

  // handle click event of the Add button for social component---------------------------------
  const handleAddClickSocial = () => {
    setSocialInput([
      ...socialInput,
      {
        social: "",
      },
    ]);
  };

  // handle click event for the Back button for social component-------------------------------
  const handleBackSocial = () => {
    setSkill(false);
    setEducation(false);
    setSkill(false);
    setProject(true);
    setSocial(false);
    setView(false);
  };
  
  // handle click event for the Save and Continue button for social component-------------------------------
  const saveContinueSocial = () => {
    if (socialInput.map((data) => data.social).includes("")) {
      alert("Please entre your Social Media Account");
    } else if (!regexUIrl.test(socialInput.map((data) => data.social).at(-1))) {
      alert("Please input a URL that is considered valid.");
    } else {
      dispatch(setSocialData(socialInput));
      navigate('/View')
      setSkill(false);
      setEducation(false);
      setSkill(false);
      setProject(false);
      setSocial(false);
      setView(true)
    }
  };

  // Project component Code---------------------------------------
  
  //useState for Project component---------------------------------
  const [projectInput, setProjectInput] = useState([
    {
      pName: "",
      techStack: "",
      desp: "",
    },
  ]);

  // handle input change for the Project component----------------------------
  const handleInputChangeProject = (e, index) => {
    const { name, value } = e.target;
    const list = [...projectInput];
    list[index][name] = value;
    setProjectInput(list);
  };

  // handle click event of the Remove button for the Project component----------------------------
  const handleRemoveClickProject = (index) => {
    const list = [...projectInput];
    list.splice(index, 1);
    setProjectInput(list);
  };

  // handle click event of the Add button for the Project component----------------------------
  const handleAddClickProject = () => {
    setProjectInput([
      ...projectInput,
      {
        pName: "",
        techStack: "",
        desp: "",
      },
    ]);
  };

  //handle click event for the next page of Project component------------------------------------
  const nextPageProject = () => {
    setSkill(false);
    setEducation(false);
    setSkill(false);
    setProject(false);
    setSocial(true);
    setView(false);
  };

  //handle click event for the Back page of Project component------------------------------------
  const handleBackProject = () => {
    setSkill(false);
    setEducation(false);
    setSkill(true);
    setProject(false);
    setSocial(false);
    setView(false);
  };

  //handle click event for the Save and Continue button of the Project component----------------------------
  const saveContinueProject = () => {
    if (projectInput.map((data) => data.pName).includes("")) {
      alert("Please entre your Project Name");
    } else if (projectInput.map((data) => data.desp).includes("")) {
      alert("Please entre your Project Description");
    } else {
      dispatch(setProjectData(projectInput));
      setSkill(false);
      setEducation(false);
      setSkill(false);
      setProject(false);
      setSocial(true);
      setView(false);
    }
  };

  // View code--------------------------------------

  // handle click event for the Profile button of the View component------------------------------------------
  const handleProfile = () => {
    navigate('/StudentResume')
    // setEducation(false);
    //   setProfile(false);
    //   setProject(false);
    //   setSkill(false);
    //   setSocial(false);
    //   setView(false);
  }
  
  // handle click event for the Education button of the View component------------------------------------------
  const handleEducation = () => {
    setEducation(true);
    setProfile(false);
    setProject(false);
    setSkill(false);
    setSocial(false);
    setView(false);
  }
  
  // handle click event for the Skill button of the View component------------------------------------------
  const handleSkill = () => {
    setEducation(false);
    setProfile(false);
    setProject(false);
    setSkill(true);
    setSocial(false);
    setView(false);
  }
  
  // handle click event for the Project button of the View component------------------------------------------
  const handleProject = () => {
    setEducation(false);
    setProfile(false);
    setProject(true);
    setSkill(false);
    setSocial(false);
    setView(false);
  }
  
  // handle click event for the Social button of the View component------------------------------------------
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
      {profile ? (
        <div>
          <div className="form-group text-center">
            <h5 className="my-5">Add your profile details</h5>
            <input
              type="text"
              placeholder="First Name*"
              className="form-control w-75 m-auto my-2 p-3"
              name="fname"
              maxLength={15}
              value={profileInput.fname}
              onChange={handleProfileInput}
              required
            />
            {!fnameRegex.test(profileInput.fname) && profileInput.fname && (
              <span style={{ color: "red" }}>
                <b>Please make sure enter alphabet chracters only</b>
              </span>
            )}
            <input
              type="text"
              placeholder="Last Name*"
              className="form-control w-75 m-auto my-2 p-3"
              name="lname"
              maxLength={15}
              value={profileInput.lname}
              onChange={handleProfileInput}
              required
            />
            {!lnameRegex.test(profileInput.lname) && profileInput.lname && (
              <span style={{ color: "red" }}>
                <b>Please make sure enter alphabet chracters only</b>
              </span>
            )}
            <input
              type="text"
              placeholder="Phone Number*"
              className="form-control w-75 m-auto my-2 p-3"
              name="phone"
              value={profileInput.phone}
              maxLength={10}
              onChange={handleProfileInput}
              required
            />
            {!phoneRegex.test(profileInput.phone) && profileInput.phone && (
              <span style={{ color: "red" }}>
                <b>Please make sure enter numbers only</b>
              </span>
            )}
            <input
              type="text"
              placeholder="Address*"
              className="form-control w-75 m-auto my-2 p-3"
              name="address"
              maxLength={50}
              value={profileInput.address}
              onChange={handleProfileInput}
              required
            />

            <input
              type="file"
              id="imageeee"
              className="form-control w-75 m-auto my-2 p-3"
              name="image"
              value={image}
              onChange={handleProfileInput}
              accept="image/*"
            />

            <label htmlFor="imageeee">
              {" "}
              {profileInput.image && (
                <img
                  src={profileInput.image}
                  alt="Uploaded"
                  height={100}
                  width={100}
                />
              )}
            </label>
          </div>
          <hr />
          <div className="d-flex justify-content-evenly">
            <button
              className="bg-danger text-light fw-bolder border-0 px-2"
              onClick={nextPageProfile}
            >
              NEXT
            </button>
            <button
              className="bg-danger text-light fw-bolder border-0 px-2"
              onClick={(e) => saveContinueProfile(e)}
            >
              SAVE & CONTINUE
            </button>
          </div>
        </div>
      ) : education ? (
        <div className="form-group text-center">
          <h5 className="my-5">Add your Education details</h5>
          {educationInput.map((x, i) => {
            return (
              <div className="form-group text-center" key={i}>
                <input
                  name="c_Name"
                  placeholder="Course Name*"
                  className="form-control w-75 m-auto my-2 p-3"
                  maxLength={20}
                  value={x.c_Name}
                  onChange={(e) => handleInputChangeEducation(e, i)}
                  required
                />
                {!c_NameRegex.test(x.c_Name) && x.c_Name && (
                  <span style={{ color: "red" }}>
                    <b>The Degree Name should consist of letters only.</b>
                  </span>
                )}
                <input
                  name="c_Years"
                  type="month"
                  placeholder="Completion Year*"
                  className="form-control w-75 m-auto my-2 p-3"
                  maxLength={4}
                  value={x.c_Years}
                  onChange={(e) => handleInputChangeEducation(e, i)}
                  required
                />
                {/* !numberRegex.test(x.c_Years) && x.c_Years && (
            <span style={{ color: "red" }}>
              <b>The Passing Year field should only contain numbers.</b>
            </span>
          ) */}
                <input
                  name="school"
                  placeholder="College/School*"
                  className="form-control w-75 m-auto my-2 p-3"
                  value={x.school}
                  onChange={(e) => handleInputChangeEducation(e, i)}
                  required
                />
                {!c_NameRegex.test(x.school) && x.school && (
                  <span style={{ color: "red" }}>
                    <b>The College Name should consist of letters only.</b>
                  </span>
                )}
                <input
                  name="percentage"
                  placeholder="Percentage*"
                  className="form-control w-75 m-auto my-2 p-3"
                  maxLength={3}
                  value={x.percentage}
                  onChange={(e) => handleInputChangeEducation(e, i)}
                  required
                />
                {!numberRegex.test(x.percentage) && x.percentage && (
                  <span style={{ color: "red" }}>
                    <b>The Percentage field should only contain numbers.</b>
                  </span>
                )}
                <div className="btn-box">
                  {educationInput.length !== 1 && (
                    <button
                      className="bg-danger text-light fw-bolder border-0 px-2"
                      onClick={() => handleRemoveClickEducation(i)}
                    >
                      Remove
                    </button>
                  )}
                  {educationInput.length - 1 === i && (
                    <button
                      onClick={handleAddClickEducation}
                      className="bg-danger text-light fw-bolder border-0 px-2 mx-3"
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          <hr />
          <div className="d-flex justify-content-evenly">
            <button
              className="bg-danger text-light fw-bolder border-0 px-2"
              onClick={handleBackEducation}
            >
              Back
            </button>

            <button
              className="bg-danger text-light fw-bolder border-0 px-2"
              onClick={nextPageEducation}
            >
              NEXT
            </button>
            <button
              className="bg-danger text-light fw-bolder border-0 px-2"
              onClick={saveContinueEducation}
            >
              SAVE & CONTINUE
            </button>
          </div>
        </div>
      ) : social ? (
        <div className="form-group text-center">
          <h5 className="my-5">Add your Social Media Accounts </h5>
          {socialInput.map((x, i) => {
            return (
              <div className="form-group text-center" key={i}>
                <input
                  name="social"
                  placeholder="Social*"
                  className="form-control w-25 m-auto my-2 p-3"
                  value={x.social}
                  onChange={(e) => handleInputChangeSocial(e, i)}
                  required
                />
                {!regexUIrl.test(x.social) && x.social && (
                  <span className="text-danger">
                    <b>Please input a URL that is considered valid.</b>
                  </span>
                )}

                <div className="btn-box">
                  {socialInput.length !== 1 && (
                    <button
                      className="bg-danger text-light fw-bolder border-0 px-2"
                      onClick={() => handleRemoveClickSocial(i)}
                    >
                      Remove
                    </button>
                  )}
                  {socialInput.length - 1 === i && (
                    <button
                      onClick={handleAddClickSocial}
                      className="bg-danger text-light fw-bolder border-0 px-2 mx-3"
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          <hr />
          <div className="d-flex justify-content-evenly">
            <button
              className="bg-danger text-light fw-bolder border-0 px-2"
              onClick={handleBackSocial}
            >
              Back
            </button>

            <button
              className="bg-danger text-light fw-bolder border-0 px-2"
              onClick={saveContinueSocial}
            >
              SAVE & CONTINUE
            </button>
          </div>
        </div>
      ) : skill ? (
        <div className="form-group text-center">
          <h5 className="my-5">Add your Skills</h5>
          {skillInput.map((x, i) => {
            return (
              <div className="form-group text-center" key={i}>
                <input
                  name="skill"
                  placeholder="Skill*"
                  className="form-control w-25 m-auto my-2 p-3"
                  maxLength={15}
                  value={x.skill}
                  onChange={(e) => handleInputChangeSkill(e, i)}
                  required
                />
                {!skillRegex.test(x.skill) && x.skill && (
                  <span className="text-danger">
                    <b>Make sure to enter a skill that is recognized.</b>
                  </span>
                )}

                <div className="btn-box">
                  {skillInput.length !== 1 && (
                    <button
                      className="bg-danger text-light fw-bolder border-0 px-2"
                      onClick={() => handleRemoveClickSkill(i)}
                    >
                      Remove
                    </button>
                  )}
                  {skillInput.length - 1 === i && (
                    <button
                      onClick={handleAddClickSkill}
                      className="bg-danger text-light fw-bolder border-0 px-2 mx-3"
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          <hr />
          <div className="d-flex justify-content-evenly">
          <button
          className="bg-danger text-light fw-bolder border-0 px-2"
          onClick={handleBackSkill}
        >
          Back
        </button>

            <button
              className="bg-danger text-light fw-bolder border-0 px-2"
              onClick={nextPageSkill}
            >
              NEXT
            </button>
            <button
              className="bg-danger text-light fw-bolder border-0 px-2"
              onClick={saveContinueSkill}
            >
              SAVE & CONTINUE
            </button>
          </div>
        </div>
      ) : project ? (
        <div className="form-group text-center">
      <h5 className="my-5">Add your Project details</h5>
      {projectInput.map((x, i) => {
        return (
          <div className="form-group text-center" key={i}>
            <input
              name="pName"
              placeholder="Project Name*"
              className="form-control w-75 m-auto my-2 p-3"
              value={x.pName}
              onChange={(e) => handleInputChangeProject(e, i)}
              required
            />
            <input
              name="techStack"
              placeholder="Tech Stack"
              className="form-control w-75 m-auto my-2 p-3"
              value={x.techStack}
              onChange={(e) => handleInputChangeProject(e, i)}
            />
            <textarea
              name="desp"
              placeholder="Description*"
              className="form-control w-75 m-auto my-2 p-3"
              value={x.desp}
              onChange={(e) => handleInputChangeProject(e, i)}
              required
            />

            <div className="btn-box">
              {projectInput.length !== 1 && (
                <button
                  className="bg-danger text-light fw-bolder border-0 px-2"
                  onClick={() => handleRemoveClickProject(i)}
                >
                  Remove
                </button>
              )}
              {projectInput.length - 1 === i && (
                <button
                  onClick={handleAddClickProject}
                  className="bg-danger text-light fw-bolder border-0 px-2 mx-3"
                >
                  Add
                </button>
              )}
            </div>
          </div>
        );
      })}
      <hr />
      <div className="d-flex justify-content-evenly">
        <button
          className="bg-danger text-light fw-bolder border-0 px-2"
          onClick={handleBackProject}
        >
          Back
        </button>

        <button
          className="bg-danger text-light fw-bolder border-0 px-2"
          onClick={nextPageProject}
        >
          NEXT
        </button>
        <button
          className="bg-danger text-light fw-bolder border-0 px-2"
          onClick={saveContinueProject}
        >
          SAVE & CONTINUE
        </button>
      </div>
    </div>
      ) : ""}
    </div>
  );
};

export default StudentResume;
