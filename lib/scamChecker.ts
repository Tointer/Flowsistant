import mainnet from './mainnetContext.json' assert { type: "json" };

function checkScamInteraction(transaction : string): string[]{
    
    //regex that matches all addresses in transaction, starting with 0x and spanning 18 characters
    const addressRegex = /0x[a-zA-Z0-9]{18}/g;
    const matched = transaction.matchAll(addressRegex);

    return Array.from(matched).map(x => x[0]).filter(x => Object.entries(mainnet.scam).includes(x as any));
}

export default {checkScamInteraction};