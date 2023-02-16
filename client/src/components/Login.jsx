import React from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import axios from "axios";
//GoogleLogin, googleLogout,
import { useGoogleLogin } from "@react-oauth/google";

/** Import client */
import { client } from "../client";

/** Unique id package */
const generateUniqueId = require("generate-unique-id");

const Login = () => {
  const navigate = useNavigate();
  const id = generateUniqueId({
    length: 10,
    useLetters: false,
  });

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const access_token = tokenResponse.access_token;

      const responseData = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
      );
      const { name, picture } = responseData.data;
      const userData = responseData.data;
      userData._id = id;
      localStorage.setItem("user", JSON.stringify(userData));
      const doc = {
        _id: id,
        _type: "user",
        userName: name,
        image: picture,
      };

      client.createIfNotExists(doc).then(() => {
        navigate("/", { replace: true });
      });
    },
  });

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <button
              type="button"
              className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              onClick={() => login()}
              // disabled={renderProps.disabled}
            >
              <FcGoogle className="mr-4" /> Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
