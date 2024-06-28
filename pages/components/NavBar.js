// components/NavigationBar.js

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { visitedCitiesAtom } from '../atoms/jotai'; // Adjust the path if necessary

export default function NavigationBar() {
  const [searchId, setSearchId] = useState('');
  const [visitedCities] = useAtom(visitedCitiesAtom);
  const router = useRouter(); // Using Next.js router for programmatic navigation

  const handleInputChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (searchId) {
      router.push(`/city/${searchId}`);
      setSearchId(''); // Optionally clear the input after searching
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Navbar.Brand href="/">Weather App by Thuan</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <NavDropdown title="Previously Viewed" id="basic-nav-dropdown">
            {visitedCities.length > 0 ? (
              visitedCities.map((city, index) => (
                <Link href={`/city/${city.id}`} passHref key={index}>
                  <NavDropdown.Item>City: {city.name || city.id}</NavDropdown.Item>
                </Link>
              ))
            ) : (
              <NavDropdown.Item>No cities viewed</NavDropdown.Item>
            )}
          </NavDropdown>
        </Nav>
        <Form className="d-flex ms-auto" onSubmit={handleFormSubmit}>
          <FormControl
            type="text"
            placeholder="City ID"
            className="me-2"
            value={searchId}
            onChange={handleInputChange}
          />
          <Button variant="outline-info" type="submit">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
