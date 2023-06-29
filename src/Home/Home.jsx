import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
      const navigate = useNavigate();
      return (

            <div className="container" >
                  <div className="button">
                        <button type="button" className="btn-primary" onClick={() => { navigate('/addQuestions') }}>Add Questions</button>
                        <button type="button" className="btn-secondary" onClick={() => { navigate('/exam') }}>Exam</button>
                        <button type="button" className="btn-res" onClick={() => { navigate('/reportDetails') }}>Reports</button>
                  </div>
            </div>
      );
}
export default Home;