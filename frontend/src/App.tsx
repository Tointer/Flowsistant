import { useState } from 'react'
import AskForm from './AskForm.tsx'
import {CssVarsProvider} from '@mui/joy/styles';
import './App.css'
import NavBar from './NavBar.tsx'
 

function App() {
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

export default App
