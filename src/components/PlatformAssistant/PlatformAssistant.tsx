import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./PlatformAssistant.css";

export interface Section {
  text: string;
  onNext?: () => void;
}

interface PlatformAssistantProps {
  sections: Section[];
  onComplete?: () => void;
}

const PlatformAssistant: React.FC<PlatformAssistantProps> = ({
  sections,
  onComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (container && content) {
      gsap.set(container, { opacity: 0 });
      gsap.set(content, { scale: 0.9, opacity: 0 });

      gsap.to(container, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(content, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.2,
      });
    }

    if (image) {
      const bounceAnimation = gsap.to(image, {
        y: -15,
        duration: 1.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

      return () => {
        bounceAnimation.kill();
      };
    }
  }, []);

  useEffect(() => {
    const text = textRef.current;
    if (text) {
      gsap.fromTo(
        text,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [currentSection]);

  const handleNext = () => {
    const section = sections[currentSection];

    if (section.onNext) {
      section.onNext();
    }

    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      const container = containerRef.current;
      const content = contentRef.current;

      if (container && content) {
        gsap.to(content, {
          scale: 0.9,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
        });

        gsap.to(container, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          delay: 0.2,
          onComplete: () => {
            if (onComplete) {
              onComplete();
            }
          },
        });
      } else {
        if (onComplete) {
          onComplete();
        }
      }
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <div ref={containerRef} className="platform-assistant">
      <div className="platform-assistant-overlay"></div>
      <div ref={contentRef} className="platform-assistant-content">
        <div className="platform-assistant-left">
          <div ref={imageRef} className="platform-assistant-image">
            {/* Image placeholder - will be replaced with actual image later */}
          </div>
          <div className="platform-assistant-label">LIBRARY GUIDE</div>
        </div>
        <div className="platform-assistant-right">
          <div className="platform-assistant-text">
            <p ref={textRef}>{sections[currentSection]?.text || ""}</p>
          </div>
          <div className="platform-assistant-navigation">
            <button
              className="platform-assistant-nav-btn"
              disabled={currentSection === 0}
              onClick={handlePrev}
            >
              ←
            </button>
            <button
              className="platform-assistant-nav-btn platform-assistant-nav-btn-active"
              onClick={handleNext}
            >
              {currentSection < sections.length - 1 ? "→" : "✓"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformAssistant;
