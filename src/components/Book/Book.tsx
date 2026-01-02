import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import HTMLFlipBook from "react-pageflip";
import Confetti from "react-confetti";
import type { Book as BookType, BookPage } from "../../mocks/books";
import "./Book.css";
import scene1Video from "../../assets/vids/scene1.mp4";

interface BookProps {
  bookData?: BookType | null;
  onQuit?: () => void;
}

const Book: React.FC<BookProps> = ({ bookData, onQuit }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);

  const [quizAnswers, setQuizAnswers] = useState<{
    [key: string]: { selectedIndex: number | null; isCorrect: boolean | null };
  }>({});

  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    if (bookData) {
      const initialAnswers: {
        [key: string]: {
          selectedIndex: number | null;
          isCorrect: boolean | null;
        };
      } = {};
      bookData.pages.forEach((page, index) => {
        if (page.type === "quiz" && page.content.questions) {
          page.content.questions.forEach((_, qIndex) => {
            initialAnswers[`quiz-${index}-${qIndex}`] = {
              selectedIndex: null,
              isCorrect: null,
            };
          });
        }
      });
      setQuizAnswers(initialAnswers);
    } else {
      setQuizAnswers({
        quiz1: { selectedIndex: null, isCorrect: null },
        quiz2: { selectedIndex: null, isCorrect: null },
        quiz3: { selectedIndex: null, isCorrect: null },
      });
    }
  }, [bookData]);

  const handleQuizOptionClick = (
    e: React.MouseEvent<HTMLDivElement>,
    quizId: string,
    optionIndex: number,
    correctAnswer: number
  ) => {
    e.stopPropagation();
    if (quizAnswers[quizId]?.selectedIndex !== null) {
      return;
    }

    const isCorrect = optionIndex === correctAnswer;
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

  const getOptionClassName = (
    quizId: string,
    optionIndex: number,
    correctAnswer: number
  ) => {
    const answer = quizAnswers[quizId];
    if (!answer || answer.selectedIndex === null) {
      return "book-quiz-option";
    }
    if (optionIndex === correctAnswer) {
      return "book-quiz-option book-quiz-option-correct";
    }
    return "book-quiz-option book-quiz-option-incorrect";
  };

  const renderQuotePage = (page: BookPage, pageNumber: number) => (
    <div key={pageNumber} className="book-page page">
      <div className="book-content page-content">
        <h2 className="page-header">Quote</h2>
        <div className="book-quote-box">
          <p className="book-quote-text">"{page.content.text}"</p>
          {page.content.author && (
            <p className="book-quote-author">— {page.content.author}</p>
          )}
        </div>
        <div className="page-footer">{pageNumber}</div>
      </div>
    </div>
  );

  const renderLessonPage = (page: BookPage, pageNumber: number) => (
    <div key={pageNumber} className="book-page page">
      <div className="book-content page-content">
        <h2 className="page-header">Lesson</h2>
        {page.content.title && <h2>{page.content.title}</h2>}
        <div className="page-text">
          <p>{page.content.text}</p>
        </div>
        <div className="page-footer">{pageNumber}</div>
      </div>
    </div>
  );

  const renderTipPage = (page: BookPage, pageNumber: number) => (
    <div key={pageNumber} className="book-page page">
      <div className="book-content page-content">
        <h2 className="page-header">Tip</h2>
        {page.content.title && <h2>{page.content.title}</h2>}
        <div className="book-tip-box">
          <p className="book-tip-text">
            <strong>Tip:</strong> {page.content.text}
          </p>
        </div>
        <div className="page-footer">{pageNumber}</div>
      </div>
    </div>
  );

  const renderFunFactPage = (page: BookPage, pageNumber: number) => (
    <div key={pageNumber} className="book-page page">
      <div className="book-content page-content">
        <h2 className="page-header">Fun Fact</h2>
        {page.content.title && <h2>{page.content.title}</h2>}
        <div className="page-text">
          <p>{page.content.text}</p>
        </div>
        <div className="book-tip-box">
          <p className="book-tip-text">
            <strong>Fact:</strong> {page.content.text}
          </p>
        </div>
        <div className="page-footer">{pageNumber}</div>
      </div>
    </div>
  );

  const renderQuizPage = (
    page: BookPage,
    startPageNumber: number,
    pageIndex: number
  ) => {
    const questions = page.content.questions || [];
    return questions.map((question, qIndex) => {
      const quizId = `quiz-${pageIndex}-${qIndex}`;
      const pageNumber = startPageNumber + qIndex;
      return (
        <div key={`${pageNumber}-${qIndex}`} className="book-page page">
          <div className="book-content page-content">
            <h2 className="page-header">Interactive Quiz</h2>
            <h2>Test Your Knowledge</h2>
            <div className="book-quiz-box">
              <p className="book-quiz-question">{question.question}</p>
              <div className="book-quiz-options">
                {question.options.map((option, optIndex) => (
                  <div
                    key={optIndex}
                    className={getOptionClassName(
                      quizId,
                      optIndex,
                      question.correctAnswer
                    )}
                    onClick={(e) =>
                      handleQuizOptionClick(
                        e,
                        quizId,
                        optIndex,
                        question.correctAnswer
                      )
                    }
                  >
                    {String.fromCharCode(65 + optIndex)}) {option}
                  </div>
                ))}
              </div>
            </div>
            <div className="page-footer">{pageNumber}</div>
          </div>
        </div>
      );
    });
  };

  const renderVideoPage = (page: BookPage, pageNumber: number) => (
    <div key={pageNumber} className="book-page page">
      <div className="book-content page-content">
        <h2 className="page-header">Video Lesson</h2>
        {page.content.title && <h2>{page.content.title}</h2>}
        <div className="book-video-container">
          <video
            className="book-video"
            src={page.content.videoUrl || scene1Video}
            controls
            playsInline
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="book-video-description">
          Watch this video to enhance your understanding.
        </p>
        <div className="page-footer">{pageNumber}</div>
      </div>
    </div>
  );

  const renderPage = (
    page: BookPage,
    pageIndex: number,
    currentPageOffset: number
  ) => {
    switch (page.type) {
      case "quote":
        return renderQuotePage(page, currentPageOffset);
      case "lesson":
        return renderLessonPage(page, currentPageOffset);
      case "tip":
        return renderTipPage(page, currentPageOffset);
      case "funFact":
        return renderFunFactPage(page, currentPageOffset);
      case "quiz":
        return renderQuizPage(page, currentPageOffset, pageIndex);
      case "video":
        return renderVideoPage(page, currentPageOffset);
      default:
        return null;
    }
  };

  const defaultPages = [
    {
      type: "tip" as const,
      content: {
        title: "Learning Through Practice",
        text: "The most effective way to learn is through consistent practice and application. Each lesson in this library is designed to build upon previous knowledge.",
      },
    },
    {
      type: "quiz" as const,
      content: {
        questions: [
          {
            question: "What is the best way to retain new information?",
            options: ["Read once", "Practice regularly", "Memorize only"],
            correctAnswer: 1,
          },
        ],
      },
    },
    {
      type: "funFact" as const,
      content: {
        title: "Did You Know?",
        text: "The human brain can process information faster than the fastest computer. However, retention requires repetition and active engagement with the material.",
      },
    },
    {
      type: "quiz" as const,
      content: {
        questions: [
          {
            question: "How often should you review learned material?",
            options: ["Once a month", "Every few days", "Only when needed"],
            correctAnswer: 1,
          },
        ],
      },
    },
    {
      type: "video" as const,
      content: {
        title: "Watch and Learn",
        videoUrl: scene1Video,
      },
    },
    {
      type: "quiz" as const,
      content: {
        questions: [
          {
            question: "Which method is most effective for long-term learning?",
            options: [
              "Cramming the night before",
              "Spaced repetition over time",
              "Reading material only once",
            ],
            correctAnswer: 1,
          },
        ],
      },
    },
  ];

  const pagesToRender = bookData?.pages || defaultPages;

  let pageCounter = 1;
  const renderedPages = pagesToRender.flatMap((page, index) => {
    const currentPageNumber = pageCounter;
    if (page.type === "quiz" && page.content.questions) {
      const questionCount = page.content.questions.length;
      pageCounter += questionCount;
      return renderPage(page, index, currentPageNumber);
    } else {
      pageCounter += 1;
      return renderPage(page, index, currentPageNumber);
    }
  });

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
          {renderedPages}
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default Book;
