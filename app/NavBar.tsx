"use client"

import * as React from 'react';
import { Navbar, Button, Link, Text } from "@nextui-org/react";

export default function NavBar(props: {onTabChange: (tabIndex: number) => void}) {
  const [index, setIndex] = React.useState(0);
  return (
    <Navbar isBordered variant="floating">
    <Navbar.Brand>
      <Text b color="inherit" hideIn="xs">
        Flowsistant
      </Text>
    </Navbar.Brand>
    <Navbar.Content hideIn="xs" variant="highlight-rounded">
      <Navbar.Link isActive href="#">Home</Navbar.Link>
      <Navbar.Link href="#">Ask anything</Navbar.Link>
      <Navbar.Link href="#">TX analyser</Navbar.Link>
    </Navbar.Content>
    <Navbar.Content>
      <Navbar.Link color="inherit" href="#">
        Get in contact
      </Navbar.Link>
    </Navbar.Content>
  </Navbar>
  );
}