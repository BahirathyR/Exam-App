import './App.css';
import Exam from './Exam';
import { examQuestions } from './constants';

function App() {
  return (
    <div>
      <Exam questions={examQuestions.questions} />
    </div>
  );
}

export default App;
