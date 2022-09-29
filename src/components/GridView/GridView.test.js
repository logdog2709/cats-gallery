import { render, screen, fireEvent } from "@testing-library/react";
import GridView from ".";

const SAMPLE_CATS = [
  {
    id: "f13dfRvcO",
    url: "https://cdn2.thecatapi.com/images/f13dfRvcO.jpg",
    sub_id: "0ec862f8-1af7-47a3-93d3-1f9de281f9aa",
  },
  {
    id: "f13dfRvc1",
    url: "https://cdn2.thecatapi.com/images/f13dfRvcO.jpg",
    sub_id: "0ec862f8-1af7-47a3-93d3-1f9de281f9aa",
  },
  {
    id: "f13dfRvc2",
    url: "https://cdn2.thecatapi.com/images/f13dfRvcO.jpg",
    sub_id: "0ec862f8-1af7-47a3-93d3-1f9de281f9aa",
  },
];

describe("Favorite", () => {
  test("should render grid loader", () => {
    render(<GridView loading={true} />);
    const loader = screen.getByRole("loader");
    expect(loader).toBeInTheDocument();
  });

  test("should hide grid loader", () => {
    render(<GridView loading={false} />);
    const loader = screen.queryByRole("loader");
    expect(loader).not.toBeInTheDocument();
  });

  test("should render cat images", () => {
    render(<GridView loading={false} data={SAMPLE_CATS} />);
    const catImages = screen.getAllByRole("cat-image");
    expect(catImages).toHaveLength(3);
  });

  test("should show no records message", () => {
    render(<GridView loading={false} data={[]} />);
    const noRecords = screen.getByRole("no-records");
    expect(noRecords).toBeInTheDocument();
  });
});
