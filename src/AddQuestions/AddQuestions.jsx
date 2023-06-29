import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './questionStyles.scss';

export const AddQuestions = () => {
      const navigate = useNavigate();

      const [values, setValues] = useState({
            id: '',
            question: "",
            options: [],
            type: 'MCQS',
            correctAns: ''
      });
      const handleInputChange = (event) => {
            event.preventDefault();
            const { name, value } = event.target;
            setValues((values) => ({
                  ...values,
                  [name]: value
            }));
      };
      const handleInputChangeText = (event) => {
            event.preventDefault();
            const { name, value } = event.target;
            const data = value.replace(/[\r\n]+/gm, "")
            setValues((values) => ({
                  ...values,
                  [name]: data.split(',')
            }));
      };

      const [submitted, setSubmitted] = useState(false);
      const [valid, setValid] = useState(false);

      const handleSubmit = async (e) => {

            console.log("test==", JSON.stringify(values))

            const result = await fetch('http://localhost:8000/examQuestions', {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify(values)
            }).then((res) => {
                  return res.json();
            }).then((response) => {
                  setValid(true);
                  setSubmitted(true);
            }).catch((err) => {
                  console.log(err)
            })
            e.preventDefault();
            if (values.question && values.options && values.correctAns) {
                  setValid(true);
            }
            setSubmitted(true);
      };

      return (

            <div className="form-container">
                  <button onClick={() => navigate('/')}>Back Home</button>
                  <form className="register-form" onSubmit={handleSubmit}>
                        {submitted && valid && (
                              <div className="success-message">

                                    <div> Your Questions was successful! submitted </div>
                              </div>
                        )}
                        {!valid && (
                              <input
                                    className="form-field"
                                    type="text"
                                    placeholder="id"
                                    disabled={true}
                                    name="question"
                                    value={values.id+1}
                                    onChange={handleInputChange}
                              />
                        )}
                        {!valid && (
                              <input
                                    className="form-field"
                                    type="text"
                                    placeholder="Questions"
                                    name="question"
                                    value={values.question}
                                    onChange={handleInputChange}
                              />
                        )}

                        {submitted && !values.question && (
                              <span className="first-name-error">Please enter a Question</span>
                        )}

                        {!valid && (
                              <textarea
                                    className="form-field"
                                    type="text"
                                    placeholder="Options"
                                    name="options"
                                    value={values.options}
                                    onChange={handleInputChangeText}
                              />
                        )}

                        {submitted && !values.options && (
                              <span className="last-name-error">Please enter a Options</span>
                        )}

                        {!valid && (
                              <input
                                    className="form-field"
                                    placeholder="ans"
                                    name="correctAns"
                                    value={values.correctAns}
                                    onChange={handleInputChange}
                              />
                        )}

                        {submitted && !values.correctAns && (
                              <span className="email-error">Please enter correctAns</span>
                        )}
                        {!valid && (
                              <button className="form-field" type="submit">
                                    Submit
                              </button>
                        )}

                  </form>

            </div>
      );
}

