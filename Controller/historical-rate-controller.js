import axios from "axios";

const accessKey = "697805463f9844f4abcfcd0b2be29c40";
const apiUrl = "http://api.exchangeratesapi.io/v1/";

function getPast7DaysDates() {
  const currentDate = new Date();
  const past7DaysDates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - i);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    past7DaysDates.push(formattedDate);
  }

  return past7DaysDates;
}

export const historicalData = async (req, res) => {
  const symbol = req.params.symbol;
  const past7Days = getPast7DaysDates();
  
  try {
    const requests = past7Days.map(async (date) => {
      try {
        const response = await axios.get(
          `${apiUrl}${date}?access_key=${accessKey}&symbols=${symbol}`
        );
        if (response.status !== 200) {
          throw new Error("API request failed");
        }
        return response.data.rates;
      } catch (error) {
        throw new Error(`Error fetching data for date ${date}: ${error.message}`);
      }
    });

    const responseData = await Promise.all(requests);
    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ ErrorMessage: "Internal Server Error" });
  }
};