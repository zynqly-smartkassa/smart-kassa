// User table in Database

/**
 * Full User Data (like the Table)
 */
export interface USER {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

// The Data we are going to send
/**
 * User Data that we will put in redux State
 */
export interface USER_DTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
