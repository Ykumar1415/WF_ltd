import React from 'react'

const bpdashboard = () => {
    const goBack = () => {
        window.history.back();
      };
  return (
    <div>
        bpdashboard
        <h1>bp dashboard</h1>
        <button onClick={goBack}>Go Back</button>
    </div>
  )
}

export default bpdashboard