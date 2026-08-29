import type { StoredWebinarPayment } from "../webinarPaymentStorage";
import type { StoredWebinarRegistration } from "../webinarRegistrationStorage";
import { runWithDataSource } from "../serviceMode";

export const webinarPaymentService = {
  confirm(
    payment: StoredWebinarPayment,
    registration: StoredWebinarRegistration,
  ) {
    // Payment confirmation is now handled directly by saveWebinarPayment
    // which posts to the backend API. No separate confirmation needed.
    return runWithDataSource(
      () => Promise.resolve(payment),
    );
  },
};
