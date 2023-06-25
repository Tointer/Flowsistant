import * as dotenv from 'dotenv';
import * as fcl from "@onflow/fcl";
import txAnalyser from './txAnalyser.js';
import txForge from './txForge.js';

fcl.config({
  "accessNode.api": "https://rest-mainnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/authn"
})

dotenv.config();

//const tx = txForge.fiatTransfer(mainnet.FungibleToken, mainnet.FiatToken, 2000, '0xdd765a6bf207c051')
const tx = txForge.buyTopshotMoment(`0xf919ee77447b7497`, '0xdd765a6bf207c051')

const result = await txAnalyser.txAnalyse(tx);
console.log(result);


// await fcl.query({
//   cadence: `
//     import Profile from 0x0b2a3299cc857e29

//     pub fun main(address: Address): Profile.ReadOnly? {
//       return Profile.read(address)
//     }
//   `,
//   args: (arg, t) => [arg("0x0b2a3299cc857e29", t.Address)]
// });


