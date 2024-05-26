import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Home link", () => {
  render(<App />);
  const HomeElement = screen.getByText(/Home/i);
  expect(HomeElement).toBeInTheDocument();
});
