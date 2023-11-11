import React from "react";

export const API_ENDPOINT = "http://192.168.0.8:5004/intranet_app_api_v2";
//export const API_ENDPOINT = "http://localhost:5004/internet_app_api";
export function getHead() {
  const token = localStorage.getItem("authToken");
  return {
    Authorization: `Bearer ${token}`,
    "content-type": "application/json",
  };
}

export async function APIWrapper(param) {
  try {
   const API_URL = "http://192.168.0.8:5004/intranet_app_api_v2/";
   //const API_URL = "http://localhost:5004/internet_app_api/";
    param.headers = param.headers || { "content-type": "application/json" };
    const reqOption =
      param.requestType === "GET"
        ? {
            method: param.requestType,
            headers: param.headers,
          }
        : {
            method: param.requestType ? param.requestType : "POST",
            headers: param.headers,
            body: param.skipStringify
              ? param.requestBody
              : JSON.stringify(param.requestBody),
          };
    const resp = await fetch(API_URL + param.path, reqOption).then((response) =>
      response.json()
    );

    return resp;
  } catch (error) {
    return { message: "error" };
  }
}
