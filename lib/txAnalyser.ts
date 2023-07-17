import txForge from './txForge';
import importAnalyser from './importAnalyser';
import scamChecker from './blacklistChecker';
import promter from './promter';
import { ResponseCategory, UserContext } from './types';

// enum ResponseOverride {
//     None,
//     WrongImports    = 1 << 1,
//     Scam            = 1 << 2,
// }

export async function txAnalyse(tx : string, userContext: UserContext): Promise<{title: string, answer: string, cat: ResponseCategory}>{

    let cat = ResponseCategory.none;
    let answer = "";
    let title = ""

    const wrongInputs = importAnalyser.checkImports(tx);
    const {scams, compromised} = scamChecker.checkBlacklist(tx);

    if(scams.length > 0){
        cat = ResponseCategory.alarm;
        title = "Scam alert!"
        answer = `Your transaction is interacting with scam address ${scams[0]}, do NOT proceed!`;
    }
    else if(compromised.length > 0){
        cat = ResponseCategory.alarm
        title = "Compromised contract!"
        answer = `You are interacting with compromised contract ${compromised[0]}, do NOT proceed!`
    }
    else if(wrongInputs.wrong_contracts.length > 0){
        cat = ResponseCategory.warning
        title = "Are you sure?"
        answer = `Your transaction are interacting with contract that have name of some popular contract, but with different address.
        This can be a sign of scam, or some new version of contract, please double check before proceeding`
    }
    else if(tx.includes("#allowAccountLinking")){
        const linkAnswer = await promter.promtLinkingAccounts(tx);
        if(linkAnswer.parent === userContext.userAddress){
            cat = ResponseCategory.regular;
            title = "Going full custody!"
            answer = `You are linking account ${linkAnswer.child} to your address ${userContext.userAddress}. This will give you full custody of child account.`;
        }
        else if(linkAnswer.child === userContext.userAddress){
            cat = ResponseCategory.warning;
            title = "This may be dangerous"
            answer = `You are linking your account to ${linkAnswer.parent}. You will lose control of your account after this transaction. Are you sure you want to proceed?`;
        }
        else{
            cat = ResponseCategory.warning;
            title = "Are you sure?"
            answer = `Seems like this transaction involving account linking, but I can't figure out if it's safe. Please be cautios, as linking your account to someone else's will give them full control over your account.`;
        }
    }
    else{
        title = "Hello there"
        answer = await promter.promtTxAnalyse(tx, userContext);
        cat = ResponseCategory.regular;
    }
    
    return {title, answer, cat}
}

export default {txAnalyse};