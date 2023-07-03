"use client"
import { createTheme, NextUIProvider } from "@nextui-org/react"
import { ThemeProvider } from 'next-themes';
import NavBar from './NavBar'
import AskForm from './AskForm'

const lightTheme = createTheme({
  type: 'light',
})

const darkTheme = createTheme({
  type: 'dark',
})

export default function Home() {
  return (
    <>
    <ThemeProvider
      defaultTheme="system"
      attribute="class"
      value={{
      light: lightTheme.className,
      dark: darkTheme.className
    }}>
      <NextUIProvider>
        <NavBar onTabChange={() => {}}></NavBar>
        <div className='mt-10 flex flex-col text-center'>
          <h1 className="text-3xl font-bold">Transaction analyzer</h1>
          <AskForm></AskForm>
        </div>
      </NextUIProvider>
    </ThemeProvider>
    </>
  )
}
