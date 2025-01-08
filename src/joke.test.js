import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Joke from "./joke.js";

describe("Joke Component", () => {
  test("renders correctly with given props", () => {
    const { container } = render(
      <Joke vote={() => {}} votes={5} text="Funny joke text" id={1} />
    );
    expect(container).toMatchSnapshot();
  });

  test("displays joke text and votes correctly", () => {
    render(<Joke vote={() => {}} votes={10} text="Hilarious joke" id={2} />);
    expect(screen.getByText("Hilarious joke")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  test("calls vote function with correct arguments when upvote and downvote buttons are clicked", () => {
    const mockVote = jest.fn();
    render(<Joke vote={mockVote} votes={0} text="Vote testing joke" id={3} />);

    // Upvote button
    fireEvent.click(screen.getByRole("button", { name: /thumbs-up/i }));
    expect(mockVote).toHaveBeenCalledWith(3, 1);

    // Downvote button
    fireEvent.click(screen.getByRole("button", { name: /thumbs-down/i }));
    expect(mockVote).toHaveBeenCalledWith(3, -1);
  });
});
