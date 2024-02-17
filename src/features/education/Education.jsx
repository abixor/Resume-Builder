import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEducationData } from "./EducationSlice";
import { AppContext } from "../../AppContext";

const Education = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { setEducation, setProfile, setProject, setSkill, setSocial } =
    useContext(AppContext);

  const c_NameRegex = /^[0-9 a-zA-Z_., ]*$/;
  const numberRegex = /^[0-9_.]+$/;
  const percentageRegex = /^100(\.0{0,2}?)?$|^\d{0,2}(\.\d{0,2})?$/;

  const [educationInput, setEducationInput] = useState([
    {
      c_Name: "",
      c_Years: "",
      school: "",
      percentage: "",
    },
  ]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...educationInput];
    list[index][name] = value;
    setEducationInput(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...educationInput];
    list.splice(index, 1);
    setEducationInput(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
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

  const nextPage = () => {
    navigate("/Skill");
  };

  const saveContinue = () => {
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
      // navigate("/Skill");
      setSkill(true);
      setEducation(false);
      setSkill(false)
      setProject(false)
      setSocial(false)
    }
  };

  const handleBack = () => {
    setProfile(true);
    setEducation(false);
    setProject(false);
    setSkill(false);
    setSocial(false);
  };

  return (
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
              onChange={(e) => handleInputChange(e, i)}
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
              onChange={(e) => handleInputChange(e, i)}
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
              onChange={(e) => handleInputChange(e, i)}
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
              onChange={(e) => handleInputChange(e, i)}
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
                  onClick={() => handleRemoveClick(i)}
                >
                  Remove
                </button>
              )}
              {educationInput.length - 1 === i && (
                <button
                  onClick={handleAddClick}
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
          onClick={handleBack}
        >
          Back
        </button>

        <button
          className="bg-danger text-light fw-bolder border-0 px-2"
          onClick={nextPage}
        >
          NEXT
        </button>
        <button
          className="bg-danger text-light fw-bolder border-0 px-2"
          onClick={saveContinue}
        >
          SAVE & CONTINUE
        </button>
      </div>
    </div>
  );
};

export default Education;
