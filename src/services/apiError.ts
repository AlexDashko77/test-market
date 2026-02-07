import axios from "axios";

export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 400:
          return "Bad request. Please check your input.";
        case 401:
          return "Invalid username or password.";
        case 403:
          return "You are not authorized.";
        case 404:
          return "Resource not found.";
        case 500:
          return "Server error. Please try again later.";
        default:
          return "Unexpected server error.";
      }
    }

    if (error.request) {
      return "Server is not responding. Check your internet connection.";
    }

    return "Request error. Please try again.";
  }

  return "Unknown error occurred.";
};
