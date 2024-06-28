// components/NavigationBar.js

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { visitedCitiesAtom } from '../atoms/jotai'; // Adjust the path if necessary

export default function NavigationBar() {
  const [searchId, setSearchId] = useState('');
  const [visitedCities] = useAtom(visitedCitiesAtom);

  const handleInputChange = (e) => {
    setSearchId(e.target.value);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Link href="/" passHref>
        <span>Weather App</span>
      </Link>
      <Navbar.Toggle aria-controls="navbar-content" />
      <Navbar.Collapse id="navbar-content">
        <Nav className="me-auto">
          <Link href="/" passHref>
            <span>Home</span>
          </Link>
          <NavDropdown title="Previously Viewed" id="basic-nav-dropdown">
            {visitedCities.length > 0 ? (
              visitedCities.map((city, index) => (
                <Link href={`/city/${city.id}`} passHref key={index}>
                  <NavDropdown.Item>City: {city.id}</NavDropdown.Item>
                </Link>
              ))
            ) : (
              <NavDropdown.Item>No cities viewed</NavDropdown.Item>
            )}
          </NavDropdown>
        </Nav>
        <Form className="d-flex ms-auto">
          <FormControl
            type="text"
            placeholder="City ID"
            className="me-2"
            onChange={handleInputChange}
          />
          <Link href={`/city/${searchId}`} passHref>
            <Button variant="outline-info">Search</Button>
          </Link>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
