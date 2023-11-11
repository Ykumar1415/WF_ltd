import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";

const ComboFlag = () => {
  const [shortDescription, setShortDescription] = useState([]);
  const [dmsFlag, setDMSFlag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div>
        <ToggleSwitch label="Combo Flag" />
      </div>
    </div>
  );
};

export default ComboFlag;
