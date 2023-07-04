import txForge from './txForge';
import importAnalyser from './importAnalyser';
import promter from './promter';
import { ResponseCategory } from './types';

enum ResponseOverride {
    None,
    WrongImports    = 1 << 1,
}

export async function txAnalyse(tx : string): Promise<{answer: string, cat: ResponseCategory}>{

    let overrides =  ResponseOverride.None;
    let cat = ResponseCategory.none;
    let answer = "";

    const wrongInputs = importAnalyser.checkImports(tx);
    if(wrongInputs.wrong_contracts.length > 0){
        overrides |= ResponseOverride.WrongImports;
        cat = ResponseCategory.warning
        answer = `Your transaction are interacting with contract that have name of some popular contract, but with different address.
        This can be a sign of scam, or some new version of contract, please double check before proceeding`
    }
    else{
        answer = await promter.promtTxAnalyse(tx);
        cat = ResponseCategory.regular;
    }
    
    return {answer, cat}
}

export default {txAnalyse};