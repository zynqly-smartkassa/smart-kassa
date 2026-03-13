/**
 * `data-testid` selectors for the ride, payment, and invoice UI elements.
 *
 * @property ride    - Map controls and buttons on the ride page (mobile-only view).
 * @property payment - Payment method buttons and inputs on the payment form.
 * @property invoice - Tab toggles and QR code container on the invoice detail page.
 */
export const rideTestIds = {
  ride: {
    timer: "timer",
    selectTrigger: "select-trigger",
    botenfahrt: "botenfahrt",
    taxifahrt: "taxifahrt",
    address: "address",
    calculateRoute: "calculate-route",
    startRide: "start-ride",
    endRide: "end-ride",
  },
  payment: {
    cardButton: "payment-card",
    cashButton: "payment-cash",
    ridePrice: "ride-price",
    tip: "payment-tip",
    submitButton: "create-invoice",
  },
  invoice: {
    pdfTab: "pdf-tab",
    qrcodeTab: "qrcode-tab",
    qrcodeContainer: "qrcode-container",
  },
} as const;
