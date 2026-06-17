import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Hero from "../../components/Hero";
import Services from "../../components/Services";
import Feature from "../../components/Feature";
import Certificates from "../../components/Certificates";
import About from "../../components/About";


function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      const target = document.getElementById(sectionId);

      if (target) {
        setTimeout(() => {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 200);
      }
    }
  }, [location.state]);

  return (
    <>
      <Hero />
      <Services />
      <Feature />
      <Certificates />
      <About />
    </>
  );
}

export default Home;