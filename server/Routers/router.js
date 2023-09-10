import express from "express";
import { convertor } from "../Controller/converter-controller.js";
import { liveRate } from "../Controller/curent-rate-controller.js";
import { historicalData } from "../Controller/historical-rate-controller.js";
import { tokenGenerator, resetToken } from "../Controller/token-controller.js";
import { access_Key } from "../Midelware/midelware.js";

const router = express.Router();
router.get("/token_generator", tokenGenerator);
router.get("/regenrate", resetToken);
router.post("/conversion", access_Key, convertor);
router.get("/live/:symbol?", access_Key, liveRate);

router.get("/historical/:symbol", access_Key, historicalData);

export default router;
