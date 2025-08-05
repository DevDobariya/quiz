function Question(props){

    const {dispatch, question, answeredCorrectly, answered, questionNo } = props
    const {OptionsChosen, CorrectOptionIndex} = question
    console.log("OptionsChosen", OptionsChosen);
    let test_i = 2
    console.log("Test:", ( test_i in OptionsChosen ? ( test_i === CorrectOptionIndex ? "success" : "danger"): "secondary" ))


    function handleChooseAnswer(index){
    dispatch({
      type: "optionChoosen", 
      payload: index
    })
  }

  function handleNext(){
    dispatch({ type: "nextQuestion" })
  }

  function handlePrevious(){
    dispatch({ type: "prevQuestion" })
  }


    return(
        <>
            <div className="col-9">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="card-title mb-4">Q.{questionNo}   {question.Question}</h2>
                <div className="container-fluid" style={{backgroundColor: "#dddddd"}}>
                  
                  {question.CodeSnippet.map( line => {
                    return(
                      <h2>{line}</h2>
                    )
                  } )}
                </div>
                
                {
                  question.Options.map(( option, index ) => {
                    console.log("Index: ", index, "     state: ", OptionsChosen.includes(index))
                    return(
                      <button className={`btn w-100 btn-${ OptionsChosen.includes(index) ? ( index === CorrectOptionIndex ? "success" : "danger" ) : "secondary" } mt-3`} style={{ fontSize: 20 }} 
                          onClick={() => { handleChooseAnswer(index) }}>
                        {option}
                        </button>
                    )
                  })
                }
                <div className="d-flex justify-content-between mt-5">
                  
                  <button className="btn btn-outline-secondary" onClick={handlePrevious}>Previous</button>
                  {
                    answeredCorrectly ?
                    <button className="btn btn-primary" onClick={handleNext}>Next</button>:
                    ""
                  }
                </div>
                <div className={ answeredCorrectly ? "text-success" : "text-danger" }>
                    { answered ? 
                    ( answeredCorrectly ? 
                        <Correct /> : 
                        <Incorrect />) 
                    : "" }
                </div>
              </div>
            </div>
          </div>
        </>
    )
}

function Correct(){
    return(
        <span color="green" style={{ fontSize: 50 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
            </svg>
            Correct
        </span>
    )
}
function Incorrect(){
    return(
        <span color="red" style={{ fontSize: 50 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
            Incorrect
        </span>
    )
}

export default Question