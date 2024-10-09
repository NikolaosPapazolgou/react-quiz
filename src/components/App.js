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
import { useQuestion} from '../hooks/QuestionContextProvider.js';

export default function App() {

 const {status, numQuestions, points, totalPoints, questions, currentQuestion, currentAnswer, secondsRemaining, dispatch, highscore} = useQuestion();
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


