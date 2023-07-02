import mainnet from './mainnetContext.json' assert { type: "json" };

interface ImportCheckResult{
    wrong_contracts: string[];
}

function checkImports(transaction : string): ImportCheckResult{
    const result : ImportCheckResult = {
        wrong_contracts: []
    };

    const importRegex = /import\s+([a-zA-Z0-9]+)\s+from\s+(0x[a-zA-Z0-9]+)/g;
    const matched = transaction.matchAll(importRegex);
    const arrays = Array.from(matched).map(x => [x[1], x[2]]);

    const mainnetDict = Object.entries(mainnet);

    for (const [contractName, contractAddress] of arrays) {
        if(mainnetDict.find(x => x[0] === contractName && x[1] !== contractAddress) !== undefined){
            result.wrong_contracts.push(contractName);
        }
    }

    return result;
}

export default {checkImports};