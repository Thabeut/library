import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { Book } from "../../mocks/books";
import "./BookSelection.css";

interface BookSelectionProps {
  books: Book[];
  onBookSelect: (book: Book) => void;
}

const BookSelection: React.FC<BookSelectionProps> = ({
  books,
  onBookSelect,
}) => {
  const leftBooksRef = useRef<HTMLDivElement>(null);
  const rightBooksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const leftBooks = leftBooksRef.current;
    const rightBooks = rightBooksRef.current;

    if (leftBooks) {
      const children = leftBooks.children;
      gsap.set(children, { opacity: 0, x: -50, rotation: -5 });
      gsap.to(children, {
        opacity: 1,
        x: 0,
        rotation: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      });
    }

    if (rightBooks) {
      const children = rightBooks.children;
      gsap.set(children, { opacity: 0, x: 50, rotation: 5 });
      gsap.to(children, {
        opacity: 1,
        x: 0,
        rotation: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      });
    }
  }, []);

  const leftBooks = books.slice(0, 3);
  const rightBooks = books.slice(3, 6);

  return (
    <div className="book-selection-container">
      <div className="book-selection-left" ref={leftBooksRef}>
        {leftBooks.map((book) => (
          <div
            key={book.id}
            className="book-selection-card"
            onClick={() => onBookSelect(book)}
          >
            <div className="book-selection-info">
              <h3 className="book-selection-title">{book.title}</h3>
              <p className="book-selection-author">{book.author}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="book-selection-right" ref={rightBooksRef}>
        {rightBooks.map((book) => (
          <div
            key={book.id}
            className="book-selection-card"
            onClick={() => onBookSelect(book)}
          >
            <div className="book-selection-info">
              <h3 className="book-selection-title">{book.title}</h3>
              <p className="book-selection-author">{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSelection;
