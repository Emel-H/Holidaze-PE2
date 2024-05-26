import { render, screen } from "@testing-library/react";
import App from "./App";
import Login from "./pages/login";
import userEvent from '@testing-library/user-event'
import React from 'react'
import '@testing-library/jest-dom'

test('App navigating', async () => {
  render(<App />);
  const user = userEvent;

  // verify page content for default route
  expect(screen.getByText(/dream vacation/i)).toBeInTheDocument();

  // verify page content for expected route after navigating
  await user.click(screen.getByText(/go to guide/i));
  expect(screen.getByText(/User Guide/i)).toBeInTheDocument();
  
  await user.click(screen.getByText(/home/i));
  await user.click(screen.getByText(/book now/i));
  expect(screen.getByText(/Venues catalog/i)).toBeInTheDocument();

  await user.click(screen.getByText(/home/i));
  await user.click(screen.getByText(/login/i));
  expect(screen.getByText(/login details/i)).toBeInTheDocument();

  await user.click(screen.getByText(/register here/i));
  expect(screen.getByText(/registration info/i)).toBeInTheDocument();
})

test("renders Home", () => {
  render(<App />);
  const HomeElement = screen.getByText(/Home/i);
  expect(HomeElement).toBeInTheDocument();
});
