import { Controller } from "../types/Controllers.types";

export const GlobalErrorHandler = (controller: Controller) => {
  try {
    return controller.handler;
  } catch (err) {
    console.log("An error has occured in line 8 of /src/utils/ErrorHandler");
  }
};
