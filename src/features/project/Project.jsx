import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProjectData } from "./ProjectSlice";

const Project = () => {
  const dispatch = useDispatch();

  const [projectInput, setProjectInput] = useState([
    {
      pName: "",
      techStack: "",
      desp: "",
    },
  ]);
  // handle input change
  const handleInputChangeProject = (e, index) => {
    const { name, value } = e.target;
    const list = [...projectInput];
    list[index][name] = value;
    setProjectInput(list);
  };

  // handle click event of the Remove button
  const handleRemoveClickProject = (index) => {
    const list = [...projectInput];
    list.splice(index, 1);
    setProjectInput(list);
  };

  // handle click event of the Add button
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

  const nextPageProject = () => {
    navigate("/Social");
    setSkill(false);
    setEducation(false);
    setSkill(false);
    setProject(false);
    setSocial(true);
    setView(false);
  };

  const handleBackProject = () => {
    setSkill(false);
    setEducation(false);
    setSkill(true);
    setProject(false);
    setSocial(false);
    setView(false);
  };
  const saveContinueProject = () => {
    if (projectInput.map((data) => data.pName).includes("")) {
      alert("Please entre your Project Name");
    } else if (projectInput.map((data) => data.desp).includes("")) {
      alert("Please entre your Project Description");
    } else {
      dispatch(setProjectData(projectInput));
      navigate("/Social");
      setSkill(false);
      setEducation(false);
      setSkill(false);
      setProject(false);
      setSocial(true);
      setView(false);
    }
  };
  return (
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
  );
};

export default Project;
