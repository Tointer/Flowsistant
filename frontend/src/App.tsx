import { useState } from 'react'
import AskForm from './AskForm.tsx'
import {CssVarsProvider} from '@mui/joy/styles';
 

function App() {
  return (
    <CssVarsProvider defaultMode='dark'>
      <h1 className="text-3xl font-bold">Transaction analyzer</h1>
      <div className="content-center text-center">
        <AskForm></AskForm>
      </div>
    </CssVarsProvider>
  )
}

export default App
