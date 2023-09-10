import axios from "axios";

const apiUrl = "http://api.exchangeratesapi.io/v1/latest";
const accessKey = "697805463f9844f4abcfcd0b2be29c40";


// Create the query parameters
const params = {
    access_key: accessKey,
    
  };

export const liveRate = (req, res) => {
  const symbol = req.params.symbol||'';
  // Make the HTTP GET request
  axios
    .get(`${apiUrl}?access_key=${accessKey}&symbols=${symbol}`)
    .then((response) => {
      // Handle the response data
  
      res.status(200).json(response.data.rates)
    })
    .catch((error) => {
      // Handle any errors
      console.error("Error:", error.message);
      res.status(400).json({ErrorMessage : "Bad request"})
    });
};
