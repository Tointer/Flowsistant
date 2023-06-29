import { useState } from 'react'
import Textarea from '@mui/joy/Textarea';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import DialogBox from './DialogBox';

function AskForm() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col items-center gap-4'>
    <CodeMirror
        className="text-left"
        value={codeExample}
        theme='dark'
        lang="javascript"
        extensions={[javascript({ jsx: true })]}
    />
    <DialogBox/>
    
    </div>
  )
}

const codeExample = `
import FungibleToken from 0x0b2a3299cc857e29
import FiatToken from 0x0b2a3299cc857e29

transaction() {

    // The Vault resource that holds the tokens that are being transferred
    let sentVault: @FungibleToken.Vault

    prepare(signer: AuthAccount) {

        // Get a reference to the signer's stored vault
        let vaultRef = signer.borrow<&FiatToken.Vault>(from: FiatToken.VaultStoragePath)
            ?? panic("Could not borrow reference to the owner's Vault!")

        // Withdraw tokens from the signer's stored vault
        self.sentVault <- vaultRef.withdraw(amount: 5000)
    }

    execute {

        // Get the recipient's public account object
        let recipient = getAccount(0x0b2a3299cc857e29)

        // Get a reference to the recipient's Receiver
        let receiverRef = recipient.getCapability(FiatToken.VaultReceiverPubPath)
            .borrow<&{FungibleToken.Receiver}>()
            ?? panic("Could not borrow receiver reference to the recipient's Vault")

        // Deposit the withdrawn tokens in the recipient's receiver
        receiverRef.deposit(from: <-self.sentVault)
    }
}
`

export default AskForm
