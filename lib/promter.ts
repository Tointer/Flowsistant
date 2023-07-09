import { ChatGPTAPI } from 'chatgpt'
import {getEncoding} from "js-tiktoken";
import { UserContext } from './types';


async function promtTxAnalyse(transaction : string, userContext: UserContext){
    
    if (process.env.OPENAI_API_KEY === undefined) {
        throw new Error('OPENAI_API_KEY is not defined')
    }
    
    const encoder = getEncoding("gpt2");
    
    const api = new ChatGPTAPI({
        apiKey: process.env.OPENAI_API_KEY as string,
    })

    const rulesBlock = `
    You are digital advisor for Flow blockchain. Your task is help user to understand what kind of transaction he is sending. 
    Here is the rules for your answers:
    1. Given the transaction, you should describe it in two sentences. 
    2. You should not give any detail about how this transaction working internally.
    3. You should always tell what kind of resources user will send and to whom.
    4. You should always tell what kind of resources user will receive and from whom.
    5. Signer AuthAccount is always user, and you should adress user directly as "you". 
    6. User actions should be addressed in the future tense.
    7. Your answers should be as short as possible.
    8. If resource is fungible token, you should call it token.
    9. If resource is non fungible token, you should call it NFT.
    10. user address is ${userContext.userAddress}, you should adress it as "your address"
    `
    const transactionBlock = `
    Here is the transaction, written in Cadence language: ${transaction}}`

    const finalInput = rulesBlock + transactionBlock;

    console.log(`token count: ${encoder.encode(finalInput).length}`)
    //console.log(finalInput);

    //const result = (await api.sendMessage(finalInput)).text
    const result = "Mock GPT-3 response";

    return result;

}

async function promtLinkingAccounts(transaction : string): Promise<{parent: string, child: string}>{
    
    if (process.env.OPENAI_API_KEY === undefined) {
        throw new Error('OPENAI_API_KEY is not defined')
    }
    
    const encoder = getEncoding("gpt2");
    
    const api = new ChatGPTAPI({
        apiKey: process.env.OPENAI_API_KEY as string,
    })


    const rulesBlock = `
    You are digital advisor for Flow blockchain. You will be given transactions that includes acount linking. 
    Account linking is onboarding process in which user gettting custody over his NFTs in child account. Typically, child account is created by some game or app that user is using.
    Your task is to understand relationship between parent and child accounts in this transaction.
    You should always giving your best shot and never answering that you can't determine if transaction is good or bad. Work with informantion given.
    Your answer should be in json format "{parent: parent address, child: child address}"
    `

    const transactionBlock = `
    Here is the transaction, written in Cadence language: ${transaction}}`

    const finalInput = rulesBlock + transactionBlock;

    console.log(`token count: ${encoder.encode(finalInput).length}`)

    const answer = (await api.sendMessage(finalInput)).text
    //const result = "Mock GPT-3 response";

    let result : {parent: string, child: string};
    try {
        result = JSON.parse(answer.trim());
    }
    catch (e) {
        console.log(e);
        result = {parent: "", child: ""};
    }
    return result;

}



export default {promtTxAnalyse, promtLinkingAccounts};