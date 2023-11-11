import React, { useEffect, useState } from "react";
import { APIWrapper, getHead } from "./APIWrapper";
import "../Stylesheets/ItemCreation.css";

const Brand = ({
  createString,
  Role_Id,
  itemData,
  setSelectedBrandCode,
  setSelectedBrand,
  setSelectedProductFamily,
  setSelectedProductClass,
  setSelectedProductLine,
  setSelectedFlavour,
  isReplacement,
  disabled,
}) => {
  // console.log("itemData ------", itemData);
  // console.log("setSelectedBrandCode", setSelectedBrandCode);
  // console.log("setSelectedBrand", setSelectedBrand);
  // console.log("setSelectedProductFamily", setSelectedProductFamily);
  // console.log("setSelectedProductClass", setSelectedProductClass);
  // console.log("setSelectedProductLine", setSelectedProductLine);
  // console.log("setSelectedFlavour", setSelectedFlavour);
  // console.log("isReplacement", isReplacement);

  const [brand, setBrand] = useState([]);

  const [productFamily, setProductFamily] = useState([]);

  const [productClass, setProductClass] = useState([]);

  const [productLine, setProductLine] = useState([]);

  const [flavour, setFlavour] = useState([]);

  const [isDisabled, setIsDisabled] = useState(disabled);

  useEffect(() => {
    if (itemData != undefined && Object.keys(itemData).length > 0) {
      setSelectedBrand(itemData.brand);
      setSelectedProductFamily(itemData.product_family);
      setSelectedProductClass(itemData.product_class);
      setSelectedProductLine(itemData.product_line);
      setSelectedFlavour(itemData.flavour);
      setIsDisabled(true);
      if (itemData.brand != undefined && !isReplacement) {
        // setIsDisabled(true);
      }
      if (itemData.brand == undefined || isReplacement) {
        getBrand();
      }
    } else if (itemData == undefined) {
      setIsDisabled(false);
      getBrand();
    }
  }, [itemData]);

  useEffect(() => {
    if (!isReplacement) {
      if (brand !== undefined && brand.length > 0 && isReplacement) {
        {
          itemData && itemData.brand
            ? getProductFamily(
                brand.filter((i) => i.brand_desc == itemData.brand)[0]
                  .brand_code
              )
            : getProductFamily(brand.filter((i) => i.brand_code));
        }
      }
    }
  }, [brand]);

  useEffect(() => {
    if (
      productFamily !== undefined &&
      productFamily.length > 0 &&
      isReplacement
    ) {
      let chk = productFamily.findIndex(
        (e) => e.product_family_desc == itemData.product_family
      );
      if (chk !== -1) {
        // console.log("productFamily", itemData.product_family);
        getProductClass(
          productFamily.filter(
            (i) => i.product_family_desc == itemData.product_family
          )[0].product_family_code
        );
      }
    }
  }, [productFamily]);

  useEffect(() => {
    if (
      productClass !== undefined &&
      productClass.length > 0 &&
      isReplacement
    ) {
      let chk = productClass.findIndex(
        (e) => e.product_class_desc == itemData.product_class
      );
      // console.log("productClass", productClass);
      if (chk !== -1) {
        getProductLine(
          productClass.filter(
            (i) => i.product_class_desc == itemData.product_class
          )[0].product_class_code
        );
      }
    }
  }, [productClass]);

  useEffect(() => {
    if (productLine !== undefined && productLine.length > 0 && isReplacement) {
      // console.log("productLine", productLine);
      let chk = productLine.findIndex(
        (e) => e.product_line_desc == itemData.product_line
      );
      if (chk !== -1) {
        getFlavor(
          productLine.filter(
            (i) => i.product_line_desc == itemData.product_line
          )[0].product_line_code
        );
      }
    }
  }, [productLine]);

  const getBrand = async () => {
    let reqParam = {
      headers: getHead(),
      requestType: "GET",
      requestBody: {},
      path: "getBrand",
    };
    let response = await APIWrapper(reqParam);
    if (response["status"] == "success") {
      setBrand(response["data"]);
      //setProductClass(response["data"]);
    }
  };

  const getProductClass = async (productFamily) => {
    // console.log("productFamily", productFamily);
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: { product_family_code: productFamily },
      path: "getProductClass",
    };
    let response = await APIWrapper(reqParam);
    if (response["status"] == "success") {
      setProductClass(response["data"]);
    }
  };

  const getProductLine = async (productClass) => {
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: { product_class: productClass },
      path: "getProductLine",
    };
    let response = await APIWrapper(reqParam);
    if (response["status"] == "success") {
      setProductLine(response["data"]);
    }
  };

  const getProductFamily = async (brand) => {
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: { brand_code: brand },
      path: "getProductFamily",
    };
    let response = await APIWrapper(reqParam);
    if (response["status"] == "success") {
      setProductFamily(response["data"]);
    }
  };

  const getFlavor = async (productLine) => {
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: { product_line: productLine },
      path: "getFlavour",
    };
    let response = await APIWrapper(reqParam);
    if (response["status"] == "success") {
      setFlavour(response["data"]);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        // justifyContent: "center",
        overflow: "wrap",
        flexBasis: "0",
        flexGrow: "0",
        maxWidth: "1500px",
        marginLeft: "30px",
        flexWrap: "wrap",
      }}
    >
      <label className="hierarchyInputLabel" htmlFor="brand">
        Brand
      </label>
      <select
        className="lovMainHierarchy"
        id="brand"
        style={{ marginLeft: "55px" }}
        onChange={(e) => {
          let branchCode = brand.filter((i) => i.brand_code == e.target.value);
          setSelectedBrandCode(
            branchCode.length > 0 ? branchCode[0].brand_short_code : null
          );
          // setSelectedBrandCode(e.target.key);
          var index = e.nativeEvent.target.selectedIndex;
          setSelectedBrand(e.nativeEvent.target[index].text);
          getProductFamily(e.target.value);
          // createString("brand", e.nativeEvent.target[index].text);
        }}
        name="brand"
        disabled={isDisabled}
      >
        {itemData !== undefined && !isReplacement ? (
          // <option value={itemData.brand_code} selected>
          //   {" "}
          //   {itemData.brand}{" "}
          // </option>
          <>
            <option value=" ">{itemData.brand}</option>
            {brand.map((i) => (
              <option
                value={i.brand_code}
                selected={itemData.brand === i.brand_desc ? true : false}
              >
                {i.brand_desc}
              </option>
            ))}
          </>
        ) : (
          <>
            {itemData !== undefined && isReplacement ? (
              <>
                <option value=" ">Select</option>
                {brand.map((i) => (
                  <option
                    value={i.brand_code}
                    selected={itemData.brand === i.brand_desc ? true : false}
                  >
                    {i.brand_desc}
                  </option>
                ))}
              </>
            ) : (
              <>
                <option value=" ">Select</option>
                {brand.map((i) => (
                  <option value={i.brand_code}>{i.brand_desc}</option>
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
        onClick={() => getBrand()}
        aria-hidden="true"
      ></i>
      <label className="hierarchyInputLabel" htmlFor="productFamily">
        Product Family
      </label>
      <select
        className="lovMainHierarchy"
        id="productFamily"
        onChange={(e) => {
          // debugger;
          var index = e.nativeEvent.target.selectedIndex;
          setSelectedProductFamily(e.nativeEvent.target[index].text);
          getProductClass(e.target.value);
          // createString("product_family", e.nativeEvent.target[index].text);
        }}
        name="productFamily"
        disabled={isDisabled}
      >
        {itemData !== undefined && !isReplacement ? (
          // <option value={itemData.product_family_code} selected>
          //   {" "}
          //   {itemData.product_family}{" "}
          // </option>
          <>
            <option value=" ">{itemData.product_family}</option>
            {productFamily.map((i) => (
              <option
                value={i.product_family_code}
                selected={
                  itemData.product_family === i.product_family_desc
                    ? true
                    : false
                }
              >
                {i.product_family_desc}
              </option>
            ))}
          </>
        ) : (
          <>
            {itemData !== undefined && isReplacement ? (
              <>
                <option value=" ">{itemData.product_family}</option>
                {/* {productFamily.map((i) => (
                  <option
                    value={i.product_family_code}
                    selected={
                      itemData.product_family === i.product_family_desc
                        ? true
                        : false
                    }
                  >
                    {i.product_family_desc}
                  </option>
                ))} */}
              </>
            ) : (
              <>
                <option value=" ">Select</option>
                {productFamily.map((i) => (
                  <option value={i.product_family_code}>
                    {i.product_family_desc}
                  </option>
                ))}
              </>
            )}
          </>
        )}
      </select>
      {/* <i
        class="fa fa-refresh"
        style={{
          marginTop: "8px",
          display: `${
            Role_Id == "2" || Role_Id == "3" || isReplacement ? "none" : ""
          }`,
        }}
        onClick={() => getProductFamily(brand)}
        aria-hidden="true"
      ></i> */}
      <label className="hierarchyInputLabel" htmlFor="productClass">
        Product Class
      </label>
      <select
        className="lovMainHierarchy"
        id="productClass"
        onChange={(e) => {
          var index = e.nativeEvent.target.selectedIndex;
          setSelectedProductClass(e.nativeEvent.target[index].text);
          getProductLine(e.target.value);
          // createString("product_class", e.nativeEvent.target[index].text);
        }}
        name="productClass"
        disabled={isDisabled}
      >
        {itemData !== undefined && !isReplacement ? (
          // <option value={itemData.product_class_code} selected>
          //   {" "}
          //   {itemData.product_class}{" "}
          // </option>
          <>
            <option value=" ">{itemData.product_class}</option>
            {productClass.map((i) => (
              <option
                value={i.product_class_code}
                selected={
                  itemData.product_class === i.product_class_desc ? true : false
                }
              >
                {i.product_class_desc}
              </option>
            ))}
          </>
        ) : (
          <>
            {itemData !== undefined && isReplacement ? (
              <>
                <option value=" ">{itemData.product_class}</option>
                {/* {productClass.map((i) => (
                  <option
                    value={i.product_class_code}
                    selected={
                      itemData.product_class === i.product_class_desc
                        ? true
                        : false
                    }
                  >
                    {i.product_class_desc}
                  </option>
                ))} */}
              </>
            ) : (
              <>
                <option value=" ">Select</option>
                {productClass.map((i) => (
                  <option value={i.product_class_code}>
                    {i.product_class_desc}
                  </option>
                ))}
              </>
            )}
          </>
        )}
      </select>
      <label className="hierarchyInputLabel" htmlFor="productLine">
        Product Line
      </label>
      <select
        id="productLine"
        className="lovMainHierarchy"
        style={{ marginLeft: "55px" }}
        onChange={(e) => {
          var index = e.nativeEvent.target.selectedIndex;
          setSelectedProductLine(e.nativeEvent.target[index].text);
          getFlavor(e.target.value);
          // createString("product_line", e.nativeEvent.target[index].text);
        }}
        name="productLine"
        disabled={isDisabled}
      >
        {itemData !== undefined && !isReplacement ? (
          // <option value={itemData.product_line_code} selected>
          //   {" "}
          //   {itemData.product_line}{" "}
          // </option>
          <>
            <option value=" ">{itemData.product_line}</option>
            {productLine.map((i) => (
              <option
                value={i.product_line_code}
                selected={
                  itemData.product_line === i.product_line_desc ? true : false
                }
              >
                {i.product_line_desc}
              </option>
            ))}
          </>
        ) : (
          <>
            {itemData !== undefined && isReplacement ? (
              <>
                <option value=" ">{itemData.product_line}</option>
                {/* {productLine.map((i) => (
                  <option
                    value={i.product_line_code}
                    selected={
                      itemData.product_line === i.product_line_desc
                        ? true
                        : false
                    }
                  >
                    {i.product_line_desc}
                  </option>
                ))} */}
              </>
            ) : (
              <>
                <option value=" ">Select</option>
                {productLine.map((i) => (
                  <option value={i.product_line_code}>
                    {i.product_line_desc}
                  </option>
                ))}
              </>
            )}
          </>
        )}
      </select>
      <label className="hierarchyInputLabel" htmlFor="flavour">
        Flavour
      </label>
      <select
        className="lovMainHierarchy"
        id="flavour"
        onChange={(e) => {
          var index = e.nativeEvent.target.selectedIndex;
          setSelectedFlavour(e.nativeEvent.target[index].text);
          // createString("flavour", e.nativeEvent.target[index].text);
        }}
        name="flavour"
        disabled={isDisabled}
      >
        {itemData !== undefined && !isReplacement ? (
          // <option value={itemData.flavour} selected>
          //   {" "}
          //   {itemData.flavour}{" "}
          // </option>
          <>
            <option value=" ">{itemData.flavour}</option>
            {flavour.map((i) => (
              <option
                value={i.flavour_code}
                selected={itemData.flavour === i.flavour_desc ? true : false}
              >
                {i.flavour_desc}
              </option>
            ))}
          </>
        ) : (
          <>
            {itemData !== undefined && isReplacement ? (
              <>
                <option value=" ">{itemData.flavour}</option>
                {/* {flavour.map((i) => (
                  <option
                    value={i.flavour_code}
                    selected={
                      itemData.flavour === i.flavour_desc ? true : false
                    }
                  >
                    {i.flavour_desc}
                  </option>
                ))} */}
              </>
            ) : (
              <>
                <option value=" ">Select</option>
                {flavour.map((i) => (
                  <option value={i.flavour_code}>{i.flavour_desc}</option>
                ))}
              </>
            )}
          </>
        )}
      </select>
    </div>
  );
};

export default Brand;
