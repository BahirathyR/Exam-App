import { useState, useEffect } from 'react';
import { resultState } from '../constants';
import AgGirdReact from '../Reusable/AgGrid';
import { examListDef } from '../TableDef/examListDef';
const NameDetails = ({ questions, result, setResult, setShowResult }) => {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [dob, setDob] = useState('');
      const [highestScore, setHighestScore] = useState([]);
      const [showScore, setShowScore] = useState(false);
      const [rowData, setRowData] = useState([]);
      const [showGrid, setShowGrid] = useState(true)
      useEffect(() => {
            setHighestScore(JSON.parse(localStorage.getItem('highScrore')) || []);
            setRowData(JSON.parse(localStorage.getItem('ansData')) || [])
      }, [])
      const submit = () => {
            setResult(resultState);
            setShowResult(false);
            setShowScore(false);

      }

      const handleSubmit = () => {
            const scoreData = {
                  name,
                  email,
                  dob,
                  score: result.score,
                  correctAnswer: result.correctAns,
                  percentage: result.percentage,
            }
            const highestResult = [...highestScore, scoreData].sort((a, b) => b.score - a.score)
            setHighestScore(highestResult);
            setShowScore(true);
            localStorage.setItem('highScrore', JSON.stringify(highestResult));
            alert("Data Saved Successfully")
            const answerData = {
                  name: name,
                  totalquestions: questions,
                  totalcorrectanswers: result.correctAns,
                  percentage: result.percentage,

            }
            const ansDetails = [...rowData, answerData].sort((a, b) => b.score - a.score)
            localStorage.setItem('ansData', JSON.stringify(ansDetails));
            setRowData(ansDetails);
      }
      return (
            <>
                  {!showScore ? (
                        <>
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
                                    <button onClick={() => handleSubmit()}>Submit</button>
                              </div>
                        </>
                  ) : (
                        <>
                              <table>
                                    <thead>
                                          <tr>
                                                <th>Rank</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>DoB</th>
                                                <th>correctAnswer</th>
                                                <th>Percentage</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {highestScore.map((data, i) => {
                                                return (
                                                      <tr>
                                                            <td>{(i + 1)}</td>
                                                            <td>{data.name}</td>
                                                            <td>{data.email}</td>
                                                            <td>{data.dob}</td>
                                                            <td>{data.correctAnswer}</td>
                                                            <td>{data.percentage}</td>
                                                      </tr>
                                                )
                                          })
                                          }
                                    </tbody>
                              </table>
                              <div>
                                    <button onClick={() => submit()}>Try Again</button>
                              </div>
                              <div style={{ marginTop: '20px' }}>
                                    <AgGirdReact rowData={rowData} columnDefs={examListDef} showGrid={true} />
                              </div>

                        </>

                  )
                  }
            </>
      )
}
export default NameDetails;