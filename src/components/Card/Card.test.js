import { render, screen, fireEvent } from "@testing-library/react";
import Card from ".";

describe("Voting", () => {
  test("should upvote", () => {
    render(<Card />);
    const btn = screen.getByRole("upvote-icon");
    let count = screen.getByRole("upvote-count").textContent;
    expect(count).toBe("0");
    fireEvent.click(btn);
    count = screen.getByRole("upvote-count").textContent;
    expect(count).toBe("1");
  });

  test("should downvote", () => {
    render(<Card />);
    const btn = screen.getByRole("downvote-icon");
    let count = screen.getByRole("downvote-count").textContent;
    expect(count).toBe("0");
    fireEvent.click(btn);
    count = screen.getByRole("downvote-count").textContent;
    expect(count).toBe("1");
  });

  test("should revert upvote", () => {
    render(<Card />);
    const btn = screen.getByRole("upvote-icon");
    fireEvent.click(btn);

    let count = screen.getByRole("upvote-count").textContent;
    expect(count).toBe("1");
    fireEvent.click(btn);
    count = screen.getByRole("upvote-count").textContent;
    expect(count).toBe("0");
  });

  test("should revert downvote", () => {
    render(<Card />);
    const btn = screen.getByRole("downvote-icon");
    fireEvent.click(btn);

    let count = screen.getByRole("downvote-count").textContent;
    expect(count).toBe("1");
    fireEvent.click(btn);
    count = screen.getByRole("downvote-count").textContent;
    expect(count).toBe("0");
  });

  test("should handle upvote if already downvoted", () => {
    render(<Card />);
    const downvoteBtn = screen.getByRole("downvote-icon");
    fireEvent.click(downvoteBtn);

    let downvoteCount = screen.getByRole("downvote-count").textContent;
    let upvoteCount = screen.getByRole("upvote-count").textContent;
    expect(downvoteCount).toBe("1");
    expect(upvoteCount).toBe("0");

    const upvoteBtn = screen.getByRole("upvote-icon");
    fireEvent.click(upvoteBtn);

    downvoteCount = screen.getByRole("downvote-count").textContent;
    upvoteCount = screen.getByRole("upvote-count").textContent;
    expect(downvoteCount).toBe("0");
    expect(upvoteCount).toBe("1");
  });

  test("should handle downvote if already upvoted", () => {
    render(<Card />);
    const upvoteBtn = screen.getByRole("upvote-icon");
    fireEvent.click(upvoteBtn);

    let upvoteCount = screen.getByRole("upvote-count").textContent;
    let downvoteCount = screen.getByRole("downvote-count").textContent;
    expect(upvoteCount).toBe("1");
    expect(downvoteCount).toBe("0");

    const downvoteBtn = screen.getByRole("downvote-icon");
    fireEvent.click(downvoteBtn);

    upvoteCount = screen.getByRole("upvote-count").textContent;
    downvoteCount = screen.getByRole("downvote-count").textContent;
    expect(upvoteCount).toBe("0");
    expect(downvoteCount).toBe("1");
  });
});

describe("Favorite", () => {
  test("should toggle favorite", () => {
    const onFavoriteClick = jest.fn();
    render(<Card onFavoriteClick={onFavoriteClick} />);
    const favoriteBtn = screen.getByRole("favorite-icon");
    expect(favoriteBtn).toHaveClass("outline");
    fireEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveClass("filled");
    fireEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveClass("outline");
  });
});
