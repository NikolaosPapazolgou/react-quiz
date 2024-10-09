import { useEffect, useReducer } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Loader from './Loader.js'
import Error from './Error.js';
import StartScreen from './StartScreen.js';
import Question from './Question.js';
import NextButton from './NextButton.js';
import Progress from "./Progress.js"
import Finished from './Finished.js'
import Footer from './Footer.js';
import Timer from './Timer.js';
const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  currentQuestion: 0,
  currentAnswer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};
function reducer(state, action){
 switch(action.type){
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      }
    case "dataFailed":
      return{
        ...state,
        status: 'error',
      }
    case "start":
      return{
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      }
    case "newAnswer":
      const question = state.questions.at(state.currentQuestion);
      return{
        ...state,
        currentAnswer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points,
      }
    case "nextQuestion":
      return{
        ...state,
        currentQuestion: state.currentQuestion + 1,
        currentAnswer: null,
      }
    case "lastQuestion":
      return{
        ...state,
        status: 'finished',
        highscore: state.points > state.highscore? state.points : state.highscore,
      }
    case 'restartQuiz':
      return{
        ...initialState,
        questions: state.questions,
        status: 'ready',
        highscore: state.highscore,
      }
    case 'tick':
      return{
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? state.status = "finished" : state.status,
      }
    default:
      throw new Error("Invalid action");
 
 }
}
export default function App() {
 
  //Declaring useReducer
  const [{questions, status, currentQuestion, currentAnswer, points, highscore, secondsRemaining}, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const totalPoints = questions.reduce((prev, cur) => prev + cur.points, 0);
  
  //Fetching the questions array from the server on mount
  useEffect(function(){
    fetch(`http://localhost:8000/questions`).then(response => response.json()).then(data => dispatch({type: 'dataReceived', payload: data})).catch(err => dispatch({type: 'dataFailed'}));
  }, [])
  //Function that determines the ui that is going to be displayed base on state
 
  return (
  <div className='app'>
    <Header />
    <Main>
      {status === 'error' && <Error />}
      {status === 'loading' && <Loader />}
      {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
      {status === 'active' && (
        <>
        <Progress currentQuestion={currentQuestion} points={points} numQuestions={numQuestions} totalPoints={totalPoints} currentAnswer={currentAnswer}/>
        <Question dispatch={dispatch} 
        question={questions[currentQuestion]} 
        answer={currentAnswer}/>
        <Footer >
          <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
          <NextButton dispatch={dispatch} answer={currentAnswer} currentQuestion={currentQuestion} numQuestions={numQuestions}/>
        </Footer>
        </>
        )
      }
      {
        status === 'finished' && (
         <Finished points={points} totalPoints={totalPoints} highscore={highscore} dispatch={dispatch}/>
        )
      }
      
    </Main>
  </div>
  )
}


