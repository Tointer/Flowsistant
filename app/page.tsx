import DialogBox from './interface/DialogBox'
import { ResponseCategory } from "../lib/types";
import Blob from "./animatedBlob"

export default function Home() {
  return (
    <>
      <div className='mt-10 flex flex-col text-center'>
        <h1 className='text-4xl font-bold'>Your own AI-powered Flow assistant</h1>
        <div className="m-8">
          <p className='mt-4 text-xl'>Flowsistant is your handy tool in helping users feel more comfortable with confusing onchain transactions.</p>
          <p className='mt-2 text-xl'>Simply feed transaction and user address to flowsistant API endpoint</p>
        </div>
        <Blob></Blob>
        <section >
          <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
              <div className="space-y-8">
                <DialogBox  title="Hello there!" message="You are sending an NFT with ID 55 from your address to the recepient at address 0x37139ff112e35a07" cat={ResponseCategory.regular}/>
                <DialogBox title="Going full permissionless!" message="You are linking account 0x26139ff112e35a18 with your account. This will give you full custody of its assets" cat={ResponseCategory.regular}/>
              </div>
              <div className="mt-4 md:mt-0">
                  <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">It will explain transaction in plain english</h2>
                  <p className="mb-6 font-light  md:text-lg text-gray-400">Do you have this anxiety when sending something important to another address, no matter how frequent you do it? Flowsistant created to remove this anxiety by explaining what transactions do in simple terms. And it can do so with any transaction, thanks to GPT-3</p>
              </div>
          </div>
        </section>

        <section >
          <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
              <div className="mt-4 md:mt-0">
                  <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">It will warn if something is off</h2>
                  <p className="mb-6 font-light  md:text-lg text-gray-400">Flowsistant have additional mechanisms to see if transaction is suspicious. There are several systems that will scan transaction</p>
              </div>
              <div className="space-y-8">
                <DialogBox  title="Are you sure?" message="Your transaction are interacting with contract that have name of some popular contract, but with different address.
        This can be a sign of scam, or some new version of contract, please double check before proceeding" cat={ResponseCategory.warning}/>
                <DialogBox title="You will lose this account" message="You are linking your account to 0x26139ff112e35a18. You will lose control of your account after this transaction. Are you sure you want to proceed?" cat={ResponseCategory.warning}/>
              </div>
          </div>
        </section>

        <section >
          <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
              <div className="space-y-8">
                <DialogBox title="Scam alert!" message="Your transaction is interacting with scam address 0x26139ff112e35a18, do NOT proceed!" cat={ResponseCategory.alarm}/>
                <DialogBox title="Compromised contract!" message="You are interacting with compromised contract, do NOT proceed!" cat={ResponseCategory.alarm}/>
              </div>
              <div className="mt-4 md:mt-0">
                  <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">It will protect</h2>
                  <p className="mb-6 font-light  md:text-lg text-gray-400">We don't need multiple users to interact with dangerous website. If just one will report it, we can mark it and prevent users from losing funds</p>
              </div>
          </div>
        </section>
        <h1 className='text-4xl font-bold m-8'>
          Want to test how it work? Here is <a href="/interface/tx-ask" className='text-blue-600  hover:underline'>web interface demonstration</a>
        </h1>
      </div>
    </>
  )
}
