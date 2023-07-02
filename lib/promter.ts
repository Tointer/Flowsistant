import { ChatGPTAPI } from 'chatgpt'
import {getEncoding} from "js-tiktoken";


async function promtTxAnalyse(transaction : string){
    
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
    5. If transaction is suspicious you should mention it. If it is not suspicious you should not mention anything.
    6. Signer is always user, and you should adress user directly as "you". 
    7. User actions should be addressed in the future tense.
    8. Your answers should be as short as possible.
    9. If resource is token, you should call it token.
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

export default {promtTxAnalyse};