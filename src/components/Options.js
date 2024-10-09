import React from 'react'

export default function Options({question, dispatch, answer}) {
  const hasAnswered = answer !== null ;
  return (
  
      <div className='options'>
      {question.options.map((option,index) => (
        <button 
        onClick={() => dispatch({type: 'newAnswer', payload: index})} 
        key={index} 
        disabled={answer !== null}
        className={`btn btn-option ${index === answer? answer : ""} ${hasAnswered
         ?index === question.correctOption  
         ?  
         "correct" : 
         "wrong" : ""}`}>
          {option}
        </button>
      )
    )
      }
      </div>
    
  )
}
