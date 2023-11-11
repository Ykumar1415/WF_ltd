import React, { useState } from "react";
import "../Stylesheets/ItemCreation.css";
import { APIWrapper, getHead } from "./APIWrapper";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
const Taxation = (props) => {
  let history = useHistory();
  const [hsnCode, setHSNCode] = useState([]);
  const [gstTaxRate, setGSTTaxRate] = useState([]);
  const [taxCategory, setTaxCategory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("hsnCode", hsnCode);
    // console.log("gstTaxRate", gstTaxRate);
    // console.log("taxCategory", taxCategory);

    // alert(JSON.stringify(e));

    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: {
        docno: props.data.docno,
        userid: localStorage.getItem("username"),
        hsn_code: hsnCode,
        tax_category: taxCategory,
        gst_rate: gstTaxRate,
      },
      path: "processTaxation",
    };

    let response = await APIWrapper(reqParam);
    console.log("response", response);
    if (response["status"] == "success") {
      Swal.fire({
        title: "Success!",
        // html: "Data submitted successfully.",
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
      // setIsApproveSuccess(true);
    } else {
      Swal.fire({
        title: "Oops!",
        html: "Some error occured.",
        icon: "Error",
      });
      // setApproveDisable(false);
    }
  };
  return (
    <form>
      <div
        style={{
          // display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div>
          <label className="inputLabel" htmlFor="hsnCode">
            HSN Code
          </label>
          <input
            className="textInput"
            type="text"
            id="hsnCode"
            onChange={(e) => setHSNCode(e.target.value)}
            name="promoFlag"
          />
          <label className="inputLabel" htmlFor="gstTaxRate">
            GST Tax Rate
          </label>
          <input
            className="numberInput"
            type="number"
            id="gstTaxRate"
            onChange={(e) => setGSTTaxRate(e.target.value)}
            name="gstTaxRate"
          />
          <label className="inputLabel" htmlFor="taxCategory">
            Tax Category
          </label>
          <input
            className="textInput"
            type="text"
            id="taxCategory"
            onChange={(e) => setTaxCategory(e.target.value)}
            name="taxCategory"
          />
        </div>
        <br />
        <button
          style={{
            display: "block",
            marginBottom: "10px",
            alignSelf: "center",
          }}
          className="btn btn-primary btn-block m-auto"
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

export default Taxation;
