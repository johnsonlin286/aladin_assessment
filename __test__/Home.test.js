import { render, screen } from "@testing-library/react";

import Home from "../pages/index";
import "@testing-library/jest-dom";

describe("Home", () => {
  test("Render Home Page", () => {
    render(<Home />);
    expect(screen.getByTestId("layout")).toBeInTheDocument();
    expect(screen.getByTestId("headernav")).toBeInTheDocument();
    expect(screen.queryByTestId("toast")).toBeNull();
    expect(screen.getByTestId("homepage")).toBeInTheDocument();
  });

  test("Render list of Pokemon", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [
        {
          id: 1,
          name: "bulbasaur",
          sprite:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        },
      ],
    });
    render(<Home />);
    const listElms = await screen.findAllByRole("link");
    expect(listElms).not.toHaveLength(0);
  });
});
