
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";
import { screen } from "@testing-library/react";

export interface InfoField {
  field: HTMLElement;
  value: string;
  wrongValue: string;
  validationMessage?: string
}

export const fillField = async (field: HTMLElement, value: string) => {

  // Clear and write value
  await userEvent.clear(field);
  if (value) await userEvent.type(field, value);
};

export const expectValidationMessage = async (msg: string) => {
    expect(
      await screen.findByText((content) => content.includes(msg))
    ).toBeInTheDocument();
  };