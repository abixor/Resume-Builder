import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setSocialData } from './SocialSlice'
import { AppContext } from '../../AppContext';

const Social = () => {

  const regexUIrl = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');

  const dispatch = useDispatch();

  const { setEducation, setProfile, setProject, setSkill, setSocial, setView } =
    useContext(AppContext);

  const [socialInput, setSocialInput] = useState([
    {
      social: "",
    },
  ]);

 

  // handle input change
  const handleInputChangeSocial = (e, index) => {
    const { name, value } = e.target;
    const list = [...socialInput];
    list[index][name] = value;
    setSocialInput(list);
  };

  // handle click event of the Remove button
  const handleRemoveClickSocial = (index) => {
    const list = [...socialInput];
    list.splice(index, 1);
    setSocialInput(list);
  };

  // handle click event of the Add button
  const handleAddClickSocial = () => {
    setSocialInput([
      ...socialInput,
      {
        social: "",
      },
    ]);
  };

  const saveContinueSocial = () => {
    if (socialInput.map((data) => data.social).includes("")) {
      alert("Please entre your Social Media Account");
    }else if(!regexUIrl.test(socialInput.map((data)=>data.social).at(-1))){
      alert("Please input a URL that is considered valid.")
    }
     else {
      dispatch(setSocialData(socialInput))
      setSkill(false);
      setEducation(false);
      setSkill(false)
      setProject(false)
      setSocial(false)
      setView(true)
    }
  }

  return (
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
            {
              !regexUIrl.test(x.social) && x.social &&(
                <span className='text-danger'><b>Please input a URL that is considered valid.</b></span>
              )
            }

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
        <NavLink to='/Project' className='text-decoration-none text-dark'><h5 className="mx-2">Back</h5></NavLink>


        <button className="bg-danger text-light fw-bolder border-0 px-2" onClick={saveContinueSocial}>
          SAVE & CONTINUE
        </button>
      </div>
    </div>
  )
}

export default Social
