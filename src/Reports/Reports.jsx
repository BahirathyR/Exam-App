import React,{useState} from 'react'
import { resultState } from '../constants';
import { useNavigate} from "react-router-dom";

export const Reports = ({ questions, result, setResult, setShowResult }) => {
      const navigate = useNavigate();
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [dob, setDob] = useState('');
      const [highestScore, setHighestScore] = useState([]);
      const [showScore, setShowScore] = useState(false);

      const handleSubmit = async() => {
            const scoreData = {
                  name,
                  email,
                  dob,
                  score: result.score,
                  correctAnswer: result.correctAns,
                  percentage: result.percentage,
                  questions:questions
            }
            const highestResult = [...highestScore, scoreData].sort((a, b) => b.score - a.score)
            setHighestScore(highestResult);
            setShowScore(true);
            alert("Data Saved Successfully")
            const resultData = await fetch('http://localhost:8000/result', {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify(scoreData )
            }).then((res) => {
                  return res.json();
            }).then((response) => {
                 console.log(response)
                  // window.location.reload();
            }).catch((err) => {
                  console.log(err)
            })
      }
      return (
        <>
        <div>
        <h2>Reports</h2>
        </div>
        <div className='result'>
                              <h3>Result</h3>
                              <p>Total Questions: <span>{questions}</span></p>
                              <p>Total score: <span>{result.score}</span></p>
                              <p>Percentage: <span>{result.percentage}</span></p>
                              <p>Correct Answer: <span>{result.correctAns}</span></p>
                              <p>wrong Answers: <span>{result.wrongAnswers}</span></p>

              </div>


            <>
                        <div>
                              <h3>Enter Your Details</h3>
                              <div className='row' >
                                    <div>
                                          <input placeholder='Enter your Name' value={name} onChange={(e) => setName(e.target.value)} />

                                          <input placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                              </div>

                              <div style={{ marginTop: '20px' }}>
                                    <input placeholder='Enter your DOB' value={dob} onChange={(e) => setDob(e.target.value)} />

                              </div>
                              <div>
                                    <button onClick={() => { handleSubmit(); navigate('/')}}>Submit</button>
                              </div>
                          </div>
                          </>
                  </>

  )
}
