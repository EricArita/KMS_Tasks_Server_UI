import { config } from "../config/appconfig";

export const callApiServer = async (httpMethod: string, api: string, requestBody?: object) => {
  let url = config.url.httpApiServer + api;
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

      if (response.status === 401) {
        window.location.href = "/login";
      }

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

      if (response.status === 401) {
        window.location.href = "/login";
      }
      
      if (response.ok) {
        const jsonRespon = await response.json();
        return jsonRespon;
      }
    }
  } catch (err) {
    console.log(err);
  }
};
