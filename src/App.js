import { useReducer } from 'react';
import './App.css';
import data from './jQuery-1.json'
import Question from './Question';
import FinishScreen from './FinishScreen';
import StartScreen from './StartScreen';

function App() {

  const initialState = {
    questions : data,
    currentQuestion : 0,
    hasStarted : false,
    answeredCorrectly : false,
    isFinished : false,
    answered : false
  }

  // action = {type: "start", payload: data}
  function reducer(state, action){
    switch(action.type){

      case "start":
        return { ...state, hasStarted : true }
      case "optionChoosen":
        const {questions, currentQuestion} = state
        if( !(questions[currentQuestion].OptionsChosen.includes(action.payload)) ){
          console.log("payload: ",action.payload);
          questions[currentQuestion].OptionsChosen.push(action.payload)
          console.log("OptionsChosen: ", questions[currentQuestion].OptionsChosen)
        }
        return { ...state, 
          answeredCorrectly: action.payload === questions[currentQuestion].CorrectOptionIndex,
          questions: questions,
          answered : true }

      case "nextQuestion":
        if( state.currentQuestion === state.questions.length - 1){
          return { ...state, isFinished: true,  currentQuestion: state.currentQuestion+1, hasStarted: false}
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
  const { questions, currentQuestion, answeredCorrectly, isFinished, answered, hasStarted } = quiz;
  console.log(quiz.questions);

  return (
    <>
      <div className="container-fluid py-5">
          <div className='row justify-content-center'>
            <progress max={questions.length} 
            value={currentQuestion} className='w-50 me-5' />
            {currentQuestion}/{questions.length}
          </div>

        <div className="row justify-content-center">
          { hasStarted ? 
          <Question dispatch = {dispatch} question = {questions[currentQuestion]}
            answeredCorrectly = {answeredCorrectly} answered = {answered}
            questionNo = {currentQuestion+1}/>
          : 
          isFinished ? <FinishScreen /> : <StartScreen dispatch={dispatch} /> }

        </div>
      </div>
    </>
  );
}

export default App;
