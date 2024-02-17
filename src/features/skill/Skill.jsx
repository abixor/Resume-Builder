import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSkillData } from "./SkillSlice";
import { AppContext } from "../../AppContext";

const Skill = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const skillRegex = /^[a-zA-Z 0-9 .+\-]*$/;

  const { setProfile, setEducation, setProject, setSkill, setSocial } =
    useContext(AppContext);

  const [skillInput, setSkillInput] = useState([
    {
      skill: "",
    },
  ]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...skillInput];
    list[index][name] = value;
    setSkillInput(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...skillInput];
    list.splice(index, 1);
    setSkillInput(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setSkillInput([
      ...skillInput,
      {
        skill: "",
      },
    ]);
  };

  const nextPage = () => {
    navigate("/Project");
  };

  const saveContinue = () => {
    if (skillInput.map((data) => data.skill).includes("")) {
      alert("Please entre your skill");
    } else if (!skillRegex.test(skillInput.map((e) => e.skill).at(-1))) {
      alert("Make sure to enter a skill that is recognized.");
    } else {
      dispatch(setSkillData(skillInput));
      // navigate("/Project");
      setProfile(false);
      setEducation(false);
      setProject(true);
      setSkill(false);
      setSocial(false);
    }
  };
  return (
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
              onChange={(e) => handleInputChange(e, i)}
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
                  onClick={() => handleRemoveClick(i)}
                >
                  Remove
                </button>
              )}
              {skillInput.length - 1 === i && (
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
        <NavLink to="/Education" className="text-decoration-none text-dark">
          <h5 className="mx-2">Back</h5>
        </NavLink>

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

export default Skill;
