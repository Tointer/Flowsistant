"use client"
import { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import DialogBox from '../DialogBox';
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { ResponseCategory } from "../../../lib/types";
import authenticator from "../../../lib/authenticator";

export default function TXAsk() {
  const [resultPresented, setResultPresented] = useState(false)
  const [waitingResult, setWaitingResult] = useState(false)
  const [inputContent, setInputContent] = useState("")
  const [helperMessage, setHelperMessage] = useState("")
  const [responseCategory, setResponseCategory] = useState<ResponseCategory>(ResponseCategory.none)

  async function onAsk(){
    const user = await authenticator.auth();
    if (!user.addr) {
        return;
    }

    setWaitingResult(true);
    fetch('/api/tx-ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tx: inputContent })
    }).then(data => {
        console.log(JSON.stringify(data));
        data.json().then(response => {
            console.log(response);
            setHelperMessage(response.answer)
            setResultPresented(true);
            setWaitingResult(false);
            setResponseCategory(response.cat)
        });
    })
  }

  function onCodeChange(value: string) {
      setResultPresented(false);
      setInputContent(value);
  }

  return (
      <div className='mt-10 flex flex-col text-center'>
        <h1 className="text-3xl font-bold">Paste transaction here:</h1>
        <div className='flex flex-col items-center gap-4 mb-10'>
        <CodeMirror
            className="text-left max-w-2xl w-full'"
            minWidth='600px'
            minHeight='100px'
            value={codeExample}
            theme='dark'
            lang="javascript"
            extensions={[javascript({ jsx: true })]}
            onChange={onCodeChange}
        />
        {resultPresented ? 
            <DialogBox message={helperMessage} cat={responseCategory} /> 
            : 
            waitingResult?
                <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Thinking
                </Button>
                :
                <Button className="bg-teal-800 text-white" onClick={onAsk}>Ask</Button>
        }
        </div>
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
