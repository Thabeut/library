import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Loader.css";
import titleImg from "../../assets/imgs/loader/loader-title.png";

const Loader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const titleRef = useRef<HTMLImageElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progressDuration = 4000;
    const interval = 16;
    const increment = (100 / progressDuration) * interval;
    const totalDelay = 1000;

    let progressTimer: ReturnType<typeof setInterval> | null = null;

    const delayTimer = setTimeout(() => {
      progressTimer = setInterval(() => {
        setProgress((prev) => {
          const next = prev + increment;
          if (next >= 100) {
            if (progressTimer) clearInterval(progressTimer);
            return 100;
          }
          return next;
        });
      }, interval);
    }, totalDelay);

    return () => {
      clearTimeout(delayTimer);
      if (progressTimer) clearInterval(progressTimer);
    };
  }, []);

  useEffect(() => {
    if (titleRef.current) {
      gsap.set(titleRef.current, { y: 60, opacity: 0 });
      gsap.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      });
    }

    if (progressTrackRef.current) {
      gsap.set(progressTrackRef.current, {
        scaleX: 0,
        transformOrigin: "center",
      });
      gsap.to(progressTrackRef.current, {
        scaleX: 1,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.4,
      });
    }
  }, []);

  return (
    <div className="loader-container">
      <div className="loader-background" />
      <div className="loader-content">
        <img
          ref={titleRef}
          src={titleImg}
          alt="The Library of Knowledge"
          className="loader-title"
        />
        <div className="loader-progress-container">
          <div className="loader-progress-bar" ref={progressBarRef}>
            <div
              className="loader-progress-fill"
              style={{ width: `${progress}%` }}
            />
            <div ref={progressTrackRef} className="loader-progress-track" />
            <div
              className="loader-progress-text"
              style={{
                left: `${progress}%`,
                opacity: progress > 0 ? 1 : 0,
              }}
            >
              {Math.round(progress)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
