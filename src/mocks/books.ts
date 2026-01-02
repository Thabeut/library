export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface BookPage {
  type: "quote" | "lesson" | "tip" | "funFact" | "quiz" | "video";
  content: {
    text?: string;
    author?: string;
    title?: string;
    videoUrl?: string;
    questions?: QuizQuestion[];
  };
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage?: string;
  pages: BookPage[];
}

export const books: Book[] = [
  {
    id: "1",
    title: "The Art of Learning",
    author: "Master Scholar",
    description: "Discover the secrets of effective learning and knowledge retention.",
    pages: [
      {
        type: "quote",
        content: {
          text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
          author: "Brian Herbert",
        },
      },
      {
        type: "lesson",
        content: {
          title: "Active Learning",
          text: "Active learning involves engaging with material through practice, discussion, and application. Unlike passive reading, active learning requires you to think critically, ask questions, and connect new information to what you already know.",
        },
      },
      {
        type: "tip",
        content: {
          title: "Spaced Repetition",
          text: "Review material at increasing intervals to strengthen memory. Start with daily reviews, then space them out to weekly, monthly, and beyond.",
        },
      },
      {
        type: "quiz",
        content: {
          questions: [
            {
              question: "What is the most effective learning method?",
              options: ["Passive reading", "Active practice", "Memorization only"],
              correctAnswer: 1,
            },
            {
              question: "How often should you review learned material?",
              options: ["Once", "Every few days", "Never"],
              correctAnswer: 1,
            },
          ],
        },
      },
      {
        type: "funFact",
        content: {
          title: "Did You Know?",
          text: "The brain can process information faster than the fastest computer, but retention requires repetition and active engagement.",
        },
      },
      {
        type: "video",
        content: {
          title: "Learning Techniques",
          videoUrl: "/vids/scene1.mp4",
        },
      },
    ],
  },
  {
    id: "2",
    title: "Wisdom of the Ages",
    author: "Ancient Sage",
    description: "Timeless wisdom passed down through generations.",
    pages: [
      {
        type: "quote",
        content: {
          text: "Knowledge is power, but wisdom is the ability to use that power effectively.",
          author: "Unknown",
        },
      },
      {
        type: "lesson",
        content: {
          title: "The Value of Experience",
          text: "Experience is the best teacher. Every mistake is a lesson, and every success is a stepping stone. Learn from both to grow continuously.",
        },
      },
      {
        type: "funFact",
        content: {
          title: "Ancient Libraries",
          text: "The Library of Alexandria was one of the largest and most significant libraries of the ancient world, containing works from many civilizations.",
        },
      },
      {
        type: "quiz",
        content: {
          questions: [
            {
              question: "What makes wisdom different from knowledge?",
              options: ["Wisdom is older", "Wisdom is the application of knowledge", "They are the same"],
              correctAnswer: 1,
            },
          ],
        },
      },
      {
        type: "tip",
        content: {
          title: "Learn from History",
          text: "Studying history helps us understand patterns, avoid past mistakes, and build upon the achievements of those who came before us.",
        },
      },
    ],
  },
  {
    id: "3",
    title: "Creative Thinking",
    author: "Innovation Expert",
    description: "Unlock your creative potential and think outside the box.",
    pages: [
      {
        type: "quote",
        content: {
          text: "Creativity is intelligence having fun.",
          author: "Albert Einstein",
        },
      },
      {
        type: "lesson",
        content: {
          title: "Divergent Thinking",
          text: "Divergent thinking involves generating multiple solutions to a problem. Practice brainstorming without judgment to expand your creative horizons.",
        },
      },
      {
        type: "tip",
        content: {
          title: "Break Patterns",
          text: "Challenge assumptions and break routine patterns. Sometimes the best solutions come from questioning what everyone takes for granted.",
        },
      },
      {
        type: "quiz",
        content: {
          questions: [
            {
              question: "What is divergent thinking?",
              options: ["Focusing on one solution", "Generating multiple solutions", "Following rules strictly"],
              correctAnswer: 1,
            },
            {
              question: "How can you enhance creativity?",
              options: ["Stick to routines", "Break patterns and question assumptions", "Avoid new experiences"],
              correctAnswer: 1,
            },
          ],
        },
      },
      {
        type: "funFact",
        content: {
          title: "Creative Breakthroughs",
          text: "Many breakthrough ideas come during moments of relaxation or when the mind is engaged in unrelated activities.",
        },
      },
    ],
  },
  {
    id: "4",
    title: "Mindful Living",
    author: "Zen Master",
    description: "Find peace and clarity through mindful practices.",
    pages: [
      {
        type: "quote",
        content: {
          text: "The present moment is the only time over which we have dominion.",
          author: "Thích Nhất Hạnh",
        },
      },
      {
        type: "lesson",
        content: {
          title: "Present Moment Awareness",
          text: "Mindfulness is the practice of being fully present in the moment, without judgment. It helps reduce stress and improve focus.",
        },
      },
      {
        type: "tip",
        content: {
          title: "Daily Meditation",
          text: "Start with just 5 minutes of daily meditation. Focus on your breath and gently return your attention when your mind wanders.",
        },
      },
      {
        type: "funFact",
        content: {
          title: "Mind-Body Connection",
          text: "Studies show that regular meditation can physically change brain structure, increasing gray matter in areas associated with memory and emotional regulation.",
        },
      },
      {
        type: "quiz",
        content: {
          questions: [
            {
              question: "What is mindfulness?",
              options: ["Thinking about the future", "Being fully present in the moment", "Avoiding all thoughts"],
              correctAnswer: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "5",
    title: "Scientific Method",
    author: "Research Scholar",
    description: "Master the principles of scientific inquiry and critical thinking.",
    pages: [
      {
        type: "quote",
        content: {
          text: "The important thing is not to stop questioning.",
          author: "Albert Einstein",
        },
      },
      {
        type: "lesson",
        content: {
          title: "Hypothesis Testing",
          text: "The scientific method involves observation, hypothesis formation, experimentation, and analysis. Always be ready to revise your theories based on evidence.",
        },
      },
      {
        type: "tip",
        content: {
          title: "Critical Thinking",
          text: "Question sources, evaluate evidence, and consider alternative explanations. Critical thinking is essential for distinguishing fact from opinion.",
        },
      },
      {
        type: "quiz",
        content: {
          questions: [
            {
              question: "What is the first step in the scientific method?",
              options: ["Form a hypothesis", "Make observations", "Conduct experiments"],
              correctAnswer: 1,
            },
            {
              question: "What should you do if evidence contradicts your hypothesis?",
              options: ["Ignore the evidence", "Revise your theory", "Give up"],
              correctAnswer: 1,
            },
          ],
        },
      },
      {
        type: "funFact",
        content: {
          title: "Peer Review",
          text: "Scientific knowledge advances through peer review, where experts evaluate research before publication to ensure quality and validity.",
        },
      },
    ],
  },
  {
    id: "6",
    title: "Communication Mastery",
    author: "Orator Pro",
    description: "Learn to express ideas clearly and connect with others effectively.",
    pages: [
      {
        type: "quote",
        content: {
          text: "The single biggest problem in communication is the illusion that it has taken place.",
          author: "George Bernard Shaw",
        },
      },
      {
        type: "lesson",
        content: {
          title: "Active Listening",
          text: "Effective communication requires active listening. Pay full attention, ask clarifying questions, and reflect back what you've heard to ensure understanding.",
        },
      },
      {
        type: "tip",
        content: {
          title: "Clear Expression",
          text: "Use simple, clear language. Organize your thoughts before speaking, and tailor your message to your audience's level of understanding.",
        },
      },
      {
        type: "funFact",
        content: {
          title: "Non-Verbal Communication",
          text: "Research shows that up to 93% of communication is non-verbal, including body language, tone of voice, and facial expressions.",
        },
      },
      {
        type: "quiz",
        content: {
          questions: [
            {
              question: "What is active listening?",
              options: ["Hearing words", "Paying full attention and engaging with the speaker", "Talking more"],
              correctAnswer: 1,
            },
            {
              question: "What percentage of communication is non-verbal?",
              options: ["30%", "93%", "50%"],
              correctAnswer: 1,
            },
          ],
        },
      },
    ],
  },
];

