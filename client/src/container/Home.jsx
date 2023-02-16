import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, link, Route, Routes } from "react-router-dom";
import { Sidebar, UserProfile } from "../components";
import { client } from "../client";
import logo from "../assets/logo.png";
import { Pins } from "./Pins";
import { userQuery } from "../utils/data";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const [user, setUser] = useState(null);

  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?._id);
    client
      .fetch(query)
      .then((response) => {
        setUser(response[0]);
      })
      .catch((err) => {
        console.log(`Error fetching user info ${err}`);
      });
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar />
      </div>
      <div className="flex md:hidden flex-row">
        <HiMenu
          fontSize={40}
          className="cursor-pointer"
          onClick={() => {
            setToggleSidebar(true);
          }}
        />
        <Link to="/">
          <img src={logo} alt="logo" srcSet="" className="w-28" />
        </Link>
        <Link to={`user-profile/${user?._id}`}>
          <img src={user?.image} alt="logo" srcSet="" className="w-28" />
        </Link>
      </div>
      {toggleSidebar && (
        <div className="fixed w-4/5 bg-white h-scree overflow-y-auto shadow-md z-10 animate-slide-in ">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle
              fontSize={30}
              className="cursor-pointer"
              onClick={() => {
                setToggleSidebar(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
/**
 * Timestamp the video is new
 */

export default Home;
