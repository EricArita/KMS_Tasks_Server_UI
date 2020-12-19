import { config } from "../config/config";

export const callApiServer = async (httpMethod: string, api: string, requestBody?: object) => {
  let url = config.url.apiServer + api;
  const accessToken = localStorage.getItem("token");
  
  try {
    if (httpMethod === "GET") {
      if (httpMethod === "GET" && requestBody !== undefined && requestBody !== null) {
        const encodedQueryParams = encodeURI(JSON.stringify(requestBody));
        url += `?${encodedQueryParams}`;
      }

      const response = await fetch(url, {
        method: httpMethod,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : ""
        },
      });

      if (response.ok) {
        const jsonRespon = await response.json();
        return jsonRespon;
      }
    } 
    else if (httpMethod === "POST" || httpMethod === "PATCH") {
      const response = await fetch(url, {
        method: httpMethod,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : ""
        },
        body: requestBody !== undefined && requestBody !== null
                ? JSON.stringify(requestBody)
                : JSON.stringify({})  
      });
      if (response.ok) {
        const jsonRespon = await response.json();
        return jsonRespon;
      }
    }
  } catch (err) {
    console.log(err);
  }
};
