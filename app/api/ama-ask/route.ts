import { NextResponse } from "next/server";
import { txAnalyse } from "@/lib/txAnalyser";
import { ResponseCategory } from "@/lib/types";

export async function POST(req: Request){
    const { question, userAddress } = await req.json();
    let result = { title: "Error", answer: "No tx", cat: ResponseCategory.error };

    if(userAddress === undefined){
        return NextResponse.json({ title: "Please log in", answer: "No user address found", cat: ResponseCategory.error });
    }

    //debug wait 2 sec
    //await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (question !== ""){
        try{
            result = await handleAmaRequest(question, userAddress);
        } catch (err){
            result = { title: "Error", answer: JSON.stringify(err), cat: ResponseCategory.error };
        }
    }

    console.log(result);
    return NextResponse.json(result);
}

async function handleAmaRequest(question: string, userAddress: string) : Promise<{title: string, answer: string, cat: ResponseCategory}>{
    const url = 'https://api.kapa.ai/query/v1?query=' + new URLSearchParams(question).toString();
    const kapaAnswer = await fetch(url, {
        method: 'GET',
        headers: {
            "X-API-TOKEN": process.env.KAPA_API_KEY as string
        }
    })

    console.log(url);
    console.log(question);
    //console.log(kapaAnswer);
    const result = (await kapaAnswer.json()).answer;

    return { title: "Kapa AI", answer: result, cat: ResponseCategory.regular };
}