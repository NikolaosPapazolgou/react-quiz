export default function Progress({currentQuestion, numQuestions, points, totalPoints, currentAnswer}) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={Number(currentAnswer !== null) + currentQuestion} />
      <p>Question <strong>{currentQuestion + 1}</strong> / {numQuestions}</p>
      <p><strong>{points}</strong> / {totalPoints}</p>
    </header>
  )
}
