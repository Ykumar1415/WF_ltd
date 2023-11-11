import React, { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import { APIWrapper, getHead } from "./APIWrapper";
import "../Stylesheets/autosuggest.css";
import ItemCreationPanel from "./ItemCreationPanel";
import { defaultTheme } from "react-autosuggest/dist/theme";

const AutoSuggestion = ({ setShowItemCreationPanel, setItemData }) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  //  const [showItemCreationPanel, setShowItemCreationPanel] = useState(false);
  //  const [itemData, setItemData] = useState([]);
  var data = [];

  //  useEffect(()=>{alert(showItemCreationPanel)},[showItemCreationPanel])

  //  useEffect(()=>{alert("value changed")},[value])

  // Filter logic
  const getSuggestions = async (value) => {
    const inputValue = value.trim().toLowerCase();
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: { search_key: inputValue },
      path: "findParentDesc",
    };
    let response = await APIWrapper(reqParam);

    //   let response = await fetch("http://www.omdbapi.com/?s=" + inputValue + "&apikey=a591bb53");
    if (response["status"] == "success") {
      let data = await response;
      return data;
    } else {
      return null;
    }
  };

  const getSelectedItemValues = async (value) => {
    const inputValue = value.trim().toLowerCase();
    let reqParam = {
      headers: getHead(),
      requestType: "POST",
      requestBody: { parent_code: value },
      path: "getParentProductDetails",
    };
    let response = await APIWrapper(reqParam);

    //   let response = await fetch("http://www.omdbapi.com/?s=" + inputValue + "&apikey=a591bb53");
    if (response["status"] == "success") {
      setShowItemCreationPanel(true);
      setItemData(response["data"][0]);
      //let data = await response;
      console.log("data after selection is:", data);

      // setItemData(data["data"]);
      // return data;
    } else {
      // return null;
    }
  };

  // Trigger suggestions
  const getSuggestionValue = (suggestion) => suggestion.Title;

  // Render Each Option
  const renderSuggestion = (suggestion) => (
    <span className="sugg-option">
      <span className="name">{suggestion.parent_code_desc}</span>
    </span>
  );

  // OnChange event handler
  const onChange = (event, { newValue }) => {
    // setShowItemCreationPanel(true);
    setValue(newValue);
  };

  // Suggestion rerender when user types
  const onSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value).then((data) => {
      if (data == null || data["error_code"] != 0) {
        setSuggestions([]);
      } else {
        console.log("data is", data);
        setSuggestions(data["data"]);
      }
    });
  };

  // Triggered on clear
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Triggered on selection
  const onSuggestionSelected = async (
    event,
    { suggestion, suggestionValue, index, method }
  ) => {
    //  setValue("custard");
    //setShowItemCreationPanel(true);
    //event.preventDefault();
    //console.log('ping... ', suggestion)
    setSelectedSuggestion(suggestion.parent_code);
    setValue(suggestion.parent_code);
    const getData = await getSelectedItemValues(suggestion.parent_code);
    //  setShowItemCreationPanel(true);
    //  setItemData(getData["data"]);
    //data = getData["data"];
    //console.log(data);
    // console.log(showItemCreationPanel);
    // console.log(itemData);
    //alert(suggestionValue);
  };

  // render() {

  // Option props
  const inputProps = {
    placeholder: "Search By Item Description",
    value,
    onChange: onChange,
  };

  // Adding AutoSuggest component
  return (
    <>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={onSuggestionSelected}
        inputProps={inputProps}
        theme={{
          ...defaultTheme,
          // container: {...defaultTheme.container},
          //  input: { ...defaultTheme.input,width:'300px'},
          //  inputOpen: {...defaultTheme.inputOpen},
          // inputFocused: {...defaultTheme.inputFocused},
          // suggestionsContainer: {...defaultTheme.suggestionsContainer},
          // suggestionsContainerOpen: {...defaultTheme.suggestions_container__open},
          // suggestionsList: {...defaultTheme.suggestionsList},
          // suggestion: {...defaultTheme.suggestion},
          // suggestionHighlighted: {...defaultTheme.suggestionHighlighted},
        }}
      />
    </>
  );
};

export default AutoSuggestion;
