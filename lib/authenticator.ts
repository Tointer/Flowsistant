import * as fcl from "@onflow/fcl"
import { CurrentUser } from "@onflow/typedefs";

fcl.config({
    "accessNode.api": "https://access-mainnet-beta.onflow.org",
    "discovery.wallet": "https://fcl-discovery.onflow.org/authn"
})

async function auth(): Promise<CurrentUser> {
    let currentUser = await fcl.currentUser.snapshot()

    if(currentUser.addr){
        return currentUser;
    }

    await fcl.authenticate();
    
    currentUser = await fcl.currentUser.snapshot();
    console.log("User auth with: " + currentUser.addr)

    return currentUser;
}

export default {auth};