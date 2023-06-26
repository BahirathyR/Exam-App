import { useState } from 'react';
import { resultState } from './constants';
import NameDetails from './NameDetails/NameDetails';
const Exam = ({ questions }) => {
      const [currentQuestion, setCurrentQuestion] = useState(0);
      const [ansIndx, setAnsIndx] = useState(null);
      const [answer, setAnswer] = useState(null);
      const [result, setResult] = useState(resultState);
      const [showResult, setShowResult] = useState(false);

      const { question, options, correctAns } = questions[currentQuestion];
      const handleAnswer = (ans, index) => {
            setAnsIndx(index);
            if (ans === correctAns) {
                  setAnswer(true);
            }
            else {
                  setAnswer(false);
            }

      }

      const handleNext = () => {
            setAnsIndx(null);
            setResult((prev) =>
                  answer ? {
                        ...prev,
                        score: prev.score + 5,
                        correctAns: prev.correctAns + 1,
                        percentage: (((prev.correctAns+1)/questions.length) * 100) + '%',
                  }
                        : {
                              ...prev,
                              wrongAnswers: prev.wrongAnswers + 1,
                        }
            );
            if (currentQuestion !== questions.length - 1) {
                  setCurrentQuestion((prev) => prev + 1);
            }
            else {
                  setCurrentQuestion(0);
                  setShowResult(true);
            }
      }
      return (
            <div className="exam-container">
                  {!showResult ? ( <>
                        <span className="active-question-no">{currentQuestion + 1}</span>
                        <span className="total-question">/{questions.length}</span>
                        <h2>{question}</h2>
                        <ul>
                              { options.map((ans, index) => (
                                          <li
                                                key={ans}
                                                onClick={() => handleAnswer(ans, index)}
                                                className={ansIndx === index ? 'selected-ans' : null}
                                          >

                                                {ans}

                                          </li>
                                    ))
                              }
                        </ul>
                        <div className='footer'>
                              <button onClick={() => handleNext()} disabled={ansIndx === null}>
                              {currentQuestion === questions.length -1 ? 'Finish' :'Next'}
                              </button>
                        </div>
                  </>) : <div className='result'>
                              <h3>Result</h3>
                              <p>Total Questions: <span>{questions.length}</span></p>
                              <p>Total score: <span>{result.score}</span></p>
                              <p>Percentage: <span>{result.percentage}</span></p>
                              <p>Correct Answer: <span>{result.correctAns}</span></p>
                              <p>wrong Answers: <span>{result.wrongAnswers}</span></p>

                              <NameDetails questions={questions.length} result={result} setResult={setResult} setShowResult={setShowResult} />
                  </div>}


            </div>
      )
}
export default Exam;