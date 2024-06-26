import React from "react";
import io from "socket.io-client";

import Hero from "../components/Hero/Hero";
import Services from "../components/Services/Services";
import About from "../components/About/About";
import Testimonials from "../components/Testimonials/Testimonials";
import { useOutletContext } from "react-router-dom";
import NewCarsSelection from "../components/CarSelections/NewCarsSelection";
import { Link } from "react-router-dom";
import UserPopUpChat from "../components/chat/UserPopUpChat";

import { useAuthContext } from "../context/AuthContext";
import MostRecentNewCars from "../components/CarSelections/MostRecentNewCars";

const HomeScreen = () => {
  //so the hero picture changes depending on dark/light theme
  const theme = useOutletContext();
  const { authUser } = useAuthContext();

  return (
    <div>
      <Hero theme={theme} />

      <Services />

      <About />

      <h1
        className="dark:text-primary dark:bg-black text-3xl font-semibold text-center font-serif 
            sm:text-4xl pt-12"
      >
        Nova vozila
      </h1>
      <MostRecentNewCars />

      <div className="grid place-content-center min-h-[100px] dark:bg-black">
        <Link to={`/newcars`}>
          <button className="button-outline" data-aos="fade-up">
            Istraži ponudu
          </button>
        </Link>
      </div>

      <Testimonials />

      {authUser && !authUser.isAdmin && <UserPopUpChat />}
    </div>
  );
};

export default HomeScreen;
