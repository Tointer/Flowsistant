import Image from 'next/image'
import { ResponseCategory } from "../../lib/types";

function DialogBox(props: {
    message: string, 
    cat: ResponseCategory
}) 
{
  return ( 
    <div className="flex max-w-screen-sm bg-zinc-900 border rounded-lg shadow  border-gray-700">
      <Image
        className="m-4 object-contain dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
        src={getPictureFromStatus(props.cat)}
        alt="assistant mascot image"
        height={100}
        width={100}
        priority
      />
      <div className={`block p-3 text-left bg-${getBgCol(props.cat)} border rounded-lg shadow  border-${getBorderCol(props.cat)}`}>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-200">{getTitleFromStatus(props.cat)}</h5>
        <p className="font-normal text-gray-200">{props.message}</p>
      </div>
    </div>
  )
}

function getBgCol(status: ResponseCategory){
    switch(status){
        case ResponseCategory.alarm:
            return "red-800"
        case ResponseCategory.warning:
            return "yellow-700"
        case ResponseCategory.regular:
            return "teal-800"
        case ResponseCategory.error:
            return "teal-800"
        case ResponseCategory.none:
            return "teal-800"
    }
}

function getBorderCol(status: ResponseCategory){
    switch(status){
        case ResponseCategory.alarm:
            return "red-950"
        case ResponseCategory.warning:
            return "yellow-950"
        case ResponseCategory.regular:
            return "teal-950"
        case ResponseCategory.error:
            return "teal-950"
        case ResponseCategory.none:
            return "teal-950"
    }
}

function getPictureFromStatus(status: ResponseCategory){
    switch(status){
        case ResponseCategory.alarm:
            return "/alarmed.png"
        case ResponseCategory.warning:
            return "/concerned.png"
        case ResponseCategory.regular:
            return "/calm.png"
        case ResponseCategory.error:
            return "/calm.png"
        case ResponseCategory.none:
            return "/calm.png"
    }
}

function getTitleFromStatus(status: ResponseCategory){
    switch(status){
        case ResponseCategory.alarm:
            return "Scam alert!"
        case ResponseCategory.warning:
            return "Are you sure?"
        case ResponseCategory.regular:
            return "Hello there!"
        case ResponseCategory.error:
            return "Something went wrong"
        case ResponseCategory.none:
            return "Something went wrong"
    }
}

export default DialogBox
