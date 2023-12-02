import React, { useState, useEffect } from "react";
import Particles from "react-particles";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "tailwindcss/base.css";
import { useSpring, animated } from "react-spring";
import StarSky from "react-star-sky";
import "react-star-sky/dist/index.css";
import PhotoList from "./components/PhotoList";
function App() {
  const particlesConfig = {
    particles: {
      number: {
        value: 100,
      },
      size: {
        value: 2,
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
      },
      line_linked: {
        enable: false,
      },
      move: {
        speed: 2,
      },
    },
  };
  const [apodData, setApodData] = useState(null);
  const api_key = "EGgzSKry2LEE3qcoEnUhBCtKexmfhUnCLsvVuDUf";
  const url_apod = `https://api.nasa.gov/planetary/apod?api_key=${api_key}`;
  const [isVisible, setIsVisible] = useState(false);

  const fadeIn = useSpring({ opacity: isVisible ? 1 : 0 });

  const imageAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "scale(1)" : "scale(0.8)",
  });

  const breathingAnimation = useSpring({
    from: { transform: "scale(1.0)" },
    to: { transform: "scale(1.1)" },
    config: { duration: 3000, reset: true },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url_apod);
        const data = await response.json();
        setApodData(data);
      } catch (error) {
        console.error("erroer fetchning nasa data");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-b from-gray-900 to-gray-800">
<nav className="nav font-semibold text-lg">
  <ul className="flex items-center">
    <li className="p-4 border-b-2 border-blue-300 border-opacity-0 duration-200 cursor-pointer active">
      <a href="" className="text-white hover:text-blue-300">Home</a>
    </li>
    <li className="p-4 border-b-2 border-blue-300 border-opacity-0 duration-200 cursor-pointer">
      <a href="" className="text-white hover:text-blue-300">Rovers</a>
    </li>
    <li className="p-4 border-b-2 border-blue-300 border-opacity-0 duration-200 cursor-pointer">
      <a href="" className="text-white hover:text-blue-300">Missions</a>
    </li>
    <li className="p-4 border-b-2 border-blue-300 border-opacity-0 duration-200 cursor-pointer">
      <a href="" className="text-white hover:text-blue-300">Contact</a>
    </li>
  </ul>
</nav>







      <div className="header-container text-center pt-8 pb-12">
        <h1 className="text-5xl font-extrabold mb-4 font-futuristic">
          NASA Photo of the Day
        </h1>
        {apodData && (
          <div className="bg-cover bg-center max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg p-4 md:p-8 border-2 border-futuristic">
            {/* Apply the continuous breathing animation using CSS */}
            <img
              src={apodData.url}
              alt={apodData.title}
              className="w-full h-96 object-cover rounded-t-lg breathing-animation"
            />
            <div className="p-8">
              <h2 className="text-4xl font-bold mb-4">{apodData.title}</h2>
              <p className="text-xl text-gray-400 leading-7">
                {apodData.explanation}
              </p>
            </div>
          </div>
        )}

        <div className="text-center py-8 mb-4 gap-4">
          <PhotoList
            rover={"curiosity"}
            sol={1000}
            camera={"fhaz"}
            page={1}
            apiKey={api_key}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
