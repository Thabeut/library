import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import HTMLFlipBook from "react-pageflip";
import Confetti from "react-confetti";
import "./Book.css";
import scene1Video from "../../assets/vids/scene1.mp4";

interface BookProps {
  onQuit?: () => void;
}

const Book: React.FC<BookProps> = ({ onQuit }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);

  const [quizAnswers, setQuizAnswers] = useState<{
    [key: string]: { selectedIndex: number | null; isCorrect: boolean | null };
  }>({
    quiz1: { selectedIndex: null, isCorrect: null },
    quiz2: { selectedIndex: null, isCorrect: null },
    quiz3: { selectedIndex: null, isCorrect: null },
  });

  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const correctAnswers: { [key: string]: number } = {
    quiz1: 1,
    quiz2: 1,
    quiz3: 1,
  };

  const handleQuizOptionClick = (
    e: React.MouseEvent<HTMLDivElement>,
    quizId: string,
    optionIndex: number
  ) => {
    e.stopPropagation();
    if (quizAnswers[quizId].selectedIndex !== null) {
      return;
    }

    const isCorrect = optionIndex === correctAnswers[quizId];
    setQuizAnswers((prev) => ({
      ...prev,
      [quizId]: { selectedIndex: optionIndex, isCorrect },
    }));

    if (isCorrect) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }
  };

  const getOptionClassName = (quizId: string, optionIndex: number) => {
    const answer = quizAnswers[quizId];
    if (answer.selectedIndex === null) {
      return "book-quiz-option";
    }
    const correctIndex = correctAnswers[quizId];
    if (optionIndex === correctIndex) {
      return "book-quiz-option book-quiz-option-correct";
    }
    return "book-quiz-option book-quiz-option-incorrect";
  };

  useEffect(() => {
    const container = containerRef.current;
    const book = bookRef.current;

    if (container && book) {
      gsap.set(container, { opacity: 0 });
      gsap.set(book, { scale: 0.8, opacity: 0 });

      gsap.to(container, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.to(book, {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      });
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleQuit = () => {
    onQuit?.();
  };

  return (
    <div ref={containerRef} className="book-container">
      <button className="book-quit-btn" onClick={handleQuit}>
        ✕ Quit
      </button>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}
      <div ref={bookRef} className="book-wrapper">
        {/* @ts-expect-error: HTMLFlipBook does not have proper TypeScript types */}
        <HTMLFlipBook
          width={600}
          height={700}
          disableFlipByClick
          className="book-flip html-book"
        >
          <div className="book-page page">
            <div className="book-content page-content">
              <h2 className="page-header">Today's Tip</h2>
              <h2>Learning Through Practice</h2>
              <div className="page-text">
                <p>
                  The most effective way to learn is through consistent practice
                  and application. Each lesson in this library is designed to
                  build upon previous knowledge.
                </p>
              </div>
              <div className="book-tip-box">
                <p className="book-tip-text">
                  <strong>Tip:</strong> Review concepts regularly to reinforce
                  your understanding.
                </p>
              </div>
              <div className="page-footer">1</div>
            </div>
          </div>
          <div className="book-page page">
            <div className="book-content page-content">
              <h2 className="page-header">Interactive Quiz</h2>
              <h2>Test Your Knowledge</h2>
              <div className="book-quiz-box">
                <p className="book-quiz-question">
                  What is the best way to retain new information?
                </p>
                <div className="book-quiz-options">
                  <div
                    className={getOptionClassName("quiz1", 0)}
                    onClick={(e) => handleQuizOptionClick(e, "quiz1", 0)}
                  >
                    A) Read once
                  </div>
                  <div
                    className={getOptionClassName("quiz1", 1)}
                    onClick={(e) => handleQuizOptionClick(e, "quiz1", 1)}
                  >
                    B) Practice regularly
                  </div>
                  <div
                    className={getOptionClassName("quiz1", 2)}
                    onClick={(e) => handleQuizOptionClick(e, "quiz1", 2)}
                  >
                    C) Memorize only
                  </div>
                </div>
              </div>
              <div className="page-footer">2</div>
            </div>
          </div>
          <div className="book-page page">
            <div className="book-content page-content">
              <h2 className="page-header">Fun Fact</h2>
              <h2>Did You Know?</h2>
              <div className="page-text">
                <p>
                  The human brain can process information faster than the
                  fastest computer. However, retention requires repetition and
                  active engagement with the material.
                </p>
              </div>
              <div className="book-tip-box">
                <p className="book-tip-text">
                  <strong>Fact:</strong> Studies show that spaced repetition
                  increases long-term retention by up to 200%.
                </p>
              </div>
              <div className="page-footer">3</div>
            </div>
          </div>
          <div className="book-page page">
            <div className="book-content page-content">
              <h2 className="page-header">Interactive Quiz</h2>
              <h2>Another Challenge</h2>
              <div className="book-quiz-box">
                <p className="book-quiz-question">
                  How often should you review learned material?
                </p>
                <div className="book-quiz-options">
                  <div
                    className={getOptionClassName("quiz2", 0)}
                    onClick={(e) => handleQuizOptionClick(e, "quiz2", 0)}
                  >
                    A) Once a month
                  </div>
                  <div
                    className={getOptionClassName("quiz2", 1)}
                    onClick={(e) => handleQuizOptionClick(e, "quiz2", 1)}
                  >
                    B) Every few days
                  </div>
                  <div
                    className={getOptionClassName("quiz2", 2)}
                    onClick={(e) => handleQuizOptionClick(e, "quiz2", 2)}
                  >
                    C) Only when needed
                  </div>
                </div>
              </div>
              <div className="page-footer">4</div>
            </div>
          </div>
          <div className="book-page page">
            <div className="book-content page-content">
              <h2 className="page-header">Video Lesson</h2>
              <h2>Watch and Learn</h2>
              <div className="book-video-container">
                <video
                  className="book-video"
                  src={scene1Video}
                  controls
                  playsInline
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="book-video-description">
                Watch this video to enhance your understanding of the concepts
                we've covered.
              </p>
              <div className="page-footer">5</div>
            </div>
          </div>
          <div className="book-page page">
            <div className="book-content page-content">
              <h2 className="page-header">Final Quiz</h2>
              <h2>Test Your Mastery</h2>
              <div className="book-quiz-box">
                <p className="book-quiz-question">
                  Which method is most effective for long-term learning?
                </p>
                <div className="book-quiz-options">
                  <div
                    className={getOptionClassName("quiz3", 0)}
                    onClick={(e) => handleQuizOptionClick(e, "quiz3", 0)}
                  >
                    A) Cramming the night before
                  </div>
                  <div
                    className={getOptionClassName("quiz3", 1)}
                    onClick={(e) => handleQuizOptionClick(e, "quiz3", 1)}
                  >
                    B) Spaced repetition over time
                  </div>
                  <div
                    className={getOptionClassName("quiz3", 2)}
                    onClick={(e) => handleQuizOptionClick(e, "quiz3", 2)}
                  >
                    C) Reading material only once
                  </div>
                </div>
              </div>

              <div className="page-footer">6</div>
            </div>
          </div>
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default Book;
