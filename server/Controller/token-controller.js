import JWT from "jsonwebtoken";
import requestIp from "request-ip";

// Create a Map to store tokens by IP address
const ipTokenMap = new Map();

export const tokenGenerator = (req, res) => {
  const clientIp = requestIp.getClientIp(req);

  if (!ipTokenMap.has(clientIp)) {
    // Generate a new token for the IP address
    const token = JWT.sign({ ip: clientIp }, clientIp);
    ipTokenMap.set(clientIp, token);

    return res.status(200).json({
      your_key: token,
      message: "Please save your_key for future requests",
    });
  }

  return res
    .status(200)
    .json({ message: "Your token has already been generated" });
};

export const resetToken = (req, res) => {
  const clientIp = requestIp.getClientIp(req);

  // Delete the existing token if it exists
  if (ipTokenMap.has(clientIp)) {
    ipTokenMap.delete(clientIp);
  }

  // Generate a new token for the IP address
  const token = JWT.sign({ ip: clientIp }, clientIp);
  ipTokenMap.set(clientIp, token);

  return res.status(200).json({
    your_key: token,
    message: "Please save the regenerated key for future requests",
  });
};
