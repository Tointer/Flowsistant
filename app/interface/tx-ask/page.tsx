"use client"
import AskForm from '../AskForm'

export default function Home() {
  return (
    <>
      <div className='mt-10 flex flex-col text-center'>
        <h1 className="text-3xl font-bold">Transaction analyzer</h1>
        <AskForm></AskForm>
      </div>
    </>
  )
}
