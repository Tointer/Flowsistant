import { Configuration, OpenAIApi } from 'openai'
import {getEncoding} from "js-tiktoken";
import { UserContext } from './types';

async function promtTxAnalyse(transaction : string, userContext: UserContext): Promise<string>{

    const rulesBlock = `
    You are digital advisor for Flow blockchain. Your task is help user to understand what kind of transaction he is sending. 
    Here is the rules for your answers:
    1. Given the transaction, you should describe it in two sentences. 
    2. You should not give any detail about how this transaction working internally, but focus on the results.
    3. User address is ${userContext.userAddress}, you should adress it as "your address". User account should be addressed as "your account".
    4. User actions should be addressed in the future tense.
    5. Your answers should be as short as possible.
    6. If resource is fungible token, you should call it token.
    7. If resource is non fungible token, you should call it NFT, and always mention its ID.
    8. If transaction is sending or receiving token resources, you should always mention it.
    9. You should mention all addresses of the senders and recipients that are involved in the transaction.
    10. You should NOT mention arguments of the transaction if it's metadata (like names, descriptions, urls, etc.)
    `

    const transactionBlock = `
    Here is the transaction, written in Cadence language: ${transaction}}`

    console.log(`user address: ${userContext.userAddress}`)

    const result = await promt(rulesBlock, transactionBlock)

    return result;

}

async function promtLinkingAccounts(transaction : string): Promise<{parent: string, child: string}>{
    const rulesBlock = `
    You are digital advisor for Flow blockchain. You will be given transactions that includes acount linking. 
    Account linking is onboarding process in which user gettting custody over his NFTs in child account. Typically, child account is created by some game or app that user is using.
    Your task is to understand relationship between parent and child accounts in this transaction.
    You should always giving your best shot and never answering that you can't determine if transaction is good or bad. Work with informantion given.
    Your answer should be in json format "{parent: parent address, child: child address}"
    `

    const transactionBlock = `
    Here is the transaction, written in Cadence language: ${transaction}}`

    const answer = await promt(rulesBlock, transactionBlock)

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

async function promt(systemMsg: string, userMsg: string): Promise<string>{
    
    if (process.env.OPENAI_API_KEY === undefined) {
        throw new Error('OPENAI_API_KEY is not defined')
    }
     
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY as string,
    });

    const api = new OpenAIApi(configuration);

    const inputSum = systemMsg + userMsg;
    const encoder = getEncoding("gpt2");
    console.log(`token count: ${encoder.encode(inputSum).length}`)

    const result = await api.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {role: "system", content: systemMsg},
            {role: "user", content: userMsg}],
    });

    //const result = "Mock GPT-3 response";
    return result.data.choices[0].message?.content as string;
}



export default {promtTxAnalyse, promtLinkingAccounts};