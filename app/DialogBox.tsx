import { useState } from 'react'
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Image from 'next/image'


function DialogBox(props: {
    message: string, 
    status: "alert" | "warning" | "ok" | "error"
}) 
{
  return (
    <Card
      size="lg"
      variant="plain"
      orientation="horizontal"
      sx={{
        textAlign: 'left',
        maxWidth: '100%',
        width: 500,
        // to make the demo resizable
        resize: 'horizontal',
        overflow: 'auto',
      }}
    >
      <CardOverflow
        variant="solid"
        color="neutral"
        sx={{
          flex: '0 0 200px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: 'var(--Card-padding)',
        }}
      >
        <AspectRatio ratio="1" objectFit="contain" variant="plain">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
            src={getPictureFromStatus(props.status)}
            alt="assistant mascot image"
            height={200}
            width={200}
            priority
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent sx={{ gap: 1.5, minWidth: 200 }}>
        <CardContent>
          <Typography level="h2" fontSize="xl">
            {getTitleFromStatus(props.status)}
          </Typography>
          <Typography fontSize="sm" sx={{ mt: 0.5 }}>
            {props.message}
          </Typography>
        </CardContent>
      </CardContent>
    </Card>
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
