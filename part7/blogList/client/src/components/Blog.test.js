import React from "react";
import "@testing-library/jest-dom";
import { getByTestId, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import Togglable from "./Togglable";

test("renders content", () => {
  const blog = {
    id: 1,
    title: "Test Blog",
    author: "Test Author",
    url: "http://testurl.com",
    likes: 5,
    user: {
      name: "Test User",
    },
  };

  // const { container } = render(<Blog blogs={blog}/>)
  render(<Blog blogs={blog} />);

  // const div = container.querySelector('.blog')
  waitFor(() => {
    const element = screen.getByText("Test Blog");
    expect(element).toBeDefined();
  });
});

describe("<Togglable />", () => {
  let container;

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="Show">
        <div className="testDiv">togglable content</div>
      </Togglable>,
    ).container;
  });

  test("renders its children", async () => {
    await screen.findAllByText("togglable content");
  });

  test("at start the children are not displayed", () => {
    const div = container.querySelector(".togglable");
    expect(div).toHaveStyle("display: none");
  });

  test("after clicking the button, children are displayed", () => {
    const user = userEvent.setup();

    waitFor(() => {
      const button = screen.getByText("Show");
      user.click(button);

      const div = container.querySelector(".togglable");
      expect(div).not.toHaveStyle("display: none");
    });
  });
});
