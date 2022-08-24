import { render, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import HeaderComponent from "../../components/Header";

afterEach(cleanup);

it('should equal to "To Do Task"', () => {
  const { getByTestId } = render(<HeaderComponent title={'To Do Task'}/>);
  expect(getByTestId("title")).toHaveTextContent("To Do Task");
});