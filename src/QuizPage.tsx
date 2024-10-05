import React, { useState } from 'react';
import './QuizPage.css'; // Assuming you have a separate CSS file

// Image URLs for waste-related images
const images = {
  bottle: '/images/bottle.png',
  banana: '/images/banana.png',
  can: '/images/can.png',
  battery: '/images/battery.png',
  plasticBag: '/images/plasticbag.png',
};

// Array of quiz questions with difficulty levels
const quizQuestions = [
  {
    question: 'Which of these items should go into the green bin?',
    options: ['Plastic bags', 'Aluminum cans', 'Food waste', 'Used tissues'],
    correctAnswer: 'Food waste',
    difficulty: 'easy',
  },
  {
    question: 'Which of these items should go into the recycling bin?',
    options: ['Plastic bags', 'Aluminum cans', 'Food waste', 'Used tissues'],
    correctAnswer: 'Aluminum cans',
    difficulty: 'easy',
  },
  {
    question: 'What color bin is commonly used for recycling paper and cardboard?',
    options: ['Blue', 'Red', 'Yellow', 'Green'],
    correctAnswer: 'Yellow',
    difficulty: 'medium',
  },
  {
    question: 'What is the main reason we are encouraged to reduce the use of plastic?',
    options: ['It’s expensive to make', 'It releases harmful chemicals when used', 'It takes hundreds of years to decompose', 'It makes items more expensive'],
    correctAnswer: 'It takes hundreds of years to decompose',
    difficulty: 'medium',
  },
  {
    question: 'What is the purpose of a landfill?',
    options: ['To burn waste', 'To bury waste', 'To recycle waste', 'To clean waste'],
    correctAnswer: 'To bury waste',
    difficulty: 'medium',
  },
  {
    question: 'Which waste management method involves converting waste into energy?',
    options: ['Recycling', 'Composting', 'Waste-to-energy (WTE)', 'Landfilling'],
    correctAnswer: 'Waste-to-energy (WTE)',
    difficulty: 'hard',
  },
  {
    question: 'How long does it take for a plastic bottle to decompose in a landfill?',
    options: ['10 years', '100 years', '450 years', '1,000 years'],
    correctAnswer: '450 years',
    difficulty: 'hard',
  },
  {
    question: 'Which of these is a major environmental risk of improper waste disposal?',
    options: ['Ozone depletion', 'Water pollution', 'Desertification', 'Acid rain'],
    correctAnswer: 'Water pollution',
    difficulty: 'hard',
  },
];

// Function to determine the text color based on difficulty
const getDifficultyStyle = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return { color: 'green' };
    case 'medium':
      return { color: 'orange' };
    case 'hard':
      return { color: 'red' };
    default:
      return {};
  }
};

// Function to return the difficulty label
const getDifficultyLabel = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return 'Easy';
    case 'medium':
      return 'Medium';
    case 'hard':
      return 'Hard';
    default:
      return '';
  }
};

// Function to give feedback based on the user's score
const getFeedbackMessage = (score: number, totalQuestions: number) => {
  const percentage = (score / totalQuestions) * 100;

  if (percentage === 100) {
    return 'Perfect! You know your waste types like a pro!';
  } else if (percentage >= 70) {
    return 'Great job! You have a solid understanding of waste disposal.';
  } else if (percentage >= 40) {
    return 'Not bad! But you can improve your waste disposal knowledge.';
  } else {
    return 'Oops! Looks like you need to brush up on waste recycling.';
  }
};

const QuizPage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (selectedOption: string) => {
    if (selectedOption === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResults(true);
    }
  };

  const totalQuestions = quizQuestions.length;
  const feedbackMessage = getFeedbackMessage(score, totalQuestions);

  return (
    <div className="quiz-page">
      {/* Floating waste-related images */}
      <img src={images.bottle} alt="Bottle" className="floating-image bottle" />
      <img src={images.banana} alt="Banana" className="floating-image banana" />
      <img src={images.can} alt="Can" className="floating-image can" />
      <img src={images.battery} alt="Battery" className="floating-image battery" />
      <img src={images.plasticBag} alt="Plastic Bag" className="floating-image plasticBag" />

      <div className="quiz-container">
        <h1>Waste Recycling Quiz</h1>
        {showResults ? (
          <div className="results">
            <h2>Quiz Completed!</h2>
            <p>Your Score: {score} / {totalQuestions}</p>
            <p className="feedback-message">{feedbackMessage}</p>
          </div>
        ) : (
          <div className="quiz-card">
            <h2>{quizQuestions[currentQuestion].question}</h2>
            <p className="difficulty-label" style={getDifficultyStyle(quizQuestions[currentQuestion].difficulty)}>
              Difficulty: {getDifficultyLabel(quizQuestions[currentQuestion].difficulty)}
            </p>
            <div className="options">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className="option-btn"
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="progress">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
