import { useState } from 'react'
import alarmedState from './assets/alarmed.png'
import concernedState from './assets/concerned.png'
import calm from './assets/calm.png'
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';


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
          <img alt="" src={getPictureFromStatus(props.status)}/>
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
            return alarmedState
        case "warning":
            return concernedState
        case "ok":
            return calm
        case "error":
            return calm
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
