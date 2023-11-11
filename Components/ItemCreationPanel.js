import React, { useEffect, useState, useRef } from "react";
import MainGroup from "./MainGroup";
import DatePicker from "react-date-picker";
import Brand from "./Brand";
import DMS from "./DMS";
import Taxation from "./Taxation";
import background from "../Images/BackgroundImage.jpg";
import { APIWrapper, getHead } from "./APIWrapper";
import "../Stylesheets/ItemCreation.css";
import ComboFlag from "./ComboFlag";
import ToggleSwitch from "./ToggleSwitch";
import Header from "./Header";
import Swal from "sweetalert2";
import "../App.css";
import { getRowContainerTypeForName } from "ag-grid-community";
import Select from "react-select";

const ItemCreationPanel = ({
  data,
  isReplacement,
  isAddition,
  setIsSubmissionSuccess,
  setIsApproveSuccess,
  setIsReworkSuccess,
}) => {


  const Role_Id = localStorage.getItem("RoleId");
  const username = localStorage.getItem("username");

  const [lovMapping, setLOVMapping] = useState([]);
  const [itemGroupName, setItemGroupName] = useState([]);
  const [selectedItemGroupName, setSelectedItemGroupName] = useState(
    data != undefined && data.item_group_name != undefined
      ? data.item_group_name
      : null
  );
  const [itemGroupCode, setItemGroupCode] = useState([]);
  const [selectedItemGroupCode, setSelectedItemGroupCode] = useState(
    data != undefined && data.item_group_code != undefined
      ? data.item_group_code
      : null
  );
  const [selectedProdCategory, setSelectedProdCategory] = useState(
    data != undefined && data.product_category != undefined
      ? data.product_category
      : null
  );
  const [selectedMainGroup, setSelectedMainGroup] = useState(
    data != undefined && data.main_group != undefined ? data.main_group : null
  );
  const [selectedSubGroup, setSelectedSubGroup] = useState(
    data != undefined && data.sub_group != undefined ? data.sub_group : null
  );
  const [subGroup, setSubGroup] = useState([]);
  const [purchaseItem, setPurchaseItem] = useState([]);
  const [selectedPurchaseItem, setSelectedPurchaseItem] = useState(
    data != undefined && data.purchase_item != undefined
      ? data.purchase_item_
      : null
  );
  const [inventoryItem, setInventoryItem] = useState([]);
  const [selectedInventoryItem, setSelectedInventoryItem] = useState(
    data != undefined && data.inventory_item != undefined
      ? data.inventory_item
      : null
  );
  const [sellItem, setSellItem] = useState([]);
  const [selectedSellItem, setSelectedSellItem] = useState(
    data != undefined && data.sell_item != undefined ? data.sell_item : null
  );
  const [saleUnitMeasure, setSaleUnitMeasure] = useState([]);
  const [selectedSaleUnitMeasure, setSelectedSaleUnitMeasure] = useState(
    data != undefined && data.billing_uom != undefined ? data.billing_uom : null
  );
  const [packingType, setPackingType] = useState([]);
  const [selectedPackingType, setSelectedPackingType] = useState(
    data != undefined && data.packing_type != undefined
      ? data.packing_type
      : null
  );
  const [division, setDivision] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState(
    data != undefined && data.division != undefined ? data.division : null
  );
  const [prc, setPRC] = useState([]);
  const [selectedPrc, setSelectedPRC] = useState(
    data != undefined && data.prc_name != undefined ? data.prc_name : null
  );
  const [shelfLife, setShelfLife] = React.useState(
    null
  );
  const [moq, setMOQ] = useState(
    data != undefined && data.moq != undefined ? data.moq : null
  );
  const [customerType, setCustomerType] = useState([]);
  const [selectedCustomerType, setSelectedCustomerType] = useState(
    data != undefined && data.pack_type != undefined ? data.pack_type : ""
  );
  const [weight, setWeight] = useState(
    data != undefined && data.weight != undefined ? data.weight : null
  );
  const [weightUnit, setWeightUnit] = useState([]);
  const [selectedWeightUnit, setSelectedWeightUnit] = useState(
    data != undefined && data.weight_uom != undefined ? data.weight_uom : ""
  );
  const [inventoryUOM, setInventoryUOM] = useState([]);
  const [selectedInventoryUOM, setSelectedInventoryUOM] = useState(
    data != undefined && data.inventory_uom != undefined
      ? data.inventory_uom
      : ""
  );
  const [newProduction, setNewProduction] = useState([]);
  const [selectedNewProduction, setSelectedNewProduction] = useState(
    data != undefined && data.new_production != undefined
      ? data.new_production
      : null
  );
  const [unitsInPack, setUnitsInPack] = useState(
    data != undefined && data.units_in_a_pack != undefined
      ? data.units_in_a_pack
      : null
  );
  const [productType, setProductType] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState(
    data != undefined && data.product_type != undefined
      ? data.product_type
      : null
  );

  const [market, setMarket] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState(
    data != undefined && data.market != undefined ? data.market : null
  );
  const [focusProduct, setFocusProduct] = useState([]);
  const [selectedFocusProduct, setSelectedFocusProduct] = useState(
    data != undefined && data.focus_product != undefined
      ? data.focus_product
      : null
  );
  const [caf, setCAF] = useState([]);
  const [selectedCaf, setSelectedCAF] = useState(
    data != undefined && data.portfolio != undefined ? data.portfolio : null
  );
  const [productionStatus, setProductionStatus] = useState([]);
  const [selectedProductionStatus, setSelectedProductionStatus] = useState(
    data != undefined && data.production_status != undefined
      ? data.production_status
      : null
  );
  const [salesStatus, setSalesStatus] = useState([]);
  const [selectedSalesStatus, setSelectedSalesStatus] = useState(
    data != undefined && data.sales_status != undefined
      ? data.sales_status
      : null
  );


  const [promoFromDate, setPromoFromDate] = useState(
    data != undefined &&
      data.promo_flag != "NO" &&
      data.promo_from_date != undefined
      ? new Date(data.promo_from_date)
      : ""
  );



  const [promoToDate, setPromoToDate] = useState(
    data != undefined &&
      data.promo_flag != "NO" &&
      data.promo_to_date != undefined
      ? new Date(data.promo_to_date)
      : ""
  );



  const [specialAttribute, setSpecialAttribute] = useState("");
  const [parentCode, setParentCode] = useState("");
  const [parentCodeDescription, setParentCodeDescription] = useState("");
  const [itemCode, setItemCode] = useState(
    data != undefined && data.item_code != undefined ? data.item_code : ""
  );
  const [itemCodeDescription, setItemCodeDescription] = useState(
    data != undefined && data.item_desc != undefined ? data.item_desc : ""
  );
  const [comboFlag, setComboFlag] = useState("");
  const [promoFlag, setPromoFlag] = useState("");
  const [eanCode, setEANCode] = useState("");
  const [faSecCategory, setFASecCategory] = useState("");

  const [phaseInFlag, setPhaseInFlag] = useState([]);
  const [selectedPhaseInFlag, setSelectedPhaseInFlag] = useState(
    data != undefined && data.phase_in_flag != undefined
      ? data.sales_status
      : null
  );

  const [packNetContent, setPackNetContent] = useState("");
  const [packNetContentUOM, setPackNetContentUOM] = useState([]);
  const [selectedPackNetContentUOM, setSelectedPackNetContentUOM] = useState(
    data != undefined && data.pack_net_content_uom != undefined
      ? data.pack_net_content_uom
      : null
  );
  const [isDisabled, setIsDisabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPromo, setIsPromo] = useState("NO");
  const [isInventoryItem, setIsInventoryItem] = useState(
    data != undefined && data.inventory_item != undefined
      ? data.inventory_item
      : "NO"
  );
  const [isSellItem, setIsSellItem] = useState(
    data != undefined && data.sell_item != undefined ? data.sell_item : "NO"
  );
  const [isPurchaseItem, setIsPurchaseItem] = useState(
    data != undefined && data.purchase_item != undefined
      ? data.purchase_item
      : "NO"
  );
  const [isCombo, setIsCombo] = useState(
    data != undefined && data.combo_flag != undefined ? data.combo_flag : "NO"
  );
  const [isDMS, setIsDMS] = useState(
    data != undefined && data.dms_flag != undefined ? data.dms_flag : "NO"
  );
  const [selectedBrand, setSelectedBrand] = useState(
    data != undefined && data.brand != undefined ? data.brand : null
  );
  const [selectedBrandCode, setSelectedBrandCode] = useState(null);
  const [selectedProductFamily, setSelectedProductFamily] = useState(
    data != undefined && data.product_family != undefined
      ? data.product_family
      : null
  );
  const [selectedProductClass, setSelectedProductClass] = useState(
    data != undefined && data.product_class != undefined
      ? data.product_class
      : null
  );
  const [selectedProductLine, setSelectedProductLine] = useState(
    data != undefined && data.product_line != undefined
      ? data.product_line
      : null
  );
  const [selectedFlavour, setSelectedFlavour] = useState(
    data != undefined && data.flavour != undefined ? data.flavour : null
  );
  const [reviewComments, setReviewComments] = useState("");
  const [submitDisable, setSubmitDisable] = useState(false);
  const [approveDisable, setApproveDisable] = useState(false);
  const [rejectDisable, setRejectDisable] = useState(false);
  const [reworkDisable, setReworkDisable] = useState(false);
  const [remark, setRemark] = useState(
    data != undefined && data.rework_remarks != undefined
      ? data.rework_remarks
      : null
  );
   
  
  useEffect((props) => {
    if (Role_Id == null) {
      props.history.push("/");
    }
  }, []);

  useEffect(() => {
    if (data != undefined) {
      setSelectedItemGroupName(data.item_group_name);
      setParentCode(data.parent_code);
      setParentCodeDescription(data.parent_code_desc);
      setShelfLife(data.shelf_life);
      setMOQ(data.moq);
      setWeight(data.weight);
      setUnitsInPack(data.units_in_a_pack);
      setEANCode(data.ean);
      setPackNetContent(data.pack_net_content);
      setItemCode(data.item_code);
      setItemCodeDescription(data.item_desc);
      console.log('data.item_desc', data.item_desc);
      setSpecialAttribute(data.special_attribute);
      setIsInventoryItem(data.inventory_item);
      setIsSellItem(data.sell_item);
      setIsPurchaseItem(data.purchase_item);
      setIsCombo(data.combo_flag);
      setIsPromo(data.promo_flag);
      setIsDMS(data.dms_flag);
      setFASecCategory(data.fa_sec_category);
      if (data.item_code != undefined && !isReplacement) {
        setIsDisabled(true);
      }
      if (localStorage.getItem("RoleId") == "1") {
        setIsDisabled(false);
      }
      if (localStorage.getItem("RoleId") == data.status) {
        setIsDisabled(false);
      }
    }
  }, [data]);

  useEffect(() => {
    if (
      localStorage.getItem("RoleId") == "0" &&
      (data == undefined || isReplacement)
    ) {
      getLOVMapping();
    }
  }, []);

  useEffect(() => {
    if (isAddition) {
      resetSelections();
    }
  }, [isAddition]);

  useEffect(() => {
    if (lovMapping.length > 0 && !isReplacement) {
      getItemGroupName();
      getSaleUnitMeasure();
      getPackingType();
      getDivision();
      getPRC();
      getCustomerType();
      getWeightUnit();
      getInventoryUOM();
      getPackNetContentUOM();
      getNewProduction();
      getProductType();
      getMarket();
      getFocusProduct();
      getCAF();
      getProductionStatus();
      getSalesStatus();
      //getFASecCategory();
      getPhaseInFlag();
    }
  }, [lovMapping, isReplacement]);

  useEffect(() => {
    if (
      data === undefined &&
      (selectedBrand == "" || selectedProductLine == "")
    ) {
      setFASecCategory(null);
    } else if (
      data != undefined &&
      selectedBrand != null &&
      selectedProductLine != null
    ) {
      // console.log("selectedBrandCode", selectedBrandCode);
      setFASecCategory(
        selectedBrandCode
          ? selectedBrandCode + "-" + selectedProductLine
          : selectedProductLine
      );
    }
  }, [selectedBrand, selectedProductLine, selectedBrandCode]);

  useEffect(() => {
    if (
      data === undefined &&
      (selectedProductLine == "" ||
        selectedBrand == "" ||
        selectedFlavour == "" ||
        selectedPackingType == "" ||
        unitsInPack == "" ||
        packNetContent == "" ||
        selectedPackNetContentUOM == "")
    ) {
      setItemCodeDescription(null);
      setParentCodeDescription("");
    } else if (
      data === undefined &&
      selectedProductLine != null &&
      selectedBrand != null &&
      selectedFlavour != null &&
      selectedPackingType != null &&
      unitsInPack != null &&
      packNetContent != null &&
      selectedPackNetContentUOM != null
    ) {
      const combo = isCombo == "YES" ? "-COMBO" : "";
      const promo = isPromo == "YES" ? "-PROMO" : "";
      const sa =
        specialAttribute.length > 0 ? "-" + specialAttribute.toUpperCase() : "";

      let newItemCodeDescription='';

      if(selectedFlavour.toUpperCase()==='NA'){
        newItemCodeDescription=selectedBrand.toUpperCase()+"-"+selectedProductLine.toUpperCase()+"-" +
                selectedPackingType.toUpperCase() + combo +"-" +unitsInPack +"X" +packNetContent +
                selectedPackNetContentUOM + sa +promo;
      }else{
        newItemCodeDescription=selectedBrand.toUpperCase()+"-"+selectedProductLine.toUpperCase()+"-" +
        selectedFlavour.toUpperCase()+"-"+selectedPackingType.toUpperCase() + combo +"-" +unitsInPack +"X" +packNetContent +
        selectedPackNetContentUOM + sa +promo;
      }


      setItemCodeDescription(newItemCodeDescription);

      console.log('newItemCodeDescription', newItemCodeDescription)
      
    } else if (
      selectedProductLine != null &&
      selectedBrand != null &&
      selectedFlavour != null &&
      selectedPackingType != null &&
      unitsInPack != null &&
      packNetContent != null &&
      selectedPackNetContentUOM != null
    ) {
      const combo = isCombo == "YES" ? "-COMBO" : "";
      const promo = isPromo == "YES" ? "-PROMO" : "";
      const sa =
        specialAttribute.length > 1 ? "-" + specialAttribute.toUpperCase() : "";

        let newItemCodeDescription='';

        if(selectedFlavour.toUpperCase()==='NA'){
          newItemCodeDescription=selectedBrand.toUpperCase()+"-"+selectedProductLine.toUpperCase()+"-" +
                  selectedPackingType.toUpperCase() + combo +"-" +unitsInPack +"X" +packNetContent +
                  selectedPackNetContentUOM + sa +promo;
        }else{
          newItemCodeDescription=selectedBrand.toUpperCase()+"-"+selectedProductLine.toUpperCase()+"-" +
          selectedFlavour.toUpperCase()+"-"+selectedPackingType.toUpperCase() + combo +"-" +unitsInPack +"X" +packNetContent +
          selectedPackNetContentUOM + sa +promo;
        };



if(specialAttribute !== ''){
  setItemCodeDescription(newItemCodeDescription);
  console.log(specialAttribute.length);
}
    }
  }, [
    selectedProductLine,
    selectedBrand,
    selectedFlavour,
    selectedPackingType,
    isCombo,
    isPromo,
    specialAttribute,
    unitsInPack,
    packNetContent,
    selectedPackNetContentUOM,
    itemCodeDescription,
  ]);

  const onPromoChange = (newValue) => {
    setIsPromo(newValue ? "YES" : "NO");
    if (newValue === false) {
      setPromoFromDate("");
      setPromoToDate("");
    }
  };

  const setNewFGCodeDescription = () => {
    const combo = isCombo == "YES" ? "-COMBO" : "";
    const promo = isPromo == "YES" ? "-PROMO" : "";
    const sa = specialAttribute.length > 1 ? "-" + specialAttribute.toUpperCase() : "";

    console.log(unitsInPack);

      let newItemCodeDescription='';

      if(selectedFlavour==='NA'){
        newItemCodeDescription=selectedBrand+"-"+selectedProductLine+"-" +
                selectedPackingType + combo +"-" +unitsInPack +"X" +packNetContent +
                selectedPackNetContentUOM + sa +promo;
      }else{
        newItemCodeDescription=selectedBrand+"-"+selectedProductLine+"-" +
        selectedFlavour+"-"+selectedPackingType + combo +"-" +unitsInPack +"X" +packNetContent +
        selectedPackNetContentUOM + sa +promo;
      };

    
    setItemCodeDescription(newItemCodeDescription);
   // console.log(specialAttribute.length);
    

  };

  const onDMSChange = (newValue) => {
    setIsDMS(newValue ? "YES" : "NO");
  };

  const onInventoryItemChange = (newValue) => {
    setIsInventoryItem(newValue ? "YES" : "NO");
  };

  const onSellItemChange = (newValue) => {
    setIsSellItem(newValue ? "YES" : "NO");
  };

  const onPurchaseItemChange = (newValue) => {
    setIsPurchaseItem(newValue ? "YES" : "NO");
    createString("purchase_item", newValue);
  };

  const onComboChange = (newValue) => {
    setIsCombo(newValue ? "YES" : "NO");
    createString("combo_flag", newValue);
  };
  const validation = () => {
    // if (!isReplacement) {

    if (selectedItemGroupName === null || selectedItemGroupName === "") {
      document.getElementById("itemGroupName").focus();
    } else if (
      selectedSaleUnitMeasure === null ||
      selectedSaleUnitMeasure === ""
    ) {
      document.getElementById("saleUnitMeasure").focus();
    } else if (selectedPackingType === null || selectedPackingType === "") {
      document.getElementById("packingType").focus();
    } else if (selectedNewProduction === null || selectedNewProduction === "") {
      document.getElementById("newProduction").focus();
    } else if (selectedDivision === null || selectedDivision === "") {
      document.getElementById("division").focus();
    } else if (selectedPrc === null || selectedPrc === "") {
      document.getElementById("prc").focus();
    } else if (selectedProdCategory === null || selectedProdCategory === "") {
      document.getElementById("prodCategory").focus();
    } else if (selectedMainGroup === null || selectedMainGroup === "") {
      document.getElementById("mainGroup").focus();
    } else if (selectedSubGroup === null || selectedSubGroup === "") {
      document.getElementById("subGroup").focus();
    } else if (selectedProductType === null || selectedProductType === "") {
      document.getElementById("productType").focus();
    } else if (selectedMarket === null || selectedMarket === "") {
      document.getElementById("market").focus();
    } else if (selectedFocusProduct === null || selectedFocusProduct === "") {
      document.getElementById("focusProduct").focus();
    } else if (selectedCaf === null || selectedCaf === "") {
      document.getElementById("caf").focus();
    } else if (
      selectedProductionStatus === null ||
      selectedProductionStatus === ""
    ) {
      document.getElementById("productionStatus").focus();
    } else if (selectedSalesStatus === null || selectedSalesStatus === "") {
      document.getElementById("salesStatus").focus();
    } else if (eanCode === null || eanCode === "") {
      document.getElementById("eanCode").focus();
    } else if (
      isPromo === "YES" &&
      (promoFromDate === "" || promoToDate === "")
    ) {
      Swal.fire({
        title: "Oops!",
        html: `Please select promo date create!`,
        icon: "Error",
      });
    } else if (shelfLife === null || shelfLife === "") {
      document.getElementById("shelfLife").focus();
    } 
    // else if (moq === null || moq === "") {
    //   document.getElementById("moq").focus();
    // } 
    else if (weight === null || weight === "") {
      document.getElementById("weight").focus();
    } else if (selectedWeightUnit === null || selectedWeightUnit === "") {
      document.getElementById("weightUnit").focus();
    } else if (selectedInventoryUOM === null || selectedInventoryUOM === "") {
      document.getElementById("inventoryUOM").focus();
    } else if (selectedCustomerType === null || selectedCustomerType === "") {
      document.getElementById("customerType").focus();
    } else if (unitsInPack === null || unitsInPack === "") {
      document.getElementById("unitsInPack").focus();
    } else if (packNetContent === null || packNetContent === "") {
      document.getElementById("packNetContent").focus();
    } else if (
      selectedPackNetContentUOM === null ||
      selectedPackNetContentUOM === ""
    ) {
      document.getElementById("packNetContentUOM").focus();
    } else if (selectedBrand === null || selectedBrand === "") {
      document.getElementById("brand").focus();
    } else if (selectedProductFamily === null || selectedProductFamily === "") {
      document.getElementById("productFamily").focus();
    } else if (selectedProductClass === null || selectedProductClass === "") {
      document.getElementById("productClass").focus();
    } else if (selectedProductLine === null || selectedProductLine === "") {
      document.getElementById("productLine").focus();
    } else {
      return false;
    }
  };
  let str = "";
  const getCretedStr = async (obj) => {
    console.log("object-------", obj);

    if (Object.keys(obj).length === 0) {
      console.log("obj=========", obj);
      str = 0;
      return str;
    }

    for (let key in obj) {
      str += `${key} = "${obj[key]}",`;
    }
    str = "'" + str + "'";
    str = str.replace(",'", "'");
    return str;
  };
  const submit = async (val) => {
    let str = await getParams();
    if (val == 1) {
      if (isPromo === "YES") {
        if (promoFromDate === "" || promoToDate === "") {
          Swal.fire({
            title: "Oops!",
            html: `Please select promo date!`,
            icon: "Error",
          });
        }
      } else if (str == "") {
        Swal.fire({
          title: "Oops!",
          html: `Please change some field for rework!`,
          icon: "Error",
        });
      } else {
        submitForms(str);
      }
    } else if (val == 0) {
      let check_null_value = validation();
      console.log("check_null_value", check_null_value);
      if (check_null_value === false) {
        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "  Ok  ",
          denyButtonText: `Cancle`,
        }).then((result) => {
          if (result.isConfirmed) {
            submitForms((str = "0"));
          }
        });
      }
    }
  };
  const submitForms = async (str) => {
    if (str) {
      console.log("DATA ---", str);
    }

    setSubmitDisable(true);
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: {
        item_flow_type: isReplacement == true ? "2" : "1",
        created_by_uid: username,
        item_group_name: selectedItemGroupName,
        item_group_code: selectedItemGroupCode,
        purchase_item: isPurchaseItem,
        inventory_item: isInventoryItem,
        sell_item: isSellItem,
        billing_uom: selectedSaleUnitMeasure,
        packing_type: selectedPackingType,
        division: selectedDivision,
        prc_name: selectedPrc,
        // prod_category: "Dessert Mixes", //selectedProdCategory,
        prod_category: selectedProdCategory,
        main_group: selectedMainGroup,
        sub_group: selectedSubGroup,
        shelf_life: shelfLife,
        moq: "1",
        units_in_a_pack: unitsInPack,
        pack_type: selectedCustomerType,
        weight: weight,
        weight_uom: selectedWeightUnit,
        inventory_uom: selectedInventoryUOM,
        new_production: selectedNewProduction,
        product_type: selectedProductType,
        market: selectedMarket,
        focus_product: selectedFocusProduct,
        portfolio: selectedCaf,
        production_status: selectedProductionStatus,
        sales_status: selectedSalesStatus,
        promo_from_date: `${
          promoFromDate !== "" ? promoFromDate.toISOString().split("T")[0] : ""
        }`,
        promo_to_date: `${
          promoToDate !== "" ? promoToDate.toISOString().split("T")[0] : ""
        }`,
        special_attribute: specialAttribute,
        parent_code: isReplacement ? data.parent_code : null,
        parent_code_desc: parentCodeDescription,
        brand: selectedBrand,
        product_family: selectedProductFamily,
        product_class: selectedProductClass,
        product_line: selectedProductLine,
        flavour: selectedFlavour,
        itemdesc: itemCodeDescription,
        combo_flag: isCombo,
        promo_flag: isPromo,
        ean: eanCode,
        fac_sec_category: faSecCategory,
        phase_in_flag: selectedPhaseInFlag,
        pack_net_content: packNetContent,
        pack_net_content_uom: selectedPackNetContentUOM,
        status_code: "1",
        changed_str: str,
        doc_no:
          (data != null || data != undefined) && data.docno ? data.docno : "0",
      },
      path: "createItem",
    };
    let response = await APIWrapper(reqParam);

    if (response["status"] == "success") {
      // console.log("response", response);
      Swal.fire({
        title: "Success!",
        // html: "Item submitted successfully.",
        html: response.data,

        icon: "Success",
      });
      setIsSubmissionSuccess(true);
      resetSelections();
    } else {
      Swal.fire({
        title: "Oops!",
        // html: "Some error occured.",
        html: `${response.data ? response.data : "Some error occured."}`,
        icon: "Error",
      });
      setSubmitDisable(false);
    }
  };

  const getParams = async () => {
    var str1 = JSON.stringify(changed_str);
    if (str1.length > 2) {
      str1 = str1
        .replace(/{/g, "'")
        .replace(/}/g, "'")
        .replace(/:/g, "=");
      str1 = str1
        .replace(/"=/g, "=")
        .replace(/,"/g, ",")
        .replace(/'"/g, "'");


      return str1;
    } else {
      return "0";
    }
    // return str_change;
  };
  const approve = async () => {
    setApproveDisable(true);
    let str = await getParams();
    if (str == "{}") {
      str = "0";
    }
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: {
        docno: data.docno,
        userid: localStorage.getItem("username"),
        approver_remarks: reviewComments,
        changed_str: str,
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
      setIsApproveSuccess(true);
    } else {
      Swal.fire({
        title: "Oops!",
        html: "Some error occured.",
        icon: "Error",
      });
      setApproveDisable(false);
    }
  };

  const reject = async () => {
    if (reviewComments === null || reviewComments === "") {
      Swal.fire({
        title: "Review comment is mandatory!",
        showCancelButton: false,
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          document.getElementById("reviewComments").focus();
        }
      });
    } else {     
    
    setRejectDisable(true);

    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: {
        docno: data.docno,
        userid: localStorage.getItem("username"),
        approver_remarks: reviewComments
      },
      path: "rejectItem"
    }

    let response = await APIWrapper(reqParam);

    if (response["status"] == "success") {
      Swal.fire({
        title: "Success!",
        html: "Item Rejected successfully.",
        icon: "Success",
      });
    setIsReworkSuccess(true);
    } else {
      Swal.fire({
        title: "Oops!",
        html: "Some error occured.",
        icon: "Error",
      });
    setReworkDisable(false);
    }

  }
};

  const rework = async () => {
    if (reviewComments === null || reviewComments === "") {
      Swal.fire({
        title: "Review comment is mandatory!",
        showCancelButton: false,
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          document.getElementById("reviewComments").focus();
        }
      });
    } else {
      setReworkDisable(true);
      let reqParam = {
        headers: getHead(),
        requestType: "POST",
        requestBody: { docno: data.docno, remarks: reviewComments },
        path: "rework",
      };

      let response = await APIWrapper(reqParam);
      
      if (response["status"] == "success") {
        Swal.fire({
          title: "Success!",
          html: "Rework remarks submitted successfully.",
          icon: "Success",
        });
        setIsReworkSuccess(true);
      } else {
        Swal.fire({
          title: "Oops!",
          html: "Some error occured.",
          icon: "Error",
        });
        setReworkDisable(false);
      }
    }
  };

  const resetSelections = () => {
    //setIsReplacement(null);
    setSelectedItemGroupName(null);
    setSelectedItemGroupCode(null);
    setIsPurchaseItem("NO");
    setIsInventoryItem("NO");
    setIsSellItem("NO");
    setSelectedSaleUnitMeasure(null);
    setSelectedPackingType(null);
    setSelectedDivision(null);
    setSelectedPRC(null);
    setSelectedProdCategory(null); //"Dessert Mixes",//,
    setSelectedMainGroup(null);
    setSelectedSubGroup(null);
    setShelfLife("");
    setMOQ("");
    setUnitsInPack("");
    setSelectedCustomerType(null);
    setWeight("");
    setSelectedWeightUnit(null);
    setSelectedInventoryUOM(null);
    setSelectedNewProduction(null);
    setSelectedProductType(null);
    setSelectedMarket(null); //"Domestic",//selectedMarket,
    setSelectedFocusProduct(null);
    setSelectedCAF(null);
    setSelectedProductionStatus(null);
    setSelectedSalesStatus(null);
    // setPromoFromDate(new Date(+new Date() + 86400000));
    setPromoFromDate("");

    // setPromoToDate(new Date());
    setPromoToDate("");

    //  special_attribute: specialAttribute,
    setParentCode("");
    setParentCodeDescription("");
    setSelectedBrand(null);
    setSelectedProductFamily(null); // "Dessert Mixes & RTE",//,
    setSelectedProductClass(null);
    setSelectedProductLine(null);
    setSelectedFlavour(null);
    setItemCodeDescription("");
    setIsCombo("NO");
    setIsPromo("NO");
    setEANCode(null);
    setFASecCategory("");
    setSelectedPhaseInFlag(null);
    setPackNetContent("");
    setSelectedPackNetContentUOM(null);
    // setStatusCode(null)
  };

  const getLOVMapping = async () => {
    // alert("asdkj");
    let reqParam = {
      headers: getHead(),
      requestType: "GET",
      requestBody: {},
      path: "getLOVMapping",
    };
    let response = await APIWrapper(reqParam);
    if (response["status"] == "success") {
      setLOVMapping(response["data"]);
    }
    // else {
    //   getLOVMapping();
    // }
  };

  useEffect(() => {
    if (
      localStorage.getItem("RoleId") == "1" &&
      (data != undefined || !isReplacement)
    ) {
      getLOVMapping();
    } else if (
      data != undefined &&
      localStorage.getItem("RoleId") == data.status
    ) {
      getLOVMapping();
    }
  }, []);

  const getItemGroupName = async (a) => {
    if(a === true){
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: {
        field_code: lovMapping.filter(
          (e) => e.lov_field_name == "Item Group Name"
        )[0]["lov_code"],
      },
      path: "getLovDetails",
    };
    // console.log(
    //   "request for lov is:",
    //   lovMapping.filter((e) => e.lov_field_name == "Item Group Name")[0][
    //     "lov_code"
    //   ]
    // );
    let response = await APIWrapper(reqParam);
    if (response["status"] == "success") {
      setItemGroupName(response["data"]);
    }
  }

  
  };

  const getSaleUnitMeasure = async (refreshFlag) => {
    if(refreshFlag===true){
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: {
        field_code: lovMapping.filter(
          (e) => e.lov_field_name == "Sale Unit Measure"
        )[0]["lov_code"],
      },
      path: "getLovDetails",
    };
    // console.log(
    //   "request for lov is:",
    //   lovMapping.filter((e) => e.lov_field_name == "Sale Unit Measure")[0][
    //     "lov_code"
    //   ]
    // );
    let response = await APIWrapper(reqParam);
    if (response["status"] == "success") {
      setSaleUnitMeasure(response["data"]);
    }
  }
  };

  const getPackingType = async (refreshFlag) => {
    if(refreshFlag===true){
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: {
        field_code: lovMapping.filter(
          (e) => e.lov_field_name == "Packing Type"
        )[0]["lov_code"],
      },
      path: "getLovDetails",
    };
    // console.log(
    //   "request for lov is:",
    //   lovMapping.filter((e) => e.lov_field_name == "Packing Type")[0][
    //     "lov_code"
    //   ]
    // );
    let response = await APIWrapper(reqParam);
    if (response["status"] == "success") {
      setPackingType(response["data"]);
    }
  }
  };

  const getDivision = async (refreshFlag) => {
    if(refreshFlag===true){
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: {
        field_code: lovMapping.filter((e) => e.lov_field_name == "Division")[0][
          "lov_code"
        ],
      },
      path: "getLovDetails",
    };
    // console.log(
    //   "request for lov is:",
    //   lovMapping.filter((e) => e.lov_field_name == "Division")[0]["lov_code"]
    // );
    let response = await APIWrapper(reqParam);
    if (response["status"] == "success") {
      setDivision(response["data"]);
    }
  }
  };

  const getPRC = async (refreshFlag) => {
    if(refreshFlag===true){
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: {
        field_code: lovMapping.filter((e) => e.lov_field_name == "PRC name")[0][
          "lov_code"
        ],
      },
      path: "getLovDetails",
    };
    // console.log(
    //   "request for lov is:",
    //   lovMapping.filter((e) => e.lov_field_name == "PRC name")[0]["lov_code"]
    // );
    let response = await APIWrapper(reqParam);
    if (response["status"] == "success") {
      setPRC(response["data"]);
    }
  }
  };

  const getCustomerType = async (refreshFlag) => {
    if(refreshFlag===true){
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: {
        field_code: lovMapping.filter(
          (e) => e.lov_field_name == "Customer Type"
        )[0]["lov_code"],
      },
      path: "getLovDetails",
    };
    // console.log(
    //   "request for lov is:",
    //   lovMapping.filter((e) => e.lov_field_name == "Customer Type")[0][
    //     "lov_code"
    //   ]
    // );
    let response = await APIWrapper(reqParam);
    if (response["status"] == "success") {
      setCustomerType(response["data"]);
    }
  }
  };

  const getWeightUnit = async (refreshFlag) => {
    if(refreshFlag===true){
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: {
        field_code: lovMapping.filter(
          (e) => e.lov_field_name == "Weight Unit"
        )[0]["lov_code"],
      },
      path: "getLovDetails",
    };
    // console.log(
    //   "request for lov is:",
    //   lovMapping.filter((e) => e.lov_field_name == "Weight Unit")[0]["lov_code"]
    // );
    let response = await APIWrapper(reqParam);
    if (response["status"] == "success") {
      setWeightUnit(response["data"]);
    }
  }
  };


  const calcNetWeight = async () => {
    document.getElementById("weight").value=unitsInPack*packNetContent;
  }; 

  const getInventoryUOM = async (refreshFlag) => {
    if(refreshFlag===true){
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: {
        field_code: lovMapping.filter(
          (e) => e.lov_field_name == "Inventory UOM"
        )[0]["lov_code"],
      },
      path: "getLovDetails",
    };
    // console.log(
    //   "request for lov is:",
    //   lovMapping.filter((e) => e.lov_field_name == "Inventory UOM")[0][
    //     "lov_code"
    //   ]
    // );
    let response = await APIWrapper(reqParam);
    if (response["status"] == "success") {
      setInventoryUOM(response["data"]);
    }
  }
  };

  const getPackNetContentUOM = async (refreshFlag) => {
    if (refreshFlag===true){
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: {
        field_code: lovMapping.filter(
          (e) => e.lov_field_name == "Pack Net Content (UOM)"
        )[0]["lov_code"],
      },
      path: "getLovDetails",
    };
    // console.log(
    //   "request for lov is:",
    //   lovMapping.filter((e) => e.lov_field_name == "Pack Net Content (UOM)")[0][
    //     "lov_code"
    //   ]
    // );
    let response = await APIWrapper(reqParam);
    if (response["status"] == "success") {
      setPackNetContentUOM(response["data"]);
    }
  }
  };

  const getNewProduction = async (refreshFlag) => {
    if(refreshFlag===true){
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: {
        field_code: lovMapping.filter(
          (e) => e.lov_field_name == "New Production"
        )[0]["lov_code"],
      },
      path: "getLovDetails",
    };
    // console.log(
    //   "request for lov is:",
    //   lovMapping.filter((e) => e.lov_field_name == "New Production")[0][
    //     "lov_code"
    //   ]
    // );
    let response = await APIWrapper(reqParam);
    if (response["status"] == "success") {
      setNewProduction(response["data"]);
    }
  }
  };

  const getProductType = async (refreshFlag) => {
    if(refreshFlag===true){
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: {
        field_code: lovMapping.filter(
          (e) => e.lov_field_name == "Product Type"
        )[0]["lov_code"],
      },
      path: "getLovDetails",
    };

    let response = await APIWrapper(reqParam);
    if (response["status"] == "success") {
      setProductType(response["data"]);
    }
  }
  };

  const getMarket = async (refreshFlag) => {
    if(refreshFlag===true){
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: {
        field_code: lovMapping.filter((e) => e.lov_field_name == "Market")[0][
          "lov_code"
        ],
      },
      path: "getLovDetails",
    };
    // console.log(
    //   "request for lov is:",
    //   lovMapping.filter((e) => e.lov_field_name == "Market")[0]["lov_code"]
    // );
    let response = await APIWrapper(reqParam);
    if (response["status"] == "success") {
      setMarket(response["data"]);
    }
  }
  };

  const getFocusProduct = async (refreshFlag) => {
    if(refreshFlag===true){
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: {
        field_code: lovMapping.filter(
          (e) => e.lov_field_name == "Focus Product"
        )[0]["lov_code"],
      },
      path: "getLovDetails",
    };
    // console.log(
    //   "request for lov is:",
    //   lovMapping.filter((e) => e.lov_field_name == "Focus Product")[0][
    //     "lov_code"
    //   ]
    // );
    let response = await APIWrapper(reqParam);
    if (response["status"] == "success") {
      setFocusProduct(response["data"]);
    }
  }
  };

  const getCAF = async (refreshFlag) => {
    if(refreshFlag===true){
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: {
        field_code: lovMapping.filter((e) => e.lov_field_name == "CAF")[0][
          "lov_code"
        ],
      },
      path: "getLovDetails",
    };
    // console.log(
    //   "request for lov is:",
    //   lovMapping.filter((e) => e.lov_field_name == "CAF")[0]["lov_code"]
    // );
    let response = await APIWrapper(reqParam);
    if (response["status"] == "success") {
      setCAF(response["data"]);
    }
  }
  };

  const getProductionStatus = async (refreshFlag) => {
    if(refreshFlag===true){
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: {
        field_code: lovMapping.filter(
          (e) => e.lov_field_name == "Production Status"
        )[0]["lov_code"],
      },
      path: "getLovDetails",
    };
    // console.log(
    //   "request for lov is:",
    //   lovMapping.filter((e) => e.lov_field_name == "Production Status")[0][
    //     "lov_code"
    //   ]
    // );
    //setProductionStatus("Inactive");

    let response = await APIWrapper(reqParam);
     if (response["status"] == "success") {
       setProductionStatus(response["data"]);
       console.log(response["data"]);

     }
    }
  };

  const getSalesStatus = async (refreshFlag) => {
    if(refreshFlag===true){
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: {
        field_code: lovMapping.filter(
          (e) => e.lov_field_name == "Sales Status"
        )[0]["lov_code"],
      },
      path: "getLovDetails",
    };
    // console.log(
    //   "request for lov is:",
    //   lovMapping.filter((e) => e.lov_field_name == "Sales Status")[0][
    //     "lov_code"
    //   ]
    // );
    let response = await APIWrapper(reqParam);
    if (response["status"] == "success") {
      setSalesStatus(response["data"]);
    }
  }
  };



  const getPhaseInFlag = async (refreshFlag) => {
    if(refreshFlag===true){
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: {
        field_code: lovMapping.filter(
          (e) => e.lov_field_name == "Phase In Flag"
        )[0]["lov_code"],
      },
      path: "getLovDetails",
    };

    let response = await APIWrapper(reqParam);
    if (response["status"] == "success") {
      setPhaseInFlag(response["data"]);
    }
  }
  };

  const [changed_str, setChanged_str] = useState({});

  const createString = (key, value) => {
    changed_str[key] = value;
    setChanged_str({ ...changed_str, [key]: value });
  };

  return (
    <form>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f7fbfd",
          alignItems: "flex-start",
          marginLeft: "30px",
          marginTop: "15px",
          marginBottom: "15px",
        }}
      >
        
        <div
          style={{
            backgroundColor: "#3895d3",
            width: "100%",
            textAlign: "left",
            height: "25px",
            marginTop: "10px",
          }}
          className="partitionDiv"
        >
          <p>SAP Product Hierarchy Fields</p>
        </div>
        <div
          className="divItem"
          style={{
            marginTop: "15px",
            marginBottom: "10px",
          }}
        >
          
          <label className="inputLabel" htmlFor="itemGroupName">
            Item Group Name
          </label>

          <select
            className="lov"
            id="itemGroupName"
            name="itemGroupName"
            onChange={(e) => {
              var index = e.nativeEvent.target.selectedIndex;
              setSelectedItemGroupName(e.nativeEvent.target[index].text);
              setSelectedItemGroupCode(e.target.value);
              createString("item_group_name", e.nativeEvent.target[index].text);
              
            }}
            
            disabled={isDisabled || isReplacement}
            
            
          >
            {data !== undefined && !isReplacement ? (
              
              <>
                <option value=" ">{data.item_group_name}</option>
                {itemGroupName.map((i) => (
                  <option
                    value={i.lov_id}
                    selected={
                      data.item_group_name === i.lov_value ? true : false
                    }
                  >
                    {i.lov_value}
                  </option>
                ))}
              </>
            ) : (
              <>
                {data !== undefined && isReplacement ? (
                  <>
                    <option value=" ">
                      {data.item_group_name ? data.item_group_name : "Select"}
                    </option>
                    {itemGroupName.map((i) => (
                      <option
                        value={i.lov_id}
                        selected={
                          data.item_group_name === i.lov_value ? true : false
                        }
                      >
                        {i.lov_value}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    <option value=" ">Select</option>
                    {itemGroupName.map((i) => (
                      <option value={i.lov_id}>{i.lov_value}</option>
                    ))}
                  </>
                )}
              </>
            )}
          </select>
          <i
            class="fa fa-refresh"
            style={{
              marginTop: "8px",
              display: `${
                Role_Id == "1" ||Role_Id == "2" || Role_Id == "3" || isReplacement || isDisabled
                  ? "none"
                  : ""
              }`,
            }}
            onClick={() => {
              getItemGroupName(true);
            }}
            aria-hidden="true"
          ></i>
        </div>

        <div>
          <label className="inputLabel" htmlFor="saleUnitMeasure">
            Billing UOM
          </label>
          <select
            className="lov"
            id="saleUnitMeasure"
            onChange={(e) => {
              var index = e.nativeEvent.target.selectedIndex;
              setSelectedSaleUnitMeasure(e.nativeEvent.target[index].text);
              createString("billing_uom", e.nativeEvent.target[index].text);

            }}
            name="saleUnitMeasure"
            disabled={isDisabled || isReplacement}
          >
            {data !== undefined && !isReplacement ? (
              <>
                <option value=" ">{data.billing_uom}</option>
                {saleUnitMeasure.map((i) => (
                  <option
                    value={i.lov_id}
                    selected={data.billing_uom === i.lov_value ? true : false}
                  >
                    {i.lov_value}
                  </option>
                ))}
              </>
            ) : (
              <>
                {data !== undefined && isReplacement ? (
                  <>
                    <option value=" ">
                      {data.billing_uom ? data.billing_uom : "Select"}
                    </option>
                    {saleUnitMeasure.map((i) => (
                      <option
                        value={i.lov_id}
                        selected={
                          data.billing_uom === i.lov_value ? true : false
                        }
                      >
                        {i.lov_value}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    <option value=" ">Select</option>
                    {saleUnitMeasure.map((i) => (
                      <option value={i.lov_id}>{i.lov_value}</option>
                    ))}
                  </>
                )}
              </>
            )}
          </select>
          <i
            class="fa fa-refresh"
            style={{
              marginTop: "8px",
              display: `${
                Role_Id == "1" || Role_Id == "2" || Role_Id == "3" || isReplacement ? "none" : ""
              }`,
            }}
            onClick={() => getSaleUnitMeasure(true)}
            aria-hidden="true"
          ></i>
        </div>
        <div>
          <label className="inputLabel" htmlFor="packingType">
            FG Container
          </label>
          <select
            className="lov"
            id="packingType"
            onChange={(e) => {
              var index = e.nativeEvent.target.selectedIndex;
              setSelectedPackingType(e.nativeEvent.target[index].text);
              createString("packing_type", e.nativeEvent.target[index].text);
            }}
            name="packingType"
            disabled={isDisabled || isReplacement}
          >
            {data !== undefined && !isReplacement ? (
              // <option value={data.packing_type} selected>
              //   {" "}
              //   {data.packing_type}{" "}
              // </option>
              <>
                <option value=" ">{data.packing_type}</option>
                {packingType.map((i) => (
                  <option
                    value={i.lov_id}
                    selected={data.packing_type === i.lov_value ? true : false}
                  >
                    {i.lov_value}
                  </option>
                ))}
              </>
            ) : (
              <>
                {data !== undefined && isReplacement ? (
                  <>
                    <option value=" ">
                      {data.packing_type ? data.packing_type : "Select"}
                    </option>
                    {packingType.map((i) => (
                      <option
                        value={i.lov_id}
                        selected={
                          data.packing_type === i.lov_value ? true : false
                        }
                      >
                        {i.lov_value}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    <option value=" ">Select</option>
                    {packingType.map((i) => (
                      <option value={i.lov_id}>{i.lov_value}</option>
                    ))}
                  </>
                )}
              </>
            )}
          </select>
          <i
            class="fa fa-refresh"
            style={{
              marginTop: "8px",
              display: `${
                Role_Id == "1" || Role_Id == "2" || Role_Id == "3" || isReplacement ? "none" : ""
              }`,
            }}
            onClick={() => getPackingType(true)}
            aria-hidden="true"
          ></i>
        </div>
        <div>
          <label className="inputLabel" htmlFor="newProduction">
            New Production
          </label>
          <select
            className="lov"
            id="newProduction"
            onChange={(e) => {
              var index = e.nativeEvent.target.selectedIndex;
              setSelectedNewProduction(e.nativeEvent.target[index].text);
              createString("new_production", e.nativeEvent.target[index].text);
            }}
            name="newProduction"
            disabled={isDisabled || isReplacement}
          >
            {data !== undefined && !isReplacement ? (
              <>
                <option value=" ">{data.new_production}</option>
                {newProduction.map((i) => (
                  <option
                    value={i.lov_id}
                    selected={
                      data.new_production === i.lov_value ? true : false
                    }
                  >
                    {i.lov_value}
                  </option>
                ))}
              </>
            ) : (
              <>
                {data !== undefined && isReplacement ? (
                  <>
                    <option value=" ">
                      {data.new_production ? data.new_production : "Select"}
                    </option>
                    {newProduction.map((i) => (
                      <option
                        value={i.lov_id}
                        selected={
                          data.new_production === i.lov_value ? true : false
                        }
                      >
                        {i.lov_value}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    <option value=" ">Select</option>
                    {newProduction.map((i) => (
                      <option value={i.lov_id}>{i.lov_value}</option>
                    ))}
                  </>
                )}
              </>
            )}
          </select>
          <i
            class="fa fa-refresh"
            style={{
              marginTop: "8px",
              display: `${
                Role_Id == "1" || Role_Id == "2" || Role_Id == "3" || isReplacement ? "none" : ""
              }`,
            }}
            onClick={() => getNewProduction(true)}
            aria-hidden="true"
          ></i>
        </div>
        <div>
          <label className="inputLabel" htmlFor="division">
            Division
          </label>
          <select
            className="lov"
            id="division"
            onChange={(e) => {
              var index = e.nativeEvent.target.selectedIndex;
              setSelectedDivision(e.nativeEvent.target[index].text);
              createString("division", e.nativeEvent.target[index].text);
            }}
            name="division"
            disabled={isDisabled || isReplacement}
          >
            {data !== undefined && !isReplacement ? (
              <>
                <option value=" ">{data.division}</option>
                {division.map((i) => (
                  <option
                    value={i.lov_id}
                    selected={data.division === i.lov_value ? true : false}
                  >
                    {i.lov_value}
                  </option>
                ))}
              </>
            ) : (
              <>
                {data !== undefined && isReplacement ? (
                  <>
                    <option value=" ">
                      {data.division ? data.division : "Select"}
                    </option>
                    {division.map((i) => (
                      <option
                        value={i.lov_id}
                        selected={data.division === i.lov_value ? true : false}
                      >
                        {i.lov_value}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    <option value=" ">Select</option>
                    {division.map((i) => (
                      <option value={i.lov_id}>{i.lov_value}</option>
                    ))}
                  </>
                )}
              </>
            )}
          </select>
          <i
            class="fa fa-refresh"
            style={{
              marginTop: "8px",
              display: `${
                Role_Id == "1" || Role_Id == "2" || Role_Id == "3" || isReplacement ? "none" : ""
              }`,
            }}
            onClick={() => getDivision(true)}
            aria-hidden="true"
          ></i>
        </div>
        <div>
          <label className="inputLabel" htmlFor="prc">
            PRC Name
          </label>
          <select
            className="lov"
            id="prc"
            onChange={(e) => {
              var index = e.nativeEvent.target.selectedIndex;
              setSelectedPRC(e.nativeEvent.target[index].text);
              createString("prc_name", e.nativeEvent.target[index].text);
            }}
            name="prc"
            disabled={isDisabled || isReplacement}
          >
            {data !== undefined && !isReplacement ? (
              // <option value={data.prc_name} selected>
              //   {" "}
              //   {data.prc_name}{" "}
              // </option>
              <>
                <option value=" ">{data.prc_name}</option>
                {prc.map((i) => (
                  <option
                    value={i.lov_id}
                    selected={data.prc_name === i.lov_value ? true : false}
                  >
                    {i.lov_value}
                  </option>
                ))}
              </>
            ) : (
              <>
                {data !== undefined && isReplacement ? (
                  <>
                    <option value=" ">
                      {data.prc_name ? data.prc_name : "Select"}
                    </option>
                    {prc.map((i) => (
                      <option
                        value={i.lov_id}
                        selected={data.prc_name === i.lov_value ? true : false}
                      >
                        {i.lov_value}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    <option value=" ">Select</option>
                    {prc.map((i) => (
                      <option value={i.lov_id}>{i.lov_value}</option>
                    ))}
                  </>
                )}
              </>
            )}
          </select>
          <i
            class="fa fa-refresh"
            style={{
              marginTop: "8px",
              display: `${
                Role_Id == "1" || Role_Id == "2" || Role_Id == "3" || isReplacement ? "none" : ""
              }`,
            }}
            onClick={() => getPRC(true)}
            aria-hidden="true"
          ></i>
        </div>
        <div>
          {/* </div> */}
          {/* <div  style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#f7fbfd",
          alignItems: "flex-start",
        }}>   */}
          <MainGroup
            Role_Id={Role_Id}
            itemData={data}
            setSelectedProdCategory={setSelectedProdCategory}
            setSelectedMainGroup={setSelectedMainGroup}
            setSelectedSubGroup={setSelectedSubGroup}
            isReplacement={isReplacement}
            // disabled={isDisabled}
            disabled={data != undefined ? true : false}
          />{" "}
        </div>
        <div>
          <label className="inputLabel" htmlFor="productType">
            Product Type
          </label>
          <select
            className="lov"
            id="productType"
            onChange={(e) => {
              var index = e.nativeEvent.target.selectedIndex;
              setSelectedProductType(e.nativeEvent.target[index].text);
              createString("product_type", e.nativeEvent.target[index].text);
            }}
            name="productType"
            disabled={isDisabled || isReplacement}
          >
            {data !== undefined && !isReplacement ? (
              // <option value={data.product_type} selected>
              //   {" "}
              //   {data.product_type}{" "}
              // </option>
              <>
                <option value="">{data.product_type}</option>
                {productType.map((i, key) => (
                  <option
                    value={i.lov_id}
                    selected={data.product_type === i.lov_value ? true : false}
                  >
                    {i.lov_value}
                  </option>
                ))}
              </>
            ) : (
              <>
                {data !== undefined && isReplacement ? (
                  <>
                    <option value="">
                      {data.product_type ? data.product_type : "Select"}
                    </option>

                  </>
                ) : (
                  <>
                    <option value=" ">Select</option>
                    {productType.map((i) => (
                      <option value={i.lov_id}>{i.lov_value}</option>
                    ))}
                  </>
                )}
              </>
            )}
          </select>
          <i
            class="fa fa-refresh"
            style={{
              marginTop: "8px",
              display: `${
                Role_Id == "1" || Role_Id == "2" || Role_Id == "3" || isReplacement ? "none" : ""
              }`,
            }}
            onClick={() => getProductType(true)}
            aria-hidden="true"
          ></i>
        </div>
        <div>
          <label className="inputLabel" htmlFor="market">
            Market
          </label>
          <select
            className="lov"
            id="market"
            onChange={(e) => {
              var index = e.nativeEvent.target.selectedIndex;
              setSelectedMarket(e.nativeEvent.target[index].text);
              // createString("market", e.nativeEvent.target[index].text);
            }}
            name="market"
            disabled={isDisabled || isReplacement}
            // disabled={data != undefined ? true : false}
          >
            {data !== undefined && !isReplacement ? (
              // <option value={data.market} selected>
              //   {" "}
              //   {data.market}{" "}
              // </option>
              <>
                <option value=" ">{data.market}</option>
                {market.map((i) => (
                  <option
                    value={i.lov_id}
                    selected={data.market === i.lov_value ? true : false}
                  >
                    {i.lov_value}
                  </option>
                ))}
              </>
            ) : (
              <>
                {data !== undefined && isReplacement ? (
                  <>
                    <option value=" ">
                      {data.market ? data.market : "Select"}
                    </option>
                    {market.map((i) => (
                      <option
                        value={i.lov_id}
                        selected={data.market === i.lov_value ? true : false}
                      >
                        {i.lov_value}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    <option value=" ">Select</option>
                    {market.map((i) => (
                      <option value={i.lov_id}>{i.lov_value}</option>
                    ))}
                  </>
                )}
              </>
            )}
          </select>
          <i
            class="fa fa-refresh"
            style={{
              marginTop: "8px",
              display: `${
                Role_Id == "1" || Role_Id == "2" || Role_Id == "3" || isReplacement ? "none" : ""
              }`,
            }}
            onClick={() => getMarket(true)}
            aria-hidden="true"
          ></i>
        </div>

        <div>
          {" "}
          <label className="inputLabel" htmlFor="focusProduct">
            Focus Product
          </label>
          <select
            className="lov"
            id="focusProduct"
            onChange={(e) => {
              var index = e.nativeEvent.target.selectedIndex;
              setSelectedFocusProduct(e.nativeEvent.target[index].text);
              createString("focus_product", e.nativeEvent.target[index].text);
            }}
            name="focusProduct"
            disabled={isDisabled || isReplacement}
          >
            {data !== undefined && !isReplacement ? (
              // <option value={data.focus_product} selected>
              //   {" "}
              //   {data.focus_product}{" "}
              // </option>
              <>
                <option value=" ">{data.focus_product}</option>
                {focusProduct.map((i) => (
                  <option
                    value={i.lov_id}
                    selected={data.focus_product === i.lov_value ? true : false}
                  >
                    {i.lov_value}
                  </option>
                ))}
              </>
            ) : (
              <>
                {data !== undefined && isReplacement ? (
                  <>
                    <option value=" ">
                      {data.focus_product ? data.focus_product : "Select"}
                    </option>
                    {/* {focusProduct.map((i) => (
                      <option
                        value={i.lov_id}
                        selected={
                          data.focus_product === i.lov_value ? true : false
                        }
                      >
                        {i.lov_value}
                      </option>
                    ))} */}
                  </>
                ) : (
                  <>
                    <option value=" ">Select</option>
                    {focusProduct.map((i) => (
                      <option value={i.lov_id}>{i.lov_value}</option>
                    ))}
                  </>
                )}
              </>
            )}
          </select>
          <i
            class="fa fa-refresh"
            style={{
              marginTop: "8px",
              display: `${
                Role_Id == "1" || Role_Id == "2" || Role_Id == "3" || isReplacement ? "none" : ""
              }`,
            }}
            onClick={() => getFocusProduct(true)}
            aria-hidden="true"
          ></i>
        </div>
        <div>
          <label className="inputLabel" htmlFor="caf">
            Portfolio
          </label>
          <select
            className="lov"
            id="caf"
            onChange={(e) => {
              var index = e.nativeEvent.target.selectedIndex;
              setSelectedCAF(e.nativeEvent.target[index].text);
              createString("portfolio", e.nativeEvent.target[index].text);
            }}
            name="caf"
            disabled={isDisabled || isReplacement}
          >
            {data !== undefined && !isReplacement ? (
              <>
                <option value=" ">{data.portfolio}</option>
                {caf.map((i) => (
                  <option
                    value={i.lov_id}
                    selected={data.portfolio === i.lov_value ? true : false}
                  >
                    {i.lov_value}
                  </option>
                ))}
              </>
            ) : (
              <>
                {data !== undefined && isReplacement ? (
                  <>
                    <option value=" ">
                      {data.portfolio ? data.portfolio : "Select"}
                    </option>
                    {/* {caf.map((i) => (
                      <option
                        value={i.lov_id}
                        selected={data.portfolio === i.lov_value ? true : false}
                      >
                        {i.lov_value}
                      </option>
                    ))} */}
                  </>
                ) : (
                  <>
                    <option value=" ">Select</option>
                    {caf.map((i) => (
                      <option value={i.lov_id}>{i.lov_value}</option>
                    ))}
                  </>
                )}
              </>
            )}
          </select>
          <i
            class="fa fa-refresh"
            style={{
              marginTop: "8px",
              display: `${
                Role_Id == "1" || Role_Id == "2" || Role_Id == "3" || isReplacement ? "none" : ""
              }`,
            }}
            onClick={() => getCAF(true)}
            aria-hidden="true"
          ></i>
        </div>
        <div>
          <label className="inputLabel" htmlFor="productionStatus">
            Production Status
          </label>
          <select
            className="lovHierarchy"
            id="productionStatus"
            style={{ marginLeft: "24px" }}
            onChange={(e) => {
              var index = e.nativeEvent.target.selectedIndex;
              setSelectedProductionStatus(e.nativeEvent.target[index].text);
              createString(
                "production_status",
                e.nativeEvent.target[index].text
              );
            }}
            name="productionStatus"
            disabled={isDisabled}
          >
            {data !== undefined && !isReplacement ? (
              <>
                <option value=" ">{data.production_status}</option>
                {productionStatus.map((i) => (
                  <option
                    value={i.lov_id}
                    selected={
                      data.production_status === i.lov_value ? true : false
                    }
                  >
                    {i.lov_value}
                  </option>
                ))}
              </>
            ) : (
              <>
                {data !== undefined && isReplacement ? (
                  <>
                    <option value=" ">
                      {data.production_status
                        ? data.production_status
                        : "Select"}
                    </option>
                    {productionStatus.map((i) => (
                      <option
                        value={i.lov_id}
                        selected={
                          data.production_status === i.lov_value ? true : false
                        }
                      >
                        {i.lov_value}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    <option value=" ">Select</option>
                    {productionStatus.map((i) => (
                      <option value={i.lov_id}>{i.lov_value}</option>
                    ))}
                  </>
                )}
              </>
            )}
          </select>
          <i
            class="fa fa-refresh"
            style={{
              marginTop: "8px",
              display: `${ Role_Id == "1" || Role_Id == "2" || Role_Id == "3" ? "none" : ""}`,
            }}
            onClick={() => getProductionStatus(true)}
            aria-hidden="true"
          ></i>
          <label className="inputLabel" htmlFor="salesStatus">
            Sales Status
          </label>
          <select
            className="lovHierarchy"
            id="salesStatus"
            onChange={(e) => {
              var index = e.nativeEvent.target.selectedIndex;
              setSelectedSalesStatus(e.nativeEvent.target[index].text);
              createString("sales_status", e.nativeEvent.target[index].text);
            }}
            name="salesStatus"
            disabled={isDisabled}
          >
            {data !== undefined && !isReplacement ? (
              <>
                <option value=" ">{data.sales_status}</option>
                {salesStatus.map((i) => (
                  <option
                    value={i.lov_id}
                    selected={data.sales_status === i.lov_value ? true : false}
                  >
                    {i.lov_value}
                  </option>
                ))}
              </>
            ) : (
              <>
                {data !== undefined && isReplacement ? (
                  <>
                    <option value=" ">
                      {data.sales_status ? data.sales_status : "Select"}
                    </option>
                    {salesStatus.map((i) => (
                      <option
                        value={i.lov_id}
                        selected={
                          data.sales_status === i.lov_value ? true : false
                        }
                      >
                        {i.lov_value}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    <option value=" ">Select</option>
                    {salesStatus.map((i) => (
                      <option value={i.lov_id}>{i.lov_value}</option>
                    ))}
                  </>
                )}
              </>
            )}
          </select>
          <i
            class="fa fa-refresh"
            style={{
              marginTop: "8px",
              display: `${Role_Id == "1" || Role_Id == "2" || Role_Id == "3" ? "none" : ""}`,
            }}
            onClick={() => getSalesStatus(true)}
            aria-hidden="true"
          ></i>
                    <label className="inputLabel" htmlFor="phaseInFlag">
            Running Status
          </label>
          <select
            className="lovHierarchy"
            id="phaseInFlag"
            onChange={(e) => {
              var index = e.nativeEvent.target.selectedIndex;
              setSelectedPhaseInFlag(e.nativeEvent.target[index].text);
              createString("phase_in_flag", e.nativeEvent.target[index].text);
            }}
            name="phaseInFlag"
            disabled={isDisabled}
          >
            {data !== undefined && !isReplacement ? (
              <>
                <option value=" ">{data.phase_in_flag}</option>
                {phaseInFlag.map((i) => (
                  <option
                    value={i.lov_id}
                    selected={data.phase_in_flag === i.lov_value ? true : false}
                  >
                    {i.lov_value}
                  </option>
                ))}
              </>
            ) : (
              <>
                {data !== undefined && isReplacement ? (
                  <>
                    <option value=" ">
                      {data.phase_in_flag ? data.phase_in_flag : "Select"}
                    </option>
                    {phaseInFlag.map((i) => (
                      <option
                        value={i.lov_id}
                        selected={
                          data.phase_in_flag === i.lov_value ? true : false
                        }
                      >
                        {i.lov_value}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    <option value=" ">Select</option>
                    {phaseInFlag.map((i) => (
                      <option value={i.lov_id}>{i.lov_value}</option>
                    ))}
                  </>
                )}
              </>
            )}
          </select>
          <i
            class="fa fa-refresh"
            style={{
              marginTop: "8px",
              display: `${ Role_Id == "1" || Role_Id == "2" || Role_Id == "3" ? "none" : ""}`,
            }}
            onClick={() => getPhaseInFlag(true)}
            aria-hidden="true"
          ></i>
        </div>
        <div
          className="divItem"
          style={{
            // display: "flex",
            // flexDirection: "row",
            // justifyContent: "space-around",
            // backgroundColor: "#f7fbfd",
            // alignItems: "flex-start",
            marginTop: "15px",
          }}
        >
          <label className="inputLabel" htmlFor="eanCode">
            EAN Code
          </label>
          <input
            className="numberInputEAN"
            type="text"
            id="eanCode"
            onChange={(e) => {
              setEANCode(e.target.value);
              createString("ean", e.target.value);
            }}
            style={{ marginLeft: "24px" }}
            name="eanCode"
            value={eanCode ? eanCode : ""}
            disabled={isDisabled}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            backgroundColor: "#f7fbfd",
            alignItems: "flex-start",
            marginTop: "15px",
          }}
        >
          <ToggleSwitch
            label="Purchase Item"
            onChange={onPurchaseItemChange}
            checked={isPurchaseItem == "YES" ? true : false}
            disabled={isDisabled || isReplacement}
          />

          <ToggleSwitch
            label="Inventory Item"
            onChange={onInventoryItemChange}
            checked={isInventoryItem == "YES" ? true : false}
            disabled={isDisabled || isReplacement}
          />
          <ToggleSwitch
            label="Sell Item"
            onChange={onSellItemChange}
            checked={isSellItem == "YES" ? true : false}
            disabled={isDisabled || isReplacement}
          />
          <ToggleSwitch
            label="Combo Flag"
            onChange={onComboChange}
            checked={isCombo == "YES" ? true : false}
            disabled={isDisabled}
          />
          <ToggleSwitch
            label="Promo Flag"
            onChange={onPromoChange}
            checked={isPromo == "YES" ? true : false}
            disabled={isDisabled}
          />
        </div>
        {isPromo == "YES" ? (
          <div
            className="divItem"
            style={{
              // flex: 1,
              // display: "flex",
              // flexDirection: "row",
              // justifyContent: "space-between",
              // backgroundColor: "#f7fbfd",
              // alignItems: "flex-start",
              marginLeft: "0px",
              marginTop: "15px",
            }}
            id="datePicker"
          >
            <label className="inputLabel">Promo From Date</label>
            <DatePicker
              id="promoFromDate"
              minDate={new Date(+new Date() + 86400000)}
              onChange={(date) => {
                setPromoFromDate(date);
                createString("promoFromDate", date);
              }}
              value={promoFromDate ? promoFromDate : ""}
              onKeyDown={(e) => {
                e.preventDefault();
              }}
            />
            <label className="inputLabel">Promo To Date</label>
            <DatePicker
              onChange={(date) => {
                setPromoToDate(date);
                createString("promoToDate", date);
              }}
              minDate={promoFromDate}
              value={promoToDate ? promoToDate : ""}
              onKeyDown={(e) => {
                e.preventDefault();
              }}
            />
          </div>
        ) : (
          <></>
        )}
        <div
          style={{
            backgroundColor: "#3895d3",
            width: "100%",
            textAlign: "left",
            height: "25px",
            marginTop: "10px",
          }}
          className="partitionDiv"
        >
          <p>SAP Product Dimension</p>
        </div>
        <div
          className="divItem"
          style={{
            marginTop: "15px",
            marginBottom: "10px",
          }}
        >
          <label className="inputLabel" htmlFor="shelfLife">
            Shelf Life(Days)
          </label>
          <input
            className="numberInput"
            type="number"
            style={{ marginLeft: "5px" }}
            id="shelfLife"
            onChange={(e) => {
              setShelfLife(e.target.value);
              createString("shelfLife", e.target.value);
            }}
            name="shelfLife"
            value={shelfLife ? shelfLife : ""}
            disabled={isDisabled}
          />
          

          <input
            className="numberInput"
            type="hidden"
            id="moq"
            onChange={(e) => setMOQ(e.target.value)}
            name="moq"
            value={moq ? moq : "1"}
            disabled
          />
         
          <label className="inputLabel" htmlFor="inventoryUOM">
            Inventory UOM
          </label>
          <select
            style={{ marginLeft: "24px" }}
            className="lovHierarchy"
            id="inventoryUOM"
            onChange={(e) => {
              var index = e.nativeEvent.target.selectedIndex;
              setSelectedInventoryUOM(e.nativeEvent.target[index].text);
            }}
            name="inventoryUOM"
            disabled={isDisabled}
          >
            {data !== undefined && !isReplacement ? (
              // <option value={data.inventory_uom} selected>
              //   {" "}
              //   {data.inventory_uom}{" "}
              // </option>
              <>
                <option value=" ">{data.inventory_uom}</option>
                {inventoryUOM.map((i) => (
                  <option
                    value={i.lov_id}
                    selected={data.inventory_uom === i.lov_value ? true : false}
                  >
                    {i.lov_value}
                  </option>
                ))}
              </>
            ) : (
              <>
                {data !== undefined && isReplacement ? (
                  <>
                    <option value=" ">
                      {data.inventory_uom ? data.inventory_uom : "Select"}
                    </option>
                    {inventoryUOM.map((i) => (
                      <option
                        value={i.lov_id}
                        selected={
                          data.inventory_uom === i.lov_value ? true : false
                        }
                      >
                        {i.lov_value}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    <option value=" ">Select</option>
                    {inventoryUOM.map((i) => (
                      <option value={i.lov_id}>{i.lov_value}</option>
                    ))}
                  </>
                )}
              </>
            )}
          </select>
          <i
            class="fa fa-refresh"
            style={{
              marginTop: "8px",
              display: `${Role_Id == "1" || Role_Id == "2" || Role_Id == "3" ? "none" : ""}`,
            }}
            onClick={() => getInventoryUOM(true)}
            aria-hidden="true"
          ></i>
          <label className="inputLabel" htmlFor="customerType">
            Pack Type
          </label>
          <select
            className="lovHierarchy"
            id="customerType"
            style={{ marginLeft: "24px" }}
            onChange={(e) => {
              var index = e.nativeEvent.target.selectedIndex;
              setSelectedCustomerType(e.nativeEvent.target[index].text);
            }}
            name="customerType"
            // disabled={isDisabled}
            disabled={data != undefined ? true : false}
          >
            {data !== undefined && !isReplacement ? (
              // <option value={data.pack_type} selected>
              //   {" "}
              //   {data.pack_type}{" "}
              // </option>
              <>
                <option value=" ">{data.pack_type}</option>
                {customerType.map((i) => (
                  <option
                    value={i.lov_id}
                    selected={data.pack_type === i.lov_value ? true : false}
                  >
                    {i.lov_value}
                  </option>
                ))}
              </>
            ) : (
              <>
                {data !== undefined && isReplacement ? (
                  <>
                    <option value=" ">
                      {data.pack_type ? data.pack_type : "Select"}
                    </option>
                    {customerType.map((i) => (
                      <option
                        value={i.lov_id}
                        selected={data.pack_type === i.lov_value ? true : false}
                      >
                        {i.lov_value}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    <option value=" ">Select</option>
                    {customerType.map((i) => (
                      <option value={i.lov_id}>{i.lov_value}</option>
                    ))}
                  </>
                )}
              </>
            )}
          </select>
          <i
            class="fa fa-refresh"
            style={{
              marginTop: "8px",
              display: `${
                Role_Id == "1" || Role_Id == "2" || Role_Id == "3" || isReplacement ? "none" : ""
              }`,
            }}
            onClick={() => getCustomerType(true)}
            aria-hidden="true"
          ></i>
        </div>
        <div>
  
          
        </div>
        <div>
          <label className="inputLabel" htmlFor="unitsInPack">
            Units in a Case
          </label>
          <input
            className="numberInput"
            type="number"
            id="unitsInPack"
            onChange={(e) => {
              setUnitsInPack(e.target.value);
              createString("unitsInPack", e.target.value);
              
            }}
            onBlur = {(e) => setNewFGCodeDescription()}
            name="unitsInPack"
            value={unitsInPack ? unitsInPack : ""}
            disabled={isDisabled}
          />
          <label className="inputLabel" htmlFor="packNetContent">
            Pack Net Content
          </label>
          <input
            className="numberInput"
            type="text"
            id="packNetContent"
            style={{ marginLeft: "24px" }}
            // style={{ marginLeft: "24px" }}
            onChange={(e) => {
              setPackNetContent(e.target.value);
              createString("packNetContent", e.target.value);
            }}
            onBlur = {(e) => setNewFGCodeDescription()}
            name="packNetContent"
            value={packNetContent ? packNetContent : ""}
            disabled={isDisabled}
          />
          <label className="inputLabel" htmlFor="packNetContentUOM">
            Pack Net Content UOM
          </label>
          <select
            className="lovHierarchy"
            id="packNetContentUOM"
            onChange={(e) => {
              var index = e.nativeEvent.target.selectedIndex;
              setSelectedPackNetContentUOM(
                e.nativeEvent.target[index].text != "Select"
                  ? e.nativeEvent.target[index].text
                  : ""
              );
              createString("packNetContentUOM", e.nativeEvent.target[index].text);
            }}
            onBlur = {(e) => setNewFGCodeDescription()}
            name="packNetContentUOM"
            disabled={isDisabled}
          >
            {data !== undefined && !isReplacement ? (
              // <option value={data.pack_net_content_uom} selected>
              //   {" "}
              //   {data.pack_net_content_uom}{" "}
              // </option>
              <>
                <option value=" ">{data.pack_net_content_uom}</option>
                {packNetContentUOM.map((i) => (
                  <option
                    value={i.lov_id}
                    selected={
                      data.pack_net_content_uom === i.lov_value ? true : false
                    }
                  >
                    {i.lov_value}
                  </option>
                ))}
              </>
            ) : (
              <>
                {data !== undefined && isReplacement ? (
                  <>
                    <option value=" ">
                      {data.pack_net_content_uom
                        ? data.pack_net_content_uom
                        : "Select"}
                    </option>
                    {packNetContentUOM.map((i) => (
                      <option
                        value={i.lov_id}
                        selected={
                          data.pack_net_content_uom === i.lov_value
                            ? true
                            : false
                        }
                      >
                        {i.lov_value}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    <option value=" ">Select</option>
                    {packNetContentUOM.map((i) => (
                      <option value={i.lov_id}>{i.lov_value}</option>
                    ))}
                  </>
                )}
              </>
            )}
          </select>
          <i
            class="fa fa-refresh"
            style={{
              marginTop: "8px",
              display: `${Role_Id == "1" || Role_Id == "2" || Role_Id == "3" ? "none" : ""}`,
            }}
            onClick={() => getPackNetContentUOM(true)}
            aria-hidden="true"
          ></i>

          <label className="inputLabel" htmlFor="weight">
            Gross Weight(Case)
          </label>
          <input
            className="numberInput"
            type="number"
            id="weight"
            style={{ marginLeft: "24px" }}
            onChange={(e) => {
              //  alert(parseFloat(e.target.value).toFixed(1))
              //setWeight(parseFloat(e.target.value).toFixed(1));
              setWeight(e.target.value);
              createString("weight", e.target.value);
            }}
            name="weight"
            value={weight ? weight : ""}
            disabled={isDisabled}
          /> 
          
          <label className="inputLabel" htmlFor="weightUnit">
            Gross Weight UOM
          </label>
          <select
            className="lovHierarchy"
            id="weightUnit"
            style={{ marginLeft: "24px" }}
            onChange={(e) => {
              var index = e.nativeEvent.target.selectedIndex;
              setSelectedWeightUnit(e.nativeEvent.target[index].text);
              createString("weightUnit", e.nativeEvent.target[index].text);
            }}
            name="weightUnit"
            disabled={isDisabled}
          >
            {data !== undefined && !isReplacement ? (
              // <option value={data.weight_uom} selected>
              //   {" "}
              //   {data.weight_uom}{" "}
              // </option>
              <>
                <option value=" ">{data.weight_uom}</option>
                {weightUnit.map((i) => (
                  <option
                    value={i.lov_id}
                    selected={data.weight_uom === i.lov_value ? true : false}
                  >
                    {i.lov_value}
                  </option>
                ))}
              </>
            ) : (
              <>
                {data !== undefined && isReplacement ? (
                  <>
                    <option value=" ">
                      {data.weight_uom ? data.weight_uom : "Select"}
                    </option>
                    {weightUnit.map((i) => (
                      <option
                        value={i.lov_id}
                        selected={
                          data.weight_uom === i.lov_value ? true : false
                        }
                      >
                        {i.lov_value}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    <option value=" ">Select</option>
                    {weightUnit.map((i) => (
                      <option value={i.lov_id}>{i.lov_value}</option>
                    ))}
                  </>
                )}
              </>
            )}
          </select>
          <i
            class="fa fa-refresh"
            style={{
              marginTop: "8px",
              display: `${ Role_Id == "1" || Role_Id == "2" || Role_Id == "3" ? "none" : ""}`,
            }}
            onClick={() => getWeightUnit(true)}
            aria-hidden="true"
          ></i>
        </div>
        <div
          style={{
            backgroundColor: "#ec9706",
            width: "100%",
            textAlign: "left",
            height: "25px",
            marginTop: "10px",
          }}
          className="partitionDiv"
        >
          <p>BI Product Hierarchy</p>
        </div>
        <div
          className="divItem"
          style={{
            marginTop: "15px",
            marginBottom: "10px",
          }}
        >
          <Brand
            Role_Id={Role_Id}
            createString={createString}
            itemData={data}
            setSelectedBrand={setSelectedBrand}
            setSelectedBrandCode={setSelectedBrandCode}
            setSelectedFlavour={setSelectedFlavour}
            setSelectedProductFamily={setSelectedProductFamily}
            setSelectedProductClass={setSelectedProductClass}
            setSelectedProductLine={setSelectedProductLine}
            isReplacement={isReplacement}
            disabled={data != undefined ? true : false}
          />
        </div>
        <div
          className="divItem"
          style={{
            marginTop: "15px",
            marginBottom: "10px",
          }}
        >
          <label className="inputLabel" htmlFor="faSecCategory">
            FA Sec Category
          </label>
          <input
            style={{ marginLeft: "25px" }}
            // className="numberInput"
            type="text"
            id="faSecCategory"
            name="faSecCategory"
            value={faSecCategory ? faSecCategory : ""}
            // value={"faSecCategory"}
            disabled="true"
          />
        </div>

        <div
          style={{
            backgroundColor: "#98bf64",
            width: "100%",
            textAlign: "left",
            height: "25px",
            marginTop: "10px",
          }}
          className="partitionDiv"
        >
          <p>Additional Attributes</p>
        </div>

        {!isDisabled && (
          <div
            className="divItem"
            style={{
              marginLeft: "0px",
              marginTop: "15px",
            }}
          >
            <label className="inputLabel" htmlFor="specialAttribute">
              Special Attribute
            </label>
            <input
              className="inputSpecialAttribute"
              type="text"
              // maxLength={25}
              id="specialAttribute"
              style={{ marginLeft: "24px" }}
              onChange={(e) => {
                  setSpecialAttribute(e.target.value);
                  createString("specialAttribute", e.target.value);
                }}
              name="specialAttribute"
              value={specialAttribute ? specialAttribute : ""}
              disabled={isDisabled}
              maxlength = "20"
            /> <span className="specialAttributHint">Max 20 characters allowed</span>
          </div>
        )}

        <div
          className="divItem"
          style={{
            marginLeft: "0px",
            marginTop: "15px",
          }}
        >
          <label className="inputLabel" htmlFor="itemCodeDescription">
            Product Description
          </label>
          <input
            className="descInput"
            type="text"
            id="itemCodeDescription"
            onChange={(e) => setItemCodeDescription(e.target.value)}
            name="itemCodeDescription"
            value={itemCodeDescription ? itemCodeDescription : ""}
            disabled="true"
          />
        </div>

        <div
          className="divItem"
          style={{

            display: data !== undefined ? "" : "none",
            marginLeft: "0px",
            marginTop: "15px",
          }}
        >
          <label className="inputLabel" htmlFor="itemCode">
            Item Code
          </label>
          <input
            className="numberInput"
            type="text"
            id="itemCode"
            style={{
              marginLeft: "24px",
              display: data !== undefined && data.item_code != "" ? "" : "none",
            }}

            name="itemCode"
            value={itemCode ? itemCode : ""}
            disabled={true}
          />
        </div>

        <div
          className="divItem"
          style={{
            display: data !== undefined ? "" : "none",
            marginLeft: "0px",
            marginTop: "15px",
          }}
        >
          <label className="inputLabel" htmlFor="parentCode">
            Parent Code
          </label>
          <input
            className="numberInput"
            type="text"
            id="parentCode"
            style={{ marginLeft: "24px" }}
            onChange={(e) => setParentCode(e.target.value)}
            name="parentCode"
            value={parentCode ? parentCode : ""}
            disabled={true}
          />
        </div>
        <div
          className="divItem"
          style={{
            display: data !== undefined ? "" : "none",
            marginLeft: "0px",
            marginTop: "15px",
          }}
        >
          <label className="inputLabel" htmlFor="parentCodeDescription">
            Parent Code Description
          </label>
          <input
            className="descInput"
            type="text"
            id="parentCodeDescription"
            onChange={(e) => setParentCodeDescription(e.target.value)}
            name="parentCodeDescription"
            value={parentCodeDescription ? parentCodeDescription : ""}
            disabled={true}
          />
        </div>

        <div
          className="divItem"
          style={{
            display:
              data !== undefined && data.rework_remarks != "" ? "" : "none",
            marginLeft: "0px",
            marginTop: "15px",
          }}
        >
          <label className="inputLabel" htmlFor="rework_remark">
            Approver remark
          </label>
          <input
            className="descInput"
            type="text"
            id="rework_remark"
            onChange={(e) => setRemark(e.target.value)}
            name="rework_remark"
            value={remark ? remark : ""}
            disabled={true}
          />
        </div>
        {localStorage.getItem("RoleId") == "3" ? (
          <>
            <div
              style={{
                backgroundColor: "#f8f0c6",
                width: "100%",
                textAlign: "left",
                height: "25px",
                marginTop: "10px",
              }}
              className="partitionDiv"
            >
              <p>DMS Attributes</p>
            </div>
            <div
              className="divItem"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                marginTop: "15px",
              }}
            >
              <DMS data={data} />
            </div>
          </>
        ) : (
          <></>
        )}

        {localStorage.getItem("RoleId") == "2" ? (
          <>
            <div
              style={{
                backgroundColor: "#e84868",
                width: "100%",
                textAlign: "left",
                height: "25px",
                marginTop: "10px",
              }}
              className="partitionDiv"
            >
              <p>Taxation Attributes</p>
            </div>
            <div
              className="divItem"
              style={{
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              <Taxation data={data} />
            </div>
          </>
        ) : (
          <></>
        )}
        {localStorage.getItem("RoleId") == "0" ? (
          /* {Role_Id == data.status ? ( */
          <button
            style={{
              display: isDisabled ? "none" : "",
              marginBottom: "10px",
              alignSelf: "center",
            }}
            className="btn btn-primary btn-block"
            type="button"
            onClick={
              data != undefined && data.status == Role_Id
                ? () => submit(1)
                : () => submit(0)
            }
            disabled={submitDisable}
          >
            Submit
          </button>
        ) : (
          <> </>
        )}
        {localStorage.getItem("RoleId") == "1" ? (
          <div className="divItem">
            <label className="inputLabel" htmlFor="reviewComments">
              Approver Comments
            </label>
            <input
              className="descInput"
              type="text"
              id="reviewComments"
              style={{
                marginLeft: "24px",
                textAlign: "left",
                paddingLeft: "0px",
                paddingTop: "0px",
                paddingBottom: "0.4em",
                paddingRight: "0.4em",
              }}
              onChange={(e) => setReviewComments(e.target.value)}
              name="reviewComments"
              value={reviewComments}
            />
            <div
              style={{
                display: "block",
                flexDirection: "row",
                backgroundColor: "#f7fbfd",
                marginTop: "25px",
                alignSelf: "center",
                // border: "1px solid red",
              }}
              className="col-12 m-auto"
            >
              {" "}
              <button
                // style={{ display: isVisible ? "" : "none",marginBottom:'10px',alignSelf:'center' }}
                className="btn btn-primary btn-block"
                type="button"
                onClick={approve}
                disabled={approveDisable}
              >
                Approve
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button
                // style={{ display: isVisible ? "" : "none",marginBottom:'10px',alignSelf:'center' }}
                className="btn btn-primary btn-block"
                type="button"
                onClick={rework}
                disabled={reworkDisable}
              >
                Rework
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button
                // style={{ display: isVisible ? "" : "none",marginBottom:'10px',alignSelf:'center' }}
                className="btn btn-primary btn-block"
                type="button"
                onClick={reject}
                disabled={rejectDisable}
              >
                Reject
              </button>
            </div>{" "}
          </div>
        ) : (
          <></>
        )}
        {/* </>) : (<></>)}   */}

        {/* {localStorage.getItem("RoleId") == "0" ? (
        <button
          style={{ display: isDisabled ? "none" : "",marginBottom:'10px' }}
          className="btn btn-primary btn-block"
          type="button"
          onClick={submit}
          //disabled={!validateForm()}
        >
          Submit
        </button>
      ) : (
        <>
         {
          data !=undefined && localStorage.getItem("RoleId") == data.status
          // {showItemCreationPanel==true ?<ItemCreationPanel itemData={itemData} />
           ? (<>
            <button
            style={{ display: isDisabled ? "none" : "",marginBottom:'10px' }}
            className="btn btn-primary btn-block"
            type="button"
            onClick={approve}
            //disabled={!validateForm()}
          >
            Approve
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button style={{ display: isDisabled ? "none" : "",marginBottom:'10px' }}
            className="btn btn-primary btn-block"
            type="button"
            onClick={rework}
            //disabled={!validateForm()}
          >
            Rework
          </button></>
          ) : (<></>)}          
        </>
      )} */}
      </div>
    </form>
  );
};

export default ItemCreationPanel;
