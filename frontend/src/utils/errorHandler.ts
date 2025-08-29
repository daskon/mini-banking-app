import { message } from "antd";

export interface ApiError {
  status?: string;
  message?: string;
  details?: string[];
  [key: string]: any;
}

export class ErrorHandler {
    
  static handleApiError(error: any) {
    if (!error) return message.error("Unknown error");

    const data: ApiError = error.data || error;

    const details = data.details ? data.details.join(", ") : "";

    const msg = [data.message, details].filter(Boolean).join(" - ");
    message.error(msg || "Something went wrong");
  }
}