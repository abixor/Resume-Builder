import React,{useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";

const BackButton = () => {
  const { profileData } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div>
      {profileData && <button
        onClick={() => navigate(-1)}
        className="border border-0 mx-5 p-2 px-3 bg-danger text-light fw-bolder rounded"
      >
        Back
      </button>}
    </div>
  );
};

export default BackButton;
