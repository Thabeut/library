import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import EnterButton from "../../components/EnterButton/EnterButton";
import "./Home.css";
import titleImg from "../../assets/imgs/home/home-title.png";
import introVideo from "../../assets/vids/intro.mp4";
import scene1Video from "../../assets/vids/scene1.mp4";

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const scene1VideoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLImageElement>(null);
  const enterButtonRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const introVideo = introVideoRef.current;
    const scene1Video = scene1VideoRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const activeVideo = isVideoPlaying ? scene1Video : introVideo;
      if (!activeVideo) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPercent = clientX / innerWidth;
      const yPercent = clientY / innerHeight;

      const moveX = -(xPercent - 0.5) * 90;
      const moveY = -(yPercent - 0.5) * 90;
      const scale = 1.1;

      activeVideo.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
    };

    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    if (introVideo && !isVideoPlaying) {
      introVideo.loop = true;
      introVideo.playbackRate = 0.8;
      introVideo.currentTime = 0;
      introVideo.play();
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [isVideoPlaying]);

  useEffect(() => {
    const tl = gsap.timeline();

    if (titleRef.current) {
      gsap.set(titleRef.current, {
        scaleY: 0,
        opacity: 0,
        transformOrigin: "center",
      });
      tl.to(titleRef.current, {
        scaleY: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      });
    }

    if (enterButtonRef.current) {
      gsap.set(enterButtonRef.current, { opacity: 0, scale: 0.9 });
      tl.to(
        enterButtonRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3"
      );
    }
  }, []);

  const handleEnterClick = () => {
    const introVideo = introVideoRef.current;
    const scene1Video = scene1VideoRef.current;
    const content = contentRef.current;
    const overlay = overlayRef.current;

    if (introVideo && scene1Video) {
      if (content) {
        gsap.to(content, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
          onComplete: () => {
            setIsVideoPlaying(true);
          },
        });
      }

      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
        });
      }

      gsap.to(introVideo, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          introVideo.style.display = "none";
        },
      });

      scene1Video.style.display = "block";
      scene1Video.style.opacity = "1";
      scene1Video.loop = false;
      scene1Video.currentTime = 0;
      scene1Video.playbackRate = 0.7;

      scene1Video.play().then(() => {
        gsap.to(scene1Video, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    }
  };

  return (
    <div ref={containerRef} className="home-container">
      <video
        ref={introVideoRef}
        className="home-background"
        src={introVideo}
        muted
        playsInline
        preload="auto"
        loop
      />
      <video
        ref={scene1VideoRef}
        className="home-background"
        src={scene1Video}
        muted
        playsInline
        preload="auto"
        style={{ display: "none", opacity: 0 }}
      />
      {!isVideoPlaying && (
        <>
          <div ref={overlayRef} className="home-overlay"></div>
          <div ref={contentRef} className="home-content">
            <img
              ref={titleRef}
              src={titleImg}
              alt="The Hall of Zero Limits"
              className="home-title"
            />
            <div ref={enterButtonRef}>
              <EnterButton onClick={handleEnterClick} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
