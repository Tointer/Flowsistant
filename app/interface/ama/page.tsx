"use client"
import { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import DialogBox from '../DialogBox';
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { ResponseCategory } from '../../../lib/types';
import authenticator from "../../../lib/authenticator";

export default function AMA() {
  const [resultPresented, setResultPresented] = useState(false)
  const [waitingResult, setWaitingResult] = useState(false)
  const [inputContent, setInputContent] = useState("")
  const [helperMessage, setHelperMessage] = useState("")
  const [helperTitle, setHelperTitle] = useState("")
  const [responseCategory, setResponseCategory] = useState<ResponseCategory>(ResponseCategory.none)

  async function onAsk(){
    const user = await authenticator.auth();
    if (!user.addr) {
        return;
    }

    setWaitingResult(true);
    fetch('/api/ama-ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: inputContent, userAddress: user.addr })
    }).then(data => {
        console.log(JSON.stringify(data));
        data.json().then(response => {
            console.log(response);
            setHelperMessage(response.answer);
            setResultPresented(true);
            setWaitingResult(false);
            setHelperTitle(response.title);
            setResponseCategory(response.cat);
        });
    })
  }

  function onCodeChange(value: string) {
      setResultPresented(false);
      setInputContent(value);
  }

  return (
      <div className='mt-10 flex flex-col text-center gap-4'>
        <h1 className="text-3xl font-bold">Ask me anything about Flow!</h1>
        <div className='flex flex-col items-center gap-4 mb-10'>
        <Textarea 
            className='max-w-2xl w-full'
            placeholder="Type here." 
            onChange={(e) => onCodeChange(e.target.value)}
        />
        {resultPresented ? 
            <DialogBox title={helperTitle} message={helperMessage} cat={responseCategory} /> 
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


