import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import { APIWrapper, getHead } from "./APIWrapper";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

const DMS = (data) => {
  let history = useHistory();

  const [shortDescription, setShortDescription] = useState([]);
  const [dmsFlag, setDMSFlag] = useState("");
  const [isDMS, setIsDMS] = useState(
    data != undefined && data.dms_flag != undefined ? data.dms_flag : "NO"
  );
  // const [selectedInventoryItem, setSelectedInventoryItem] = useState(
  //   data != undefined && data.inventory_item != undefined
  //     ? data.inventory_item
  //     : null
  // );
  const onDMSChange = (newValue) => {
    setIsDMS(newValue ? "Y" : "N");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: {
        docno: data.data.docno,
        userid: localStorage.getItem("username"),
        dms_flag: isDMS,
        item_short_desc: shortDescription,
      },
      path: "processDMS",
    };

    let response = await APIWrapper(reqParam);
    if (response["status"] == "success") {
      console.log("response", response);
      Swal.fire({
        title: "Success!",
        html: response.data.message,
        icon: "Success",
        confirmButtonText: "ok",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push(`/viewItem`);
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      Swal.fire({
        title: "Oops!",
        html: "Some error occured.",
        icon: "Error",
      });
    }
  };
  return (
    <form>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <ToggleSwitch
          label="DMS Flag"
          onChange={onDMSChange}
          // checked={selectedInventoryItem == "YES" ? true : false}
          // disabled={isDisabled}
        />
        <div>
          <label className="inputLabel" htmlFor="shortDescription">
            Short Description
          </label>
          <input
            type="text"
            id="shortDescription"
            onChange={(e) => setShortDescription(e.target.value)}
            name="shortDescription"
            style={{ width: "250px" }}
            aria-multiline={true}
          />
        </div>
        <button
          style={{
            display: "block",
            alignSelf: "center",
            marginTop: "-14px",
            marginLeft: "89px",
          }}
          className="btn btn-primary btn-block"
          type="button"
          onClick={handleSubmit}
          // disabled={submitDisable}
          // disabled={!validateForm()}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default DMS;
