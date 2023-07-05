import txForge from './txForge';
import importAnalyser from './importAnalyser';
import scamChecker from './scamChecker';
import promter from './promter';
import { ResponseCategory } from './types';

// enum ResponseOverride {
//     None,
//     WrongImports    = 1 << 1,
//     Scam            = 1 << 2,
// }

export async function txAnalyse(tx : string): Promise<{answer: string, cat: ResponseCategory}>{

    let cat = ResponseCategory.none;
    let answer = "";

    const wrongInputs = importAnalyser.checkImports(tx);
    const scamAddresses = scamChecker.checkScam(tx);

    if(scamAddresses.length > 0){
        cat = ResponseCategory.alarm;
        answer = `Your transaction is interacting with scam address ${scamAddresses[0]}, do NOT proceed!`;
    }
    else if(wrongInputs.wrong_contracts.length > 0){
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