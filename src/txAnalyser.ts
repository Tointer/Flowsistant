import txForge from './txForge.js';
import importAnalyser from './importAnalyser.js';
import promter from './promter.js';

enum ResponseOverride {
    None,
    WrongImports    = 1 << 1,
}

export async function txAnalyse(tx : string): Promise<string>{

    let overrides =  ResponseOverride.None;
    const wrongInputs = importAnalyser.checkImports(tx);
    if(wrongInputs.wrong_contracts.length > 0){
        overrides |= ResponseOverride.WrongImports;
    }

    if(overrides & ResponseOverride.WrongImports){
        console.log(`Wrong imports on tx: ${wrongInputs.wrong_contracts}`);
        return `Your transaction are interacting with contract that have name of some popular contract, but with different address.
        This can be a sign of scam, or some new version of contract, please double check before proceeding`
    }
    
    return await promter.promtTxAnalyse(tx);
}

export default {txAnalyse};