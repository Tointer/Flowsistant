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

function custodyFromWaletless(parent : string, child: string): string{
	return `
#allowAccountLinking

import MetadataViews from 0xMetadataViews
import NonFungibleToken from 0xNonFungibleToken
import LinkedAccountMetadataViews from 0xLinkedAccountMetadataViews
import LinkedAccounts from 0xLinkedAccounts

/// Links thie signing accounts as labeled, with the child's AuthAccount Capability
/// maintained in the parent's LinkedAccounts.Collection
///
transaction(
	linkedAccountName: String,
	linkedAccountDescription: String,
	clientThumbnailURL: String,
	clientExternalURL: String
) {

	let collectionRef: &LinkedAccounts.Collection
	let info: LinkedAccountMetadataViews.AccountInfo
	let authAccountCap: Capability<&AuthAccount>
	let linkedAccountAddress: Address

	prepare(parent: ${parent}, child: ${child}) {
		
		/** --- Configure Collection & get ref --- */
		//
		// Check that Collection is saved in storage
		if parent.type(at: LinkedAccounts.CollectionStoragePath) == nil {
			parent.save(
				<-LinkedAccounts.createEmptyCollection(),
				to: LinkedAccounts.CollectionStoragePath
			)
		}
		// Link the public Capability
		if !parent.getCapability<
				&LinkedAccounts.Collection{LinkedAccounts.CollectionPublic, MetadataViews.ResolverCollection}
			>(LinkedAccounts.CollectionPublicPath).check() {
			parent.unlink(LinkedAccounts.CollectionPublicPath)
			parent.link<&LinkedAccounts.Collection{LinkedAccounts.CollectionPublic, MetadataViews.ResolverCollection}>(
				LinkedAccounts.CollectionPublicPath,
				target: LinkedAccounts.CollectionStoragePath
			)
		}
		// Link the private Capability
		if !parent.getCapability<
				&LinkedAccounts.Collection{LinkedAccounts.CollectionPublic, NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver, NonFungibleToken.Provider, MetadataViews.ResolverCollection}
			>(LinkedAccounts.CollectionPrivatePath).check() {
			parent.unlink(LinkedAccounts.CollectionPrivatePath)
			parent.link<
				&LinkedAccounts.Collection{LinkedAccounts.CollectionPublic, NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver, NonFungibleToken.Provider, MetadataViews.ResolverCollection}
			>(
				LinkedAccounts.CollectionPrivatePath,
				target: LinkedAccounts.CollectionStoragePath
			)
		}
		// Get Collection reference from signer
		self.collectionRef = parent.borrow<
				&LinkedAccounts.Collection
			>(
				from: LinkedAccounts.CollectionStoragePath
			)!

		/* --- Link the child account's AuthAccount Capability & assign --- */
		//
		// **NOTE:** You'll want to consider adding the AuthAccount Capability path suffix as a transaction arg
		let authAccountPath: PrivatePath = PrivatePath(identifier: "RPSAuthAccountCapability")
			?? panic("Couldn't create Private Path from identifier: RPSAuthAccountCapability")
		// Get the AuthAccount Capability, linking if necessary
		if !child.getCapability<&AuthAccount>(authAccountPath).check() {
			// Unlink any Capability that may be there
			child.unlink(authAccountPath)
			// Link & assign the AuthAccount Capability
			self.authAccountCap = child.linkAccount(authAccountPath)!
		} else {
			// Assign the AuthAccount Capability
			self.authAccountCap = child.getCapability<&AuthAccount>(authAccountPath)
		}
		self.linkedAccountAddress = self.authAccountCap.borrow()?.address ?? panic("Problem with retrieved AuthAccount Capability")

		/** --- Construct metadata --- */
		//
		// Construct linked account metadata from given arguments
		self.info = LinkedAccountMetadataViews.AccountInfo(
			name: linkedAccountName,
			description: linkedAccountDescription,
			thumbnail: MetadataViews.HTTPFile(url: clientThumbnailURL),
			externalURL: MetadataViews.ExternalURL(clientExternalURL)
		)
	}

	execute {
		// Add child account if it's parent-child accounts aren't already linked
		// *NOTE:*** You may want to add handlerPathSuffix as a transaction arg for greater flexibility as
		// this is where the LinkedAccounts.Handler will be saved in the linked account
		if !self.collectionRef.getLinkedAccountAddresses().contains(self.linkedAccountAddress) {
			// Add the child account
			self.collectionRef.addAsChildAccount(
				linkedAccountCap: self.authAccountCap,
				linkedAccountMetadata: self.info,
				linkedAccountMetadataResolver: nil,
				handlerPathSuffix: "RPSLinkedAccountHandler"
			)
		}
	}

	post {
		self.collectionRef.getLinkedAccountAddresses().contains(self.linkedAccountAddress):
			"Problem linking accounts!"
	}
}`
}

export default {fiatTransfer, buyTopshotMoment};