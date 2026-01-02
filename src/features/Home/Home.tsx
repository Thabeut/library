import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import EnterButton from "../../components/EnterButton/EnterButton";
import PlatformAssistant from "../../components/PlatformAssistant/PlatformAssistant";
import type { Section } from "../../components/PlatformAssistant/PlatformAssistant";
import Book from "../../components/Book/Book";
import "./Home.css";
import titleImg from "../../assets/imgs/home/home-title.png";
import introVideo from "../../assets/vids/intro.mp4";
import scene1Video from "../../assets/vids/scene1.mp4";
import scene2Video from "../../assets/vids/scene2.mp4";

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const scene1VideoRef = useRef<HTMLVideoElement>(null);
  const scene2VideoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLImageElement>(null);
  const enterButtonRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const blinkOverlayRef = useRef<HTMLDivElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showPlatformAssistant, setShowPlatformAssistant] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [showBook, setShowBook] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const introVideo = introVideoRef.current;
    const scene1Video = scene1VideoRef.current;
    const scene2Video = scene2VideoRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      let activeVideo: HTMLVideoElement | null = null;

      if (currentScene === 0) {
        activeVideo = introVideo;
      } else if (currentScene === 1) {
        activeVideo = scene1Video;
      } else if (currentScene === 2) {
        activeVideo = scene2Video;
      }

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

    if (introVideo && currentScene === 0 && !isVideoPlaying) {
      const loaderDelay = 5000;
      const delayTimer = setTimeout(() => {
        if (introVideo) {
          introVideo.loop = true;
          introVideo.playbackRate = 0.8;
          introVideo.currentTime = 0;
          introVideo.play();
        }
      }, loaderDelay);

      return () => {
        clearTimeout(delayTimer);
        if (container) {
          container.removeEventListener("mousemove", handleMouseMove);
        }
      };
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [isVideoPlaying, currentScene]);

  useEffect(() => {
    const delay = 5700;
    const tl = gsap.timeline({ delay: delay / 1000 });

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

      scene1Video.onended = handleScene1End;
      setCurrentScene(1);
    }
  };

  const handleScene1End = () => {
    setShowPlatformAssistant(true);
  };

  const platformAssistantSections: Section[] = [
    {
      text: "Welcome to The Library of Knowledge. Explore our collection of books, each containing valuable lessons, tips, and interactive content to expand your understanding.",
    },
    {
      text: "Each book in this library is a gateway to new knowledge. Flip through pages filled with today's tips, fun facts, and interactive quizzes designed to enhance your learning journey. Begin your exploration and discover the wisdom within.",
    },
  ];

  const handlePlatformAssistantComplete = () => {
    setShowPlatformAssistant(false);
    const scene2Video = scene2VideoRef.current;
    const scene1Video = scene1VideoRef.current;

    if (scene1Video && scene2Video) {
      gsap.to(scene1Video, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          scene1Video.style.display = "none";
        },
      });

      scene2Video.style.display = "block";
      scene2Video.style.opacity = "0";
      scene2Video.loop = false;
      scene2Video.currentTime = 0;
      scene2Video.playbackRate = 0.7;

      scene2Video.play().then(() => {
        gsap.to(scene2Video, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      });

      scene2Video.onended = handleScene2End;
      setCurrentScene(2);
    }
  };

  const handleScene2End = () => {
    const blinkOverlay = blinkOverlayRef.current;
    const scene2Video = scene2VideoRef.current;

    if (blinkOverlay) {
      gsap.to(blinkOverlay, {
        opacity: 1,
        duration: 0.15,
        ease: "power2.out",
        onComplete: () => {
          if (scene2Video) {
            scene2Video.style.display = "none";
          }
          gsap.to(blinkOverlay, {
            opacity: 0,
            duration: 0.15,
            ease: "power2.in",
            delay: 0.1,
            onComplete: () => {
              setShowBook(true);
            },
          });
        },
      });
    } else {
      if (scene2Video) {
        scene2Video.style.display = "none";
      }
      setShowBook(true);
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
      <video
        ref={scene2VideoRef}
        className="home-background"
        src={scene2Video}
        muted
        playsInline
        preload="auto"
        style={{ display: "none", opacity: 0 }}
      />
      <div
        ref={blinkOverlayRef}
        className="home-blink-overlay"
        style={{ opacity: 0 }}
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
      {showPlatformAssistant && (
        <PlatformAssistant
          sections={platformAssistantSections}
          onComplete={handlePlatformAssistantComplete}
        />
      )}
      {showBook && <Book onQuit={() => setShowBook(false)} />}
    </div>
  );
};

export default Home;
