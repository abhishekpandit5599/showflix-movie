import { render, screen } from "@testing-library/react";
import ShowCard from "./ShowCard";
import { Show } from "../../lib/types";
import { TestProviders } from "../../test-utils/TestProviders";

export const renderWithProviders = (ui: React.ReactElement) =>
  render(<TestProviders>{ui}</TestProviders>);

describe("ShowCard", () => {
  it("renders title and image", () => {
    const mockShow :Show = {
      id: 1,
      name: "Breaking Bad",
      summary: "<p>A high school chemistry teacher turned methamphetamine producer.</p>",
      genres: ["Drama", "Crime", "Thriller"],
      premiered: "2008-01-20",
      ended: "2013-09-29",
      status: "Ended",
      rating: {
        average: 9.5,
      },
      image: {
        medium: "https://example.com/breakingbad-medium.jpg",
        original: "https://example.com/breakingbad-original.jpg",
      },
      network: {
        name: "AMC",
      },
      schedule: {
        days: ["Sunday"],
        time: "21:00",
      },
      runtime: 47,
      language: "English",
      type: "Scripted",
      officialSite: "https://www.amc.com/shows/breaking-bad",
      webChannel: null,
    };

    renderWithProviders(<ShowCard show={mockShow} />);
    expect(screen.getByText(/Breaking Bad/i)).toBeInTheDocument();
    expect(screen.getByText(/A high school chemistry teacher turned methamphetamine producer./i)).toBeInTheDocument();
  });
});
