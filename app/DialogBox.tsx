import { useState } from 'react'

import Image from 'next/image'


function DialogBox(props: {
    message: string, 
    status: "alert" | "warning" | "ok" | "error"
}) 
{
  return (
    <Image
    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
    src={getPictureFromStatus(props.status)}
    alt="assistant mascot image"
    height={200}
    width={200}
    priority
    />
  )
}

function getPictureFromStatus(status: "alert" | "warning" | "ok" | "error"){
    switch(status){
        case "alert":
            return "/alarmed.png"
        case "warning":
            return "/concerned.png"
        case "ok":
            return "/calm.png"
        case "error":
            return "/calm.png"
    }
}

function getTitleFromStatus(status: "alert" | "warning" | "ok" | "error"){
    switch(status){
        case "alert":
            return "Scam alert!"
        case "warning":
            return "Are you sure?"
        case "ok":
            return "Hello there!"
        case "error":
            return "Something went wrong, try again!"
    }
}

export default DialogBox
