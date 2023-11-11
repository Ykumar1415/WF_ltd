import React from "react";

const BtnCellRenderer = ({ value, clicked }) => {
  const btnClickedHandler = () => {
    clicked(value);
  };

//   return <button onClick={btnClickedHandler}>Click Me!</button>;
return (
<div>
{/* icon buttons for edit view and approve  */}
<button style={{backgroundColor: "transparent", border: "none"}} onClick={btnClickedHandler}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
<button style={{backgroundColor: "transparent", border: "none"}} onClick={btnClickedHandler}><i class="fa fa-eye" aria-hidden="true"></i></button>
<button style={{backgroundColor: "transparent", border: "none"}} onClick={btnClickedHandler}><i class="fa fa-check" aria-hidden="true"></i></button>
</div>
);
};

export default BtnCellRenderer;
