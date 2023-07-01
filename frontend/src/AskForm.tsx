import { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import DialogBox from './DialogBox';
import Button from '@mui/joy/Button';


function AskForm(props: {}) {
    const [resultPresented, setResultPresented] = useState(false)
    const [waitingResult, setWaitingResult] = useState(false)

    function onAsk(){
        setWaitingResult(true);
        fetch('/api/tx-ask')
            .then( r => r.json())
            .then( data => {
                console.log(data);
                setResultPresented(true);
                setWaitingResult(false);
            })

    }

    function onCodeChange(value: string) {
        setResultPresented(false);
    }

    return (
        <div className='flex flex-col items-center gap-4'>
        <CodeMirror
            className="text-left min-w-100"
            minWidth='500px'
            minHeight='100px'
            value={codeExample}
            theme='dark'
            lang="javascript"
            extensions={[javascript({ jsx: true })]}
            onChange={onCodeChange}
        />
        {resultPresented ? 
            <DialogBox message="Lmao" status="ok" /> 
            : 
            <Button onClick={onAsk} loading={waitingResult}>Ask</Button>
        }
        
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
