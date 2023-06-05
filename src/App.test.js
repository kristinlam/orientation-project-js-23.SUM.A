import { render, screen } from "@testing-library/react";
// import AddSkill from "./pages/AddSkill";
import Home from "./pages/Home";
import { BrowserRouter } from "react-router-dom";

describe("Home page test", () => {
  test("renders Home page", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const linkElement = screen.getByText("Export");
    expect(linkElement).toBeInTheDocument();
  });
});
