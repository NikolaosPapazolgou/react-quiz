export default function NextButton({dispatch, currentAnswer, currentQuestion, numQuestions}) {
  if(currentAnswer === null) return null;

  return <button onClick={() => currentQuestion === numQuestions - 1 ? dispatch({type: "lastQuestion"}) : dispatch({type: "nextQuestion"})} className="btn btn-ui">Next</button>
  
}
