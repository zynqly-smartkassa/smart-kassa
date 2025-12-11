import axios, { AxiosError } from "axios";
import { AuthStorage } from "./secureStorage";
import type { AppDispatch } from "../../redux/store";
import { signInUser } from "../../redux/slices/userSlice";


export async function register(
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  password: string,
  fn: string,
  atu: string,
  dispatch: AppDispatch
) {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/register`,
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phoneNumber,
        password: password,
        fn: fn,
        atu: atu,
      },
      { withCredentials: true } // to set the refresh token in the Cookie
    );

    if (!data) {
      throw new Error("Response is Empty");
    }

    await AuthStorage.setTokens(data.accessToken);

    dispatch(
      signInUser({
        id: data.id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
      })
    );

    return await data;
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      if (error.response?.status === 500) {
        throw new Error("Internal Server Error");
      }
      if (error.response?.status === 409) {
        if (
          error.response?.data.error === "User with this email already exists"
        ) {
          throw new Error("Email already exists");
        }
        if (
          error.response?.data.error ===
          `Ein Account mit der FN '${fn}' existiert bereits.`
        ) {
          throw new Error("FN already exists");
        }
        if (
          error.response?.data.error ===
          `Ein Account mit der Telefonnumer '${phoneNumber}' existiert bereits.`
        ) {
          throw new Error("Phonenumber already exists");
        }
        if (
          error.response?.data.error ===
          `Ein Account mit der ATU-Nummer '${atu}' existiert bereits.`
        ) {
          throw new Error("ATU already exists");
        }
      }
      if (error.response?.status === 400) {
        throw new Error("Missing Fields");
      }
    } else {
      throw new Error("Internal Server Error");
    }
  }
}

interface LoginResponse {
  accessToken: string;
  user: {
    userId: number;
    name: string;
    email: string;
  };
}

export async function login(
  email: string,
  password: string,
  dispatch: AppDispatch
): Promise<LoginResponse> {
  if (!email || !password) {
    throw new Error("Missing Fields");
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/login`,
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    );
    const data = response.data;

    if (!data) {
      throw new Error("Response is empty");
    }

    const accessToken = await data.accessToken;
    await AuthStorage.setTokens(accessToken);

    const user = data.user;
    dispatch(
      signInUser({
        id: user.userId,
        firstName: user.name.split(" ")[0],
        lastName: user.name.split(" ")[1],
        email: user.email,
        phoneNumber: "phone number need implementation",
      })
    );
    return await data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401 || error.response?.status === 400) {
        throw new Error("Wrong Email or Password");
      } else if (error.response?.status === 500) {
        throw new Error("Internal Server Error");
      } else {
        throw new Error(`Login failed: ${error.message}`);
      }
    } else {
      throw new Error("Internal Server Error");
    }
  }
}
