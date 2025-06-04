import { useReducer } from 'react';
import './App.css';
import data from './questions1.json'
import Question from './Question';
import FinishScreen from './FinishScreen';

function App() {

  const initialState = {
    questions: data,
    currentQuestion: 0,
    answeredCorrectly: false,
    isFinished: false,
    answered : false
  }
  function reducer(state, action){
    console.log(action)
    switch(action.type){
      case "optionChoosen":
        return { ...state, answeredCorrectly: action.payload, answered : true }

      case "nextQuestion":
        if( state.currentQuestion === state.questions.length - 1){
          return { ...state, isFinished: true,  currentQuestion: state.currentQuestion+1}
        }
        return { ...state, currentQuestion: state.currentQuestion+1,
                      answered: false, answeredCorrectly: false }

      case "prevQuestion":
        if( state.currentQuestion === 0){
          return state
        }
        return { ...state, currentQuestion: state.currentQuestion-1,
              answered: true, answeredCorrectly: true }
      default:
        return state
    }
  }

  const [quiz, dispatch] = useReducer(reducer, initialState);
  const { questions, currentQuestion, answeredCorrectly, isFinished, answered } = quiz;

  return (
    <>
      <div className="container-fluid py-5">
          <div className='row justify-content-center'>
            <progress max={questions.length} 
            value={currentQuestion} className='w-50 me-5' />
            {currentQuestion}/{questions.length}
          </div>

        <div className="row justify-content-center">
          {
            isFinished ? <FinishScreen /> : 
            <Question dispatch = {dispatch} question = {questions[currentQuestion]}
            answeredCorrectly = {answeredCorrectly} answered = {answered}
            questionNo = {currentQuestion+1}/>
          }
        </div>
      </div>
    </>
  );
}

export default App;
