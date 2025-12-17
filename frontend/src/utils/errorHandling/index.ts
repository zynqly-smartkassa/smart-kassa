/**
 * Error handling utilities
 * Centralized error handling functions for displaying user-friendly error messages
 * @author Casper Zielinski
 */

export { handleTokenError } from "./tokenErrorHandler";
export {
  handleRegisterError,
  handleLoginError,
  handleLogoutError,
  handleDeleteAccountError,
} from "./authErrorHandler";
