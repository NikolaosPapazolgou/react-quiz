export default function Finished({points, totalPoints, highscore, dispatch}) {
  const precentage = (points / totalPoints) * 100 ;
  return (
    <>
    <p className="result">
      You scored <strong>{points}</strong> / {totalPoints}
      ({Math.ceil(precentage)}%) 
    </p>
    <p className="highscore">(Highscore: {highscore} points)</p>
    <button className="btn btn-ui" onClick={() => dispatch({type: "restartQuiz"})}>Restart Quiz</button>
    </>
  )
}
