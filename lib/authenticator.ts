import * as fcl from "@onflow/fcl"
import { CurrentUser } from "@onflow/typedefs";

fcl.config({
    "accessNode.api": "https://access-mainnet-beta.onflow.org",
    "discovery.wallet": "https://fcl-discovery.onflow.org/authn"
})

async function auth(): Promise<CurrentUser> {
    console.log("Auth start")
    let currentUser = await fcl.currentUser.snapshot()
    if(currentUser.addr){
        console.log("User exists: " + currentUser.addr)
        return currentUser;
    }

    console.log("User does not exist, authenticating")
    await fcl.authenticate();
    

    currentUser = await fcl.currentUser.snapshot();

    console.log("User auth with: " + currentUser.addr)

    return currentUser;
}

export default {auth};