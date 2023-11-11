import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { withRouter, Link } from "react-router-dom";
import MainGroup from "../Components/MainGroup";
import DatePicker from "react-date-picker";
import Brand from "../Components/Brand";
import DMS from "../Components/DMS";
import Taxation from "../Components/Taxation";
import background from "../Images/BackgroundImage.jpg";
import { APIWrapper, getHead } from "../Components/APIWrapper";
import "../Stylesheets/ItemCreation.css";
import ComboFlag from "../Components/ComboFlag";
import ToggleSwitch from "../Components/ToggleSwitch";
import Header from "../Components/Header";
import Swal from "sweetalert2";
import "../App.css";
import ItemCreationPanel from "../Components/ItemCreationPanel";
import AutoSuggestion from "../Components/AutoSuggestion";
import Autosuggest from "react-autosuggest";
import "../Stylesheets/autosuggest.css";

const CreateItem = (props) => {

  

  const [lovMapping, setLOVMapping] = useState([]);
  const [itemGroupName, setItemGroupName] = useState([]);
  const [selectedItemGroupName, setSelectedItemGroupName] = useState([]);
  const [purchaseItem, setPurchaseItem] = useState([]);
  const [selectedPurchaseItem, setSelectedPurchaseItem] = useState([]);
  const [inventoryItem, setInventoryItem] = useState([]);
  const [selectedInventoryItem, setSelectedInventoryItem] = useState([]);
  const [sellItem, setSellItem] = useState([]);
  const [selectedSellItem, setSelectedSellItem] = useState([]);
  const [saleUnitMeasure, setSaleUnitMeasure] = useState([]);
  const [selectedSaleUnitMeasure, setSelectedSaleUnitMeasure] = useState([]);
  const [packingType, setPackingType] = useState([]);
  const [selectedPackingType, setSelectedPackingType] = useState([]);
  const [division, setDivision] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState([]);
  const [prc, setPRC] = useState([]);
  const [selectedPrc, setSelectedPRC] = useState([]);
  const [shelfLife, setShelfLife] = React.useState([]);
  const [moq, setMOQ] = useState([]);
  const [customerType, setCustomerType] = useState([]);
  const [selectedCustomerType, setSelectedCustomerType] = useState([]);
  const [weight, setWeight] = useState([]);
  const [weightUnit, setWeightUnit] = useState([]);
  const [selectedWeightUnit, setSelectedWeightUnit] = useState([]);
  const [inventoryUOM, setInventoryUOM] = useState([]);
  const [selectedInventoryUOM, setSelectedInventoryUOM] = useState([]);
  const [newProduction, setNewProduction] = useState([]);
  const [unitsInPack, setUnitsInPack] = useState([]);
  const [productType, setProductType] = useState([]);
  const [market, setMarket] = useState([]);
  const [focusProduct, setFocusProduct] = useState([]);
  const [caf, setCAF] = useState([]);
  const [productionStatus, setProductionStatus] = useState([]);
  const [salesStatus, setSalesStatus] = useState([]);
  const [promoFromDate, setPromoFromDate] = useState(new Date());
  const [promoToDate, setPromoToDate] = useState(new Date());
  const [specialAttribute, setSpecialAttribute] = useState("");
  const [parentCode, setParentCode] = useState("");
  const [parentCodeDescription, setParentCodeDescription] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [itemCodeDescription, setItemCodeDescription] = useState("");
  const [comboFlag, setComboFlag] = useState("");
  const [promoFlag, setPromoFlag] = useState("");
  const [eanCode, setEANCode] = useState("");
  const [faSecCategory, setFASecCategory] = useState([]);
  const [phaseInFlag, setPhaseInFlag] = useState([]);
  const [packNetContent, setPackNetContent] = useState("");
  const [packNetContentUOM, setPackNetContentUOM] = useState([]);
  const [selectedPackNetContentUOM, setSelectedPackNetContentUOM] = useState(
    []
  );
  const [replacement, setReplacement] = useState(false);
  const [newAddition, setNewAddition] = useState(false);
  const [showItemCreationPanel, setShowItemCreationPanel] = useState(false);
  const [itemData, setItemData] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSubmissionSuccess, setIsSubmissionSuccess] = useState(false);
  const [isApproveSuccess, setIsApproveSuccess] = useState(false);
  const [isReworkSuccess, setIsReworkSuccess] = useState(false);

  const location = useLocation();


  useEffect(() => {
    if (location.state != undefined) {
      console.log(location.pathname); // result: '/secondpage'
      console.log(location.state.detail); // result: 'some_value'
      setShowItemCreationPanel(true);
      setTimeout(() => setItemData(location.state.detail), 2000);
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
      setTimeout(() => setItemData({}), 2000);
    }
  }, [location]);

  useEffect(() => {
    if (isSubmissionSuccess || isApproveSuccess || isReworkSuccess) {
      props.history.push("/viewItem");
    }
  }, [isSubmissionSuccess, isApproveSuccess, isReworkSuccess]);

  const submit = async () => {
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: {
        item_group_name: selectedItemGroupName,
        item_group_code: "selectedItemGroupCode",
        purchase_item: selectedPurchaseItem,
        inventory_item: selectedInventoryItem,
        sell_item: selectedSellItem,
        billing_UOM: selectedSaleUnitMeasure,
        fg_container: selectedPackingType,
        division: selectedDivision,
        prc_name: selectedPrc,
        prod_category: "selectedProductCategory",
        shelf_life: shelfLife,
        moq: moq,
        units_in_pack: unitsInPack,
        pack_type: selectedCustomerType,
        weight: weight,
        weight_uom: selectedWeightUnit,
        inventory_uom: selectedInventoryUOM,
        new_production: "selectedNewProduction",
        product_type: "selectedProductType",
      },
      path: "createItem",
    };
    let response = await APIWrapper(reqParam);
    if (response["status"] == "success") {
      Swal.fire({
        title: "Success!",
        html: "Item submitted successfully.",
        icon: "Success",
      });
    } else {
      Swal.fire({
        title: "Oops!",
        html: "Some error occured.",
        icon: "Error",
      });
    }
  };

  const approve = async () => {
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: {
        docno: "1",
        userid: localStorage.getItem("username"),
        approver_remarks: "test",
      },
      path: "approveItem",
    };
    let response = await APIWrapper(reqParam);
    if (response["status"] == "success") {
      Swal.fire({
        title: "Success!",
        html: "Approver remarks submitted successfully.",
        icon: "Success",
      });
    } else {
      Swal.fire({
        title: "Oops!",
        html: "Some error occured.",
        icon: "Error",
      });
    }
  };

  const rework = async () => {
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: { docno: "1", remarks: "Parent code issue" },
      path: "rework",
    };
    let response = await APIWrapper(reqParam);
    if (response["status"] == "success") {
      Swal.fire({
        title: "Success!",
        html: "Rework remarks submitted successfully.",
        icon: "Success",
      });
    } else {
      Swal.fire({
        title: "Oops!",
        html: "Some error occured.",
        icon: "Error",
      });
    }
  };


  const handleSubmit = async () => {
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: {
        item_group_name: selectedItemGroupName,
        item_group_code: "1",
        purchase_item: selectedPurchaseItem,
        inventory_item: selectedInventoryItem,
        sell_item: selectedSellItem,
      },
      path: "createItem",
    };
    let response = await APIWrapper(reqParam);
    //e.preventDefault();
  };

  return (
    <div
      style={{
        height: window.innerHeight - 2 + "px",
        backgroundColor: "#f7fbfd",
        alignItems: "center",
      }}
    >
      {/* <Header /> */}
      <h4 style={{ mraginTop: "10px", color: "darkcyan" }}> Item Creation </h4>
      <div
        style={{ display: isDisabled ? "none" : "block", marginBottom: "10px" }}
      >
        <label style={{ marginRight: "10px", fontSize: "1rem" }}>
          
          Is the FG you are creating is under Existing Parent/New addition?
        </label>
       </div>
       <div> 
        <label style={{ marginRight: "10px", fontSize: "12px" }}>
          Existing Parent
        </label>
        <input
          type="radio"
          name="isReplacement"
          value={replacement}
          checked={replacement}
          onChange={(data) =>
            data.target.checked
              ? (setReplacement(true), setNewAddition(false))
              : (setReplacement(false), setNewAddition(true))
          }
        />
        <label
          style={{ marginLeft: "10px", marginRight: "10px", fontSize: "12px" }}
        >
          New Addition
        </label>
        <input
          type="radio"
          name="isReplacement"
          value={newAddition ? newAddition : ""}
          checked={newAddition}
          onChange={(data) =>
            data.target.checked
              ? (setNewAddition(true),
                setReplacement(false),
                setItemData({}),
                setShowItemCreationPanel(false))
              : // console.log(itemData)
                (setNewAddition(false), setReplacement(true))
          }
        />
      </div>
      {replacement != null && replacement && showItemCreationPanel == false ? (
        <div style={{ textAlign: "center" }}>
          <span className="autosuggestion_hint">TIP: You can use % for wild card search,your search is not case insensitive</span>
          <AutoSuggestion
            setShowItemCreationPanel={setShowItemCreationPanel}
            setItemData={setItemData}
          />
        </div>
      ) : (
        <>
          {!isSubmissionSuccess &&
          showItemCreationPanel &&
          Object.keys(itemData).length !== 0 ? (
            // {showItemCreationPanel==true ?<ItemCreationPanel itemData={itemData} />
            <ItemCreationPanel
              data={itemData}
              // setItemData={setItemData}
              isReplacement={replacement}
              isAddition={newAddition}
              setIsSubmissionSuccess={setIsSubmissionSuccess}
              setIsApproveSuccess={setIsApproveSuccess}
              setIsReworkSuccess={setIsReworkSuccess}
            />
          ) : (
            <>
              {newAddition != null && newAddition && !isSubmissionSuccess ? (
                <ItemCreationPanel
                  isReplacement={replacement}
                  isAddition={newAddition}
                  setIsSubmissionSuccess={setIsSubmissionSuccess}
                  setIsApproveSuccess={setIsApproveSuccess}
                  setIsReworkSuccess={setIsReworkSuccess}
                />
              ) : null}
            </>
          )}
        </>
      )}
      {/* {replacement != null && replacement == true ? (
        <div style={{ textAlign: "center" }}>
           <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={onSuggestionSelected}
        inputProps={inputProps}
      />
          {/* <AutoSuggestion setShowItemCreationPanel={setShowItemCreationPanel} setItemData={setItemData}/> */}
      {/* <ItemCreationPanel data={itemData} isReplacement={replacement} isAddition={newAddition}/>
        </div>
      ) : (
            <>
              {newAddition != null && newAddition == true ? (
                <ItemCreationPanel isReplacement={replacement} isAddition={newAddition}/>
              ) : null}
            </>
          ) }  */}
    </div>
  );
};

export default withRouter(CreateItem);
