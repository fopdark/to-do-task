import { render, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import DialogComponent from "../../components/Dialog";

afterEach(cleanup);

it('should equal to "Form"', () => {
  const { getByTestId } = render(<DialogComponent title={'Form'} open={true}/>);
  expect(getByTestId("dialog-title")).toHaveTextContent("Form");
});