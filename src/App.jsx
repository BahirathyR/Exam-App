import { AddQuestions } from './AddQuestions/AddQuestions';
import ExamTableList from './ExamTableList/ExamTableList';
import Home from './Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Exam from './OnlineExam/Exam';

function App() {
  return (
    <div>
      <h1>Online Exam Application</h1>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/addQuestions' element={<AddQuestions/>}></Route>
          <Route path='/exam' element={<Exam />}></Route>
          <Route path='/reportDetails' element={<ExamTableList />}></Route>
        </Routes>
    </BrowserRouter>
    </div>
    );
}

export default App;
