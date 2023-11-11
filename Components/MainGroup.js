import React, { useEffect, useState } from "react";
import "../Stylesheets/ItemCreation.css";
import { APIWrapper, getHead } from "./APIWrapper";

const MainGroup = ({
  Role_Id,
  itemData,
  setSelectedProdCategory,
  setSelectedMainGroup,
  setSelectedSubGroup,
  isReplacement,
  disabled,
}) => {
  //console.log("data in main group is:", itemData.length);
  const [prodCategory, setProdCategory] = useState([]);
  const [mainGroup, setMainGroup] = useState([]);
  const [subGroup, setSubGroup] = useState([]);
  const [isDisabled, setIsDisabled] = useState(disabled);

  useEffect(() => {
    if (itemData != undefined && Object.keys(itemData).length > 0) {
      setSelectedProdCategory(itemData.prod_category);
      setSelectedMainGroup(itemData.main_group);
      setSelectedSubGroup(itemData.sub_group);
      setIsDisabled(true);
      if (itemData.prod_category != undefined && !isReplacement) {
        // setIsDisabled(true);
      }
      if (itemData.prod_category == undefined || isReplacement) {
        // console.log("sel prod category is:", itemData.prod_category);
        // setIsDisabled(false);
        getProdCategory();
      }
    } else if (itemData == undefined) {
      setIsDisabled(false);
      getProdCategory();
    }
  }, [itemData]);

  useEffect(() => {
    if (
      prodCategory !== undefined &&
      prodCategory.length > 0 &&
      isReplacement
    ) {
      getMainGroup(
        prodCategory.filter((i) => i.prod_category == itemData.prod_category)[0]
          .prod_catg_code
      );
    }
  }, [prodCategory]);

  // getSubGroup();

  // useEffect(() => {
  //   console.log("main=========", mainGroup)
  //   if (mainGroup !== undefined && mainGroup.length > 0 && isReplacement) {
  //     getSubGroup(
  //       mainGroup.filter((i) => i.main_group == itemData.main_group)[0]
  //         .main_group_code
  //     );
  //   }
  // }, [mainGroup]);

  // useEffect(()=>
  // {
  //   if((itemData!=undefined && itemData.product_category==undefined))
  //   {
  //     getProdCategory();
  //   }
  // }
  // ,[])

  const getProdCategory = async () => {
    if (!isReplacement) {
      let reqParam = {
        headers: getHead(),
        requestType: "GET",
        requestBody: {},
        path: "getSapProdCatg",
      };
      let response = await APIWrapper(reqParam);
      if (response["status"] == "success") {
        setProdCategory(response["data"]);
      }
    }
  };

  const getMainGroup = async (prodCat) => {
    if (!isReplacement) {
      let reqParam = {
        headers: getHead(),
        requestType: "POST",
        requestBody: { prod_catg_code: prodCat },
        path: "getSapMainGroup",
      };
      let response = await APIWrapper(reqParam);
      if (response["status"] == "success") {
        setMainGroup(response["data"]);
      }
    }
  };

  const getSubGroup = async () => {
    if (!isReplacement) {
      let reqParam = {
        headers: getHead(),
        requestType: "GET",
        requestBody: {},
        path: "getSapSubGroup",
      };
      let response = await APIWrapper(reqParam);
      if (response["status"] == "success") {
        setSubGroup(response["data"]);
      }
    }
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
        <label
          style={{ marginLeft: "10px" }}
          className="hierarchyInputLabel"
          htmlFor="prodCategory"
        >
          SAP Product Category
        </label>
        <select
          className="lovMainHierarchy"
          id="prodCategory"
          style={{ marginLeft: "54px" }}
          onChange={(e) => {
            var index = e.nativeEvent.target.selectedIndex;
            setSelectedProdCategory(e.nativeEvent.target[index].text);
            getMainGroup(e.target.value);
          }}
          name="prodCategory"
          disabled={isDisabled}
        >
          {itemData !== undefined && !isReplacement ? (
            // <option value={itemData.prod_category} selected>
            //   {" "}
            //   {itemData.prod_category}{" "}
            // </option>
            <>
              <option value=" ">{itemData.prod_category}</option>
              {prodCategory.map((i) => (
                <option
                  value={i.prod_catg_code}
                  selected={
                    itemData.prod_category === i.prod_category ? true : false
                  }
                >
                  {i.prod_category}
                </option>
              ))}
            </>
          ) : (
            <>
              {itemData !== undefined && isReplacement ? (
                <>
                  <option value=" ">{itemData.prod_category}</option>
                  {/* {prodCategory.map((i) => (
                    <option
                      value={i.prod_catg_code}
                      selected={
                        itemData.prod_category === i.prod_category
                          ? true
                          : false
                      }
                    >
                      {i.prod_category}
                    </option>
                  ))} */}
                </>
              ) : (
                <>
                  <option value=" ">Select</option>
                  {prodCategory.map((i) => (
                    <option value={i.prod_catg_code}>{i.prod_category}</option>
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
              Role_Id == "2" || Role_Id == "3" || isReplacement ? "none" : ""
            }`,
          }}
          onClick={() => getProdCategory()}
          aria-hidden="true"
        ></i>
      </div>
      <div>
        <label className="hierarchyInputLabel" htmlFor="mainGroup">
          SAP Main Group
        </label>
        <select
          className="lovMainHierarchy"
          id="mainGroup"
          onChange={(e) => {
            var index = e.nativeEvent.target.selectedIndex;
            setSelectedMainGroup(e.nativeEvent.target[index].text);
            getSubGroup();
          }}
          name="mainGroup"
          disabled={isDisabled}
        >
          {itemData !== undefined && !isReplacement ? (
            // <option value={itemData.main_group} selected>
            //   {" "}
            //   {itemData.main_group}{" "}
            // </option>
            <>
              <option value=" ">{itemData.main_group}</option>
              {mainGroup.map((i) => (
                <option
                  value={i.main_group_code}
                  selected={itemData.main_group === i.main_group ? true : false}
                >
                  {i.main_group}
                </option>
              ))}
            </>
          ) : (
            <>
              {itemData !== undefined && isReplacement ? (
                <>
                  <option value=" ">{itemData.main_group}</option>
                  {/* {mainGroup.map((i) => (
                    <option
                      value={i.main_group_code}
                      selected={
                        itemData.main_group === i.main_group ? true : false
                      }
                    >
                      {i.main_group}
                    </option>
                  ))} */}
                </>
              ) : (
                <>
                  <option value=" ">Select</option>
                  {mainGroup.map((i) => (
                    <option value={i.main_group_code}>{i.main_group}</option>
                  ))}
                </>
              )}
            </>
          )}
        </select>
      </div>
      <div>
        <label className="hierarchyInputLabel" htmlFor="subGroup">
          SAP Sub Group
        </label>
        <select
          className="lovMainHierarchy"
          id="subGroup"
          onChange={(e) => {
            var index = e.nativeEvent.target.selectedIndex;
            setSelectedSubGroup(e.nativeEvent.target[index].text);
          }}
          name="subGroup"
          disabled={isDisabled}
        >
          {itemData !== undefined && !isReplacement ? (
            // <option value={itemData.sub_group} selected>
            //   {" "}
            //   {itemData.sub_group}{" "}
            // </option>
            <>
              <option value=" ">{itemData.sub_group}</option>
              {subGroup.map((i) => (
                <option
                  value={i.sub_group_code}
                  selected={itemData.sub_group === i.sub_group ? true : false}
                >
                  {i.sub_group}
                </option>
              ))}
            </>
          ) : (
            <>
              {itemData !== undefined && isReplacement ? (
                <>
                  <option value=" ">{itemData.sub_group}</option>
                  {/* {subGroup.map((i) => (
                    <option
                      value={i.sub_group_code}
                      selected={
                        itemData.sub_group === i.sub_group ? true : false
                      }
                    >
                      {i.sub_group}
                    </option>
                  ))} */}
                </>
              ) : (
                <>
                  <option value=" ">Select</option>
                  {subGroup.map((i) => (
                    <option value={i.sub_group_code}>{i.sub_group}</option>
                  ))}
                </>
              )}
            </>
          )}
        </select>
      </div>
    </div>
  );
};

export default MainGroup;
