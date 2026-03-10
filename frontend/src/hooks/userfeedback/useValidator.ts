export const useInvalidUsername = (username: string) => {
  const usernameIsInvalid = username.trim() === "";
  return usernameIsInvalid;
};

export const useInvalidEmail = (email: string) => {
  const emailIsInvalid =
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  return emailIsInvalid;
};

export interface PASSWORD_VALIDATOR {
  passwordIsInvalid: boolean;
  passwordhasSpecialChar: boolean;
  passwordhasNumber: boolean;
  passwordminimum6Chars: boolean;
}

export const useInvalidPassword = (password: string) => {
  const passwordhasSpecialChar = /[!@#$%^&*()§_+=[\]{};':"\\|,.<>/?-]/.test(
    password
  );
  const passwordhasNumber = /[0-9]/.test(password);
  const passwordminimum6Chars = password.length >= 8;
  const passwordIsInvalid =
    !passwordminimum6Chars || !passwordhasNumber || !passwordhasSpecialChar;
  const passwordInvalidData: PASSWORD_VALIDATOR = {
    passwordIsInvalid: passwordIsInvalid,
    passwordhasSpecialChar: passwordhasSpecialChar,
    passwordhasNumber: passwordhasNumber,
    passwordminimum6Chars: passwordminimum6Chars,
  };

  return passwordInvalidData;
};

export const useInvalidConfirmPassword = (password: string, confirmPassword: string) => {

  const missing = confirmPassword === "";
  const matching = confirmPassword === password ? true : false;

  const invalid = missing || !matching;

  const isInvalid = {
    invalid: invalid,
    missing:  missing,
    matching: matching
  } 
  
  return isInvalid;
  
};

export const useInvalidATU = (atu: string) => {
  const cleaned = atu.trim().replace(/[\s/]/g, "");

  const atuIsInvalid = atu === "" || !/^ATU\d{9}$/.test(cleaned);
  return atuIsInvalid;
};

export const useInvalidFirmenbuchnummer = (fn: string) => {
  const fnIsInvalid = fn === "" || !/^FN\d{6}[a-z]$/.test(fn);
  return fnIsInvalid;
};

export const useInvalidTelefonnummer = (telefon: string) => {
  const telefonIsInvalid =
    telefon === "" || !/^[\d\s+()-]{7,20}$/.test(telefon) || telefon.length < 7;
  return telefonIsInvalid;
};

// Adress-Validation
export const isValidAddressInput = (input: string) => {
  // Erlaubte Zeichen: Buchstaben, Zahlen, Leerzeichen, Kommas, Punkte, Bindestriche
  const regex = /^[a-zA-Z0-9\s.,-]*$/;
  return regex.test(input);
};
