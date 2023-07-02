"use client"

import AskForm from './AskForm'
import {CssVarsProvider} from '@mui/joy/styles';
import NavBar from './NavBar'

export default function Home() {
  return (
    <>
    <NavBar tabs={["AMA", "TX analyser"]} onTabChange={() => {}}></NavBar>
    <div className='mt-10 flex flex-col text-center'>
      <CssVarsProvider defaultMode='dark'>
        <h1 className="text-3xl font-bold">Transaction analyzer</h1>
        <AskForm></AskForm>
      </CssVarsProvider>
    </div>
    </>
  )
}
