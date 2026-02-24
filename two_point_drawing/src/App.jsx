import React, { useState, useRef, useCallback } from 'react';
import './App.css';
import TwoPointDrawing from './components/TwoPointDrawing';
import { createRandomQuestion } from './engine/questionRegistry.js';
import { buildFeedback } from './engine/feedback/buildFeedback.js';

function App() {
  const drawingRef = useRef(null);
  const [currentQuestion, setCurrentQuestion] = useState(() => createRandomQuestion());
  const [feedback, setFeedback] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleSubmit = useCallback(() => {
    if (!drawingRef.current) return;
    const studentData = drawingRef.current.getStudentDrawingData();
    const result = currentQuestion.grade(studentData);

    setIsCorrect(result.isCorrect);

    if (result.isCorrect) {
      setFeedback(null);
    } else {
      const questions = buildFeedback(result, currentQuestion.typeId);
      setFeedback(questions);
    }
  }, [currentQuestion]);

  const handleNewQuestion = useCallback(() => {
    if (drawingRef.current) drawingRef.current.reset();
    setCurrentQuestion(createRandomQuestion());
    setFeedback(null);
    setIsCorrect(null);
  }, []);

  return (
    <div className="app-container">
      <main className="app-main">
        <div className="card">
          <h2 className="prompt-text">{currentQuestion.prompt}</h2>

          <div className="applet-wrapper">
            <TwoPointDrawing ref={drawingRef} />
          </div>

          <div className="toolbar">
            <button className="btn btn-submit" onClick={handleSubmit}>
              Submit
            </button>
            <button className="btn btn-new" onClick={handleNewQuestion}>
              New Question
            </button>
          </div>
        </div>

        {isCorrect !== null && (
          <div className={`feedback-card ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
            {isCorrect ? (
              <p className="feedback-text correct-text">Answer correct.</p>
            ) : (
              <>
                <p className="feedback-heading">Not quite — consider these questions:</p>
                <ul className="feedback-list">
                  {feedback && feedback.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
