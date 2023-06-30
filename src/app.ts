import * as dotenv from 'dotenv';
import * as fcl from "@onflow/fcl";
import txAnalyser from './txAnalyser.js';
import txForge from './txForge.js';
import express from 'express';
import path from 'path';

fcl.config({
  "accessNode.api": "https://rest-mainnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/authn"
})

dotenv.config();

const app = express();

//frontend
app.use(express.static(`${path.resolve()}/frontend-build`));

//api
app.get("/api/tx-ask", (req, res) => {
  return res.json({ answer: "Lmao", status: "ok" })
});

// other path
app.use("/", (req, res) => {
  return res.sendFile(path.join(__dirname + "/frontend-build/index.html"))
});

app.listen("3333", () => {
  console.log("running on 3333")
})

//const tx = txForge.fiatTransfer(mainnet.FungibleToken, mainnet.FiatToken, 2000, '0xdd765a6bf207c051')
// const tx = txForge.buyTopshotMoment(`0xf919ee77447b7497`, '0xdd765a6bf207c051')

// const result = await txAnalyser.txAnalyse(tx);
// console.log(result);

