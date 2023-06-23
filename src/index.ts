import { ChatGPTAPI } from 'chatgpt'
import * as dotenv from 'dotenv';
import txForge from './transactionForge.js';
import mainnet from './mainnetContext.json' assert { type: "json" };
import {encoding_for_model } from "tiktoken";
import * as fcl from "@onflow/fcl";

fcl.config({
  "accessNode.api": "https://rest-mainnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/authn"
})

dotenv.config();

// const acc = "0xdd765a6bf207c051"
// const getAccount = async (address: string) => {
//   const account = await fcl.send([fcl.getAccount(address) as Function]).then(fcl.decode);
//   return account;
// };
// console.log(await getAccount(acc));

// await fcl.query({
//   cadence: `
//     import Profile from 0x0b2a3299cc857e29

//     pub fun main(address: Address): Profile.ReadOnly? {
//       return Profile.read(address)
//     }
//   `,
//   args: (arg, t) => [arg("0x0b2a3299cc857e29", t.Address)]
// });

if (process.env.OPENAI_API_KEY === undefined) {
  throw new Error('OPENAI_API_KEY is not defined')
}

const encoder = encoding_for_model("gpt-3.5-turbo");

const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY as string,
})
  

//const tx = txForge.fiatTransfer(mainnet.FungibleToken, mainnet.FiatToken, 2000, '0xdd765a6bf207c051')
const tx = txForge.buyTopshotMoment(`0xf919ee77447b7497`, '0xdd765a6bf207c051')

const transactionBlock = `
Here is the transaction, written in Cadence language: ${tx}}`
const rulesBlock = `
You are digital advisor for Flow blockchain. Your task is help user to understand what kind of transaction he is sending. 
Here is the rules for your answers:
1. Given the transaction, you should describe it in two sentences. 
2. You should not give any detail about how this transaction working internally.
3. You should always tell what kind of resources user will send and to whom.
4. You should always tell what kind of resources user will receive and from whom.
5. If transaction is suspicious you should mention it. If it is not suspicious you should not mention anything.
6. Signer is always user, and you should adress user directly as "you". 
7. User actions should be addressed in the future tense.
8. Your answers should be as short as possible.
9. If resource is token, you should call it token.

Here is json of common used contracts: ${JSON.stringify(mainnet)}
If transaction tried to import contract with the same name as in the json but with different address, you should ignore  other rules and notify user of phishing attempt.
`


const finalInput = rulesBlock + transactionBlock;

console.log(`token count: ${encoder.encode(finalInput).length}`)
console.log(finalInput);

// const res = await api.sendMessage(finalInput)
// console.log(res.text)
