import mainnet from './mainnetContext.json' assert { type: "json" };

function checkScam(tx : string): string[]{
    
    //regex that matches all addresses in transaction, starting with 0x and spanning 18 characters
    const addressRegex = /0x[a-zA-Z0-9]{16}/g;
    const matched = Array.from(tx.matchAll(addressRegex)).map(x => x[0]);
    console.log("Addresses: " + matched)

    return matched.filter(x => mainnet.scam.includes(x));
}

export default {checkScam};