import { useState } from 'react'
import alarmedState from './assets/alarmed.png'
import concernedState from './assets/concerned.png'
import calm from './assets/calm.png'
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';


function DialogBox() {
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
          <img alt="" src={calm}/>
        </AspectRatio>
      </CardOverflow>
      <CardContent sx={{ gap: 1.5, minWidth: 200 }}>
        <CardContent>
          <Typography level="h2" fontSize="xl">
            Need Some Help?
          </Typography>
          <Typography fontSize="sm" sx={{ mt: 0.5 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor.
          </Typography>
        </CardContent>
      </CardContent>
    </Card>
  )
}


export default DialogBox
