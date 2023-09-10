import CC from "currency-converter-lt";

export const convertor = async (req, res) => {
  try {
    // Destructure the request body
    const { from, to, amount } = req.body;

    // Check for missing parameters
    if (!from || !to || amount === undefined) {
      return res.status(422).json({
        error: "Missing parameters. Required: from, to, amount.",
      });
    }

    // Type checking of variables
    if (
      typeof from !== "string" ||
      typeof to !== "string" ||
      typeof amount !== "number"
    ) {
      return res.status(400).json({
        error:
          "Type mismatch. 'from' and 'to' should be strings, 'amount' should be a number.",
      });
    }

    // Convert currency
    const currencyConverter = new CC({ from, to, amount });
    const result = await currencyConverter.convert();

    if (result) {
      res.status(200).json({
        received_Data: {
          from: from,
          to: to,
          amount: amount,
        },
        result: result,
      });
    } else {
      res.status(404).json({ error: "Currency conversion not available." });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
