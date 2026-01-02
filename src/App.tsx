import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Loader from "./views/Loader/Loader";
import Home from "./views/Home/Home";
import "./App.css";

const App: React.FC = () => {
  const [loaderVisible, setLoaderVisible] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loaderRef.current) {
        gsap.to(loaderRef.current, {
          y: "-100%",
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            setLoaderVisible(false);
          },
        });
      }
    }, 5200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Home />
      {loaderVisible && (
        <div ref={loaderRef} className="app-loader-wrapper">
          <Loader />
        </div>
      )}
    </>
  );
};

export default App;
