import React, { useState, useContext } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData } from "./ProfileSlice";
import { AppContext } from "../../AppContext";

const Profile = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { setProfile, setEducation, setProject, setSkill, setSocial } = useContext(AppContext);

  const profileData = useSelector((state) => state.profile.profileData);

  const fnameRegex = /^[a-zA-Z]+$/;
  const lnameRegex = /^[a-zA-Z]+$/;
  const phoneRegex = /^[0-9]+$/;

  const [base64Image, setBase64Image] = useState("");
  const [profileInput, setProfileInput] = useState({
    fname: "",
    lname: "",
    phone: "",
    address: "",
    image: "",
  });
  const [image, setImage] = useState(null);

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

  // handle convert blob image to 64
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

  const nextPage = () => {
    navigate("/Education");
  };
  const saveContinue = (e) => {
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
      // navigate("/Education");
      setEducation(true);
      setProfile(false);
      setProject(false);
      setSkill(false);
      setSocial(false);
    }
  };

  return (
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
          className="form-control w-75 m-auto my-2 p-3"
          name="image"
          value={image}
          onChange={handleProfileInput}
          accept="image/*"
        />
        {/* profileInput.image && (
          <img
            src={URL.createObjectURL(profileInput.image)}
            alt="Uploaded"
          />
        ) */}
      </div>
      <hr />
      <div className="d-flex justify-content-evenly">
        <button
          className="bg-danger text-light fw-bolder border-0 px-2"
          onClick={nextPage}
        >
          NEXT
        </button>
        <button
          className="bg-danger text-light fw-bolder border-0 px-2"
          onClick={(e) => saveContinue(e)}
        >
          SAVE & CONTINUE
        </button>
      </div>
    </div>
  );
};

export default Profile;
