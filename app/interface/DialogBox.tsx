import Image from 'next/image'

function DialogBox(props: {
    message: string, 
    status: "alert" | "warning" | "ok" | "error"
}) 
{
  return ( 
    <div className="flex max-w-screen-sm bg-zinc-900 border rounded-lg shadow  border-gray-700">
      <Image
        className="m-4 object-contain dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
        src={getPictureFromStatus(props.status)}
        alt="assistant mascot image"
        height={100}
        width={100}
        priority
      />
      <div className="block p-3 text-left bg-teal-800 border rounded-lg shadow  border-teal-950">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-200">{getTitleFromStatus(props.status)}</h5>
        <p className="font-normal text-gray-200">{props.message}</p>
      </div>
    </div>
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
