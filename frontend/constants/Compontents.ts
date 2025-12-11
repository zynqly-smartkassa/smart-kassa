import type {
  SetStateAction,
  FocusEventHandler,
  HTMLInputTypeAttribute,
  Dispatch,
  HTMLInputAutoCompleteAttribute,
} from "react";

/**
 * To handle if user clicked in input field and focuses it
 * @used In Input Fields to show Validation Messages
 */
export interface showError {
  Firstnamefocused: boolean;
  LastnameFocused: boolean;
  EmailFocused: boolean;
  PasswordFocused: boolean;
  ConfirmPasswordFocused: boolean;
  ATUFocused: boolean;
  FNFocused: boolean;
  TelefonnummerFocused: boolean;
}

/**
 * To handle if user clicked in input field and focuses it
 */
export interface LoginShowError {
  EmailFocused: boolean;
  PasswordFocused: boolean;
}

/**
 * Used to Map through Values to Create User Input Fields, Labels and Validation Messages etc.
 * @example const nameContainer: Container =
    {
      className: Classname of Container,
      id: Id of Container,
      label: Label of Container,
      onBlurListener: () =>
        setShowHint((prev) => ({
          ...prev,
          Firstnamefocused: true,
        })) //Listener that fires when Element is blured,
      onChangeListener: change listener for input field,
      onFocusListener: () =>
        setShowHint((prev) => ({
          ...prev,
          Firstnamefocused: false,
        })) //Listener that fires when Element is focused,
      placeholder: placeholder for input field,
      validation: to validate user input,
      value: value for input,
    };
 * @author Casper Zielinski
 */
export interface Container {
  label: string;
  id: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  value: string;
  className: string;
  onChangeListener: (value: SetStateAction<string>) => void;
  onBlurListener: FocusEventHandler<HTMLInputElement>;
  onFocusListener: FocusEventHandler<HTMLInputElement>;
  validation: boolean;
  validationMessage: string;
  autocomplete?: HTMLInputAutoCompleteAttribute | undefined;
}

export interface PasswordContainer {
  label: string;
  id: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  title: string;
  value: string;
  className: string;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  onChangeListener: (value: SetStateAction<string>) => void;
  onBlurListener: FocusEventHandler<HTMLInputElement>;
  validation: boolean[];
  validationMessage: string[];
  autocomplete?: HTMLInputAutoCompleteAttribute | undefined;
}

/**
 * a type to globaly set/read the footerlinks, the first footerlink (left) is 0, the in the middle is 1, and the last (right) is 2
 * @used in the redux state footerLinksSlice.ts
 * @author Casper Zielinski
 */
export type footerLinks = 0 | 1 | 2;
