function fiatTransfer(fungibleTokenAddress : string, fiatTokenAddress: string,  amount : number, to : string): string{
    return `
    import FungibleToken from ${fungibleTokenAddress}
    import FiatToken from ${fiatTokenAddress}
    
    transaction() {
    
        // The Vault resource that holds the tokens that are being transferred
        let sentVault: @FungibleToken.Vault
    
        prepare(signer: AuthAccount) {
    
            // Get a reference to the signer's stored vault
            let vaultRef = signer.borrow<&FiatToken.Vault>(from: FiatToken.VaultStoragePath)
                ?? panic("Could not borrow reference to the owner's Vault!")
    
            // Withdraw tokens from the signer's stored vault
            self.sentVault <- vaultRef.withdraw(amount: ${amount})
        }
    
        execute {
    
            // Get the recipient's public account object
            let recipient = getAccount(${to})
    
            // Get a reference to the recipient's Receiver
            let receiverRef = recipient.getCapability(FiatToken.VaultReceiverPubPath)
                .borrow<&{FungibleToken.Receiver}>()
                ?? panic("Could not borrow receiver reference to the recipient's Vault")
    
            // Deposit the withdrawn tokens in the recipient's receiver
            receiverRef.deposit(from: <-self.sentVault)
        }
    }
    `
}

function buyTopshotMoment(seller : string, recipient: string): string{
    return `
import FungibleToken from 0xf233dcee88fe0abe
import DapperUtilityCoin from 0xead892083b3e2c6c
import TopShot from 0x0b2a3299cc857e29
import Market from 0xc1e4f4f4c4257510
import TopShotMarketV3 from 0xc1e4f4f4c4257510

// This transaction purchases a moment from the v3 sale collection
// The v3 sale collection will also check the v1 collection for for sale moments as part of the purchase
// If there is no v3 sale collection, the transaction will just purchase it from v1 anyway

transaction() {

	let purchaseTokens: @DapperUtilityCoin.Vault

	prepare(acct: AuthAccount) {

		// Borrow a provider reference to the buyers vault
		let provider = acct.borrow<&DapperUtilityCoin.Vault{FungibleToken.Provider}>(from: /storage/dapperUtilityCoinVault)
			?? panic("Could not borrow a reference to the buyers FlowToken Vault")
		
		// withdraw the purchase tokens from the vault
		self.purchaseTokens <- provider.withdraw(amount: UFix64(21)) as! @DapperUtilityCoin.Vault
		
	}

	execute {

		// get the accounts for the seller and recipient
		let seller = getAccount(${seller})
		let recipient = getAccount(${recipient})

		// Get the reference for the recipient''s nft receiver
		let receiverRef = recipient.getCapability(/public/MomentCollection)!.borrow<&{TopShot.MomentCollectionPublic}>()
			?? panic("Could not borrow a reference to the recipients moment collection")

		if let marketV3CollectionRef = seller.getCapability(/public/topshotSalev3Collection)
				.borrow<&{Market.SalePublic}>() {

			let purchasedToken <- marketV3CollectionRef.purchase(tokenID: 41871293, buyTokens: <-self.purchaseTokens)
			receiverRef.deposit(token: <-purchasedToken)

		} else if let marketV1CollectionRef = seller.getCapability(/public/topshotSaleCollection)
			.borrow<&{Market.SalePublic}>() {
			// purchase the moment
			let purchasedToken <- marketV1CollectionRef.purchase(tokenID: 41871293, buyTokens: <-self.purchaseTokens)

			// deposit the purchased moment into the signer''s collection
			receiverRef.deposit(token: <-purchasedToken)

		} else {
			panic("Could not borrow reference to either Sale collection")
		}
	}
}
    `
}

export default {fiatTransfer, buyTopshotMoment};