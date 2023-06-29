import { useState, useEffect } from 'react';
import { Reports } from '../Reports/Reports';
import { resultState } from '../constants';
const Exam = () => {
      const [questions, setQuestions] = useState([]);
      const [question, setQuestion] = useState([]);
      const [options, setOptions] = useState([]);
      const [correctAns, setCorrectAns] = useState();
      const [currentQuestion, setCurrentQuestion] = useState(0);
      const [ansIndx, setAnsIndx] = useState(null);
      const [answer, setAnswer] = useState(null);
      const [result, setResult] = useState(resultState);
      const [showResult, setShowResult] = useState(false);
      const [showQues, setShowQues] = useState(false);
      const values = {
            result: result,
      }
      useEffect(() => {
            getExamQuestions();
      }, [])
      const getExamQuestions = async () => {
            const result = await fetch('http://localhost:8000/examQuestions').then((res) => {
                  return res.json();
            }).then((response) => {
                  setQuestions(response)
                  const ques = response.map((item) => { return item.question })
                  setQuestion(ques)
                  const options = response.map((item) => { return item.options })
                  setOptions(options)
                  const currentAns = response.map((item) => { return item.correctAns })
                  setCorrectAns(currentAns)
            }).catch((err) => {
                  console.log(err.message)
            })
      }

      const handleAnswer = (ans, index) => {
            setAnsIndx(index);
            if (ans === correctAns[currentQuestion]) {
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
                        percentage: (((prev.correctAns + 1) / questions.length) * 100) + '%',
                        questions:questions.length
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
            const result = fetch('http://localhost:8000/reports', {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify(values)
            }).then((res) => {
                  return res.json();
            }).then((response) => {
                  console.log(response);
            }).catch((err) => {
                  console.log(err)
            })
      }
      return (
            <div className="exam-container">
                  {!showQues &&
                        <button onClick={() => {
                              setShowQues(true);
                        }}>Start Exam</button>
                  }
                  {!showResult && showQues ? (<>
                        <span className="active-question-no">{currentQuestion + 1}</span>
                        <span className="total-question">/{questions.length}</span>
                        <h2>{question[currentQuestion]}</h2>
                        <ul>
                              {options[currentQuestion].map((ans, index) => (
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
                              <button onClick={() => { handleNext(); setShowQues(true); }} disabled={ansIndx === null}>
                                    {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                              </button>
                        </div>
                  </>)
                        : (
                        <>
                              {showQues &&
                                    <Reports questions={questions.length} result={result} setResult={setResult} setShowResult={setShowResult} />
                              }
                        </>
                  )
                  }

            </div>
      );
}
export default Exam;