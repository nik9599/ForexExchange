// import jwt from "jsonwebtoken";
// import requestIp from "request-ip";

// export const access_Key = (req, res, next) => {
//   console.log("middelware");
//   const clientIp = requestIp.getClientIp(req);
//   const accessKey =
//     req.query.access_key || req.headers.authorization || req.cookies.token;
//   if (!accessKey) {
//     return res.status(401).json({ error: "Access key is missing" });
//   }
//   jwt.verify(accessKey, clientIp, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ error: "Invalid access key" });
//     }
//     req.userData = decoded;
//     next();
//   });
// };

import jwt from "jsonwebtoken";
import requestIp from "request-ip";

export const access_Key = (req, res, next) => {
  try {
    const clientIp = requestIp.getClientIp(req);
    const secretKey = clientIp; // Replace with your secret key
    const accessKey =req.query.access_key || req.headers.authorization || req.cookies.token;
    
    if (accessKey == undefined) {
      return res.status(401).json({ error: "Access key is missing" });
    }

    jwt.verify(accessKey, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid access key" });
      }
      req.userData = decoded;
      next();
    });
  } catch (error) {
    console.error("Middleware error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
