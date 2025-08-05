function StartScreen({dispatch}){

    function handleStart(){
        dispatch({ type: "start" })
    }

    return(
        <>
            <div className="col-9">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="card-title mb-4">Ready to start the quiz?</h2>
                <div className="d-flex justify-content-between mt-5">
                  <button className="btn btn-primary w-100" onClick={handleStart}>Start</button>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}

export default StartScreen