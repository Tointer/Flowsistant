import { NextResponse } from "next/server";
import { txAnalyse } from "@/lib/txAnalyser";

export async function POST(req: Request){
    const { tx } = await req.json();
    let result = { answer: "No tx", status: "error" };
    
    if (tx !== ""){
        try{
            const answer = await txAnalyse(tx);
            result = { answer, status: "ok" };
        } catch (err){
            result = { answer: JSON.stringify(err), status: "error" };
        }
    }

    console.log(result);
    return NextResponse.json(result);
}