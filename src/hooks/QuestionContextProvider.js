import {createContext, useContext, useEffect, useReducer } from "react";
const SECS_PER_QUESTION = 30;
const QuestionContext = createContext();
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
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
          status: state.secondsRemaining === 1 ? "finished" : state.status,  // Fix direct state mutation
        }
     default:
       throw new Error("Invalid action");
  
  }
 }
function QuestionContextProvider({children}) {
   
   const [{questions, status, currentQuestion, currentAnswer, points, highscore, secondsRemaining}, dispatch] = useReducer(reducer, initialState);

   const numQuestions = questions.length;
   const totalPoints = questions.reduce((prev, cur) => prev + cur.points, 0);
 //Fetching the questions array from the server on mount
 useEffect(function(){
   fetch(`http://localhost:8000/questions`).then(response => response.json()).then(data => dispatch({type: 'dataReceived', payload: data})).catch(err => dispatch({type: 'dataFailed'}));
 }, [])
  return <QuestionContext.Provider value={{
   questions, 
   status, 
   currentQuestion, 
   currentAnswer, 
   points, 
   highscore, 
   secondsRemaining,
   numQuestions,
   totalPoints,dispatch}}>
   {children}
  </QuestionContext.Provider>
}
function useQuestion(){
   const value = useContext(QuestionContext);
   if(!value) throw new Error("Not in the scope of the QuestionContextProvider");
   return value;
}
export { QuestionContextProvider, useQuestion }; 
