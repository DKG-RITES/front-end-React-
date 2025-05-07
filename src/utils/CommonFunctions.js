import { message } from "antd";
import axios from "axios";
import dayjs from "dayjs"

export const apiCall = async (method, url, token, payload = null) => {

  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    let response;

    if (method === "GET") {
      response = await axios.get(url, header);
    } else if (method === "POST") {
      response = await axios.post(url, payload, header);
    }

    // Check response status code
    if (response.data.responseStatus.statusCode === 1) {
      return response; // Return the data on success
    } else {
      // Throw an error if the status code indicates failure
      throw new Error(response.data.responseStatus.message || "Request failed.");
    }
  } catch (error) {
    // Display error alert
    message.error(error?.response?.data?.responseStatus?.message || "Some error occurred.");
    // Rethrow the error for the calling function to handle
    throw error;
  }
};

  export const handleChange = (fieldName, value, setFormData) => {
    setFormData(prev => {
      return {
        ...prev,
        [fieldName]: value
      }
    })
  }

  

  export const checkAndConvertToFLoat = (value) => {
    if( value === null || value === ""){
      console.log("VALIE NULL")
      return {number: null, isFLoat: true}
    }

    console.log("VALIE NOT NULL, ", value)

    if (value.trim() === "" || !/^-?\d+(\.\d+)?$/.test(value)) {
      message.error("Invalid number.");
      return{number: null, isFloat: false};
    }

    return {number: parseFloat(value), isFloat: true}
  }

  export const getCurrentDate = () => {
    const dateFormat = "DD/MM/YYYY";
    const currentDate = dayjs();
    return currentDate.format(dateFormat);
  }