import { useState, useEffect } from 'react';
import { resultState } from '../constants';
import AgGirdReact from '../Reusable/AgGrid';
import { examListDef } from '../TableDef/examListDef';
import { useNavigate } from "react-router-dom";
import './resultTable.scss';

const ExamTableList = () => {
      const navigate = useNavigate();
      const [highestScore, setHighestScore] = useState([]);
      const [showScore, setShowScore] = useState(false);
      const [rowData, setRowData] = useState([]);
      const [questions, setQuestions] = useState()
      const [result, setResult] = useState([])
      useEffect(() => {
            getResult();
      }, [])

      const getResult = async () => {
            const result = await fetch('http://localhost:8000/result').then((res) => {
                  return res.json();
            }).then((response) => {
                  console.log("test==it", response)
                   setResult(response)
                  const resultData = response.map((item) => {
                        const scoreData = {
                              name: item.name,
                              email: item.email,
                              dob: item.dob,
                              score: item.score,
                              correctAnswer: item.correctAns,
                              percentage: item.percentage,
                        }
                  const highestResult = [...highestScore, scoreData].sort((a, b) => b.score - a.score)
                  setHighestScore(highestResult);
                  const answerData = {
                        name: item.name,
                        totalquestions: questions,
                        totalcorrectanswers: item.correctAns,
                        percentage: item.percentage,

                  }
                  const ansDetails = [...rowData, answerData].sort((a, b) => b.score - a.score)
                  setRowData(ansDetails);
                  })
            }).catch((err) => {
                  console.log(err.message)
            })
      }
      const submit = () => {
            setResult(resultState);
            setShowScore(false);
            navigate('/');
      }

      return (
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
                              {result.map((data, i) => {
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

                  <div style={{ marginTop: '20px' }}>
                        <AgGirdReact rowData={result} columnDefs={examListDef} showGrid={true} />
                  </div>
                  <div>
                  <button  onClick={() => submit()}>Back Home</button>
            </div>
            </>

      )
}
export default ExamTableList;