import React, { useEffect } from 'react';
import { Outlet, useOutletContext, useLocation } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ScrollToTop from './components/ScrollToTop';

//komponente
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

//za animacije:
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  const [theme, setTheme] = React.useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

  const element = document.documentElement;
  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  //inicijalizacija AOS-a:
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100
    });
    AOS.refresh();
  });

  //so that AdminChatScreen doesn't have a footer
  const location = useLocation();
  const isMessagesRoute = location.pathname === '/messages';

  return (
    <div>
      <Navbar theme={theme} setTheme={setTheme} />
      <ScrollToTop />
      <Outlet context={theme} />
      {!isMessagesRoute && <Footer />}
      <ToastContainer />
    </div>
  );
};

export default App;
