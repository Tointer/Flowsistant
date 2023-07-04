import { NextResponse } from "next/server";
import { txAnalyse } from "@/lib/txAnalyser";
import { ResponseCategory } from "@/lib/types";

export async function POST(req: Request){
    const { tx } = await req.json();
    let result = { answer: "No tx", cat: ResponseCategory.error };

    //debug wait 2 sec
    //await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (tx !== ""){
        try{
            result = await txAnalyse(tx);
        } catch (err){
            result = { answer: JSON.stringify(err), cat: ResponseCategory.error };
        }
    }

    console.log(result);
    return NextResponse.json(result);
}