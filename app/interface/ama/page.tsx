import { Textarea } from "@/components/ui/textarea"
import Image from 'next/image'

export default function AMA() {

  return (
      <div className='mt-10 flex flex-col text-center gap-4'>
        <h1 className="text-3xl font-bold">Ask me anything about Flow, your account or transactions</h1>
        <div className='flex flex-col items-center gap-4 mb-10'>
            <Textarea 
                className='max-w-2xl w-full'
                placeholder="Coming soon!" 
                disabled={true}
            />
            <div className="flex max-w-screen-sm bg-teal-800  border rounded-lg shadow mt-36 border-teal-950">
                <Image
                    className="m-4 object-contain dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
                    src="/user.png"
                    alt="assistant mascot image"
                    height={100}
                    width={100}
                    priority
                />
                <div className={`block p-3 text-left bg-zinc-900 border rounded-lg shadow   border-gray-700`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-200"></h5>
                    <p className="font-normal text-gray-200">How many USDC did I send to address 0xc1e4f4f4c4257510 in the last 3 months?</p>
                </div>
            </div>
            <div className="flex max-w-screen-sm bg-zinc-900 border rounded-lg shadow  border-gray-700">
                <Image
                    className="m-4 object-contain dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
                    src="/calm.png"
                    alt="assistant mascot image"
                    height={100}
                    width={100}
                    priority
                />
                <div className={`block p-3 text-left bg-teal-800 border rounded-lg shadow  border-teal-950`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-200">You sent 750 USDC</h5>
                    <p className="font-normal text-gray-200">300 in May, 250 in June, and 200 in July</p>
                </div>
            </div>
        </div>
      </div>
  )
}


