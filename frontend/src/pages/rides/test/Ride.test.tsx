/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { renderWithRouter } from "../../../utils/test/renderWithRouter";
//import * as rideUtils from "../../../utils/rides/ride";
import userEvent from "@testing-library/user-event";
import Ride from "../Ride";

// --- MOCKS ---

vi.mock("../../hooks/rides/useDriverLocation", () => ({
  useDriverLocation: () => [48.210033, 16.363449]
}));

vi.mock("../../hooks/rides/useRideStates", () => ({
  useRideStates: () => ({
    destination: "",
    setDestination: vi.fn(),
    showDestinationHint: false,
    setShowDestinationHint: vi.fn(),
    isDestinationInvalid: false,
    isRoutCalculated: true,
    setIsRouteCalculated: vi.fn(),
    destinationCoords: [48.211, 16.364],
    setDestinationCoords: vi.fn(),
    routingStartCoords: [48.210, 16.363],
    timer: 1234,
    setTimer: vi.fn(),
    showNewRoute: vi.fn(),
    checkRide: vi.fn(() => true),
  }),
}));

vi.mock("../../utils/rides/geoAdress.ts", () => ({
  geocodeAddress: vi.fn()
}))

vi.mock('@capacitor/geolocation', () => ({
  Geolocation: {
    getCurrentPosition: vi.fn().mockResolvedValue({
      coords: { latitude: 48.210033, longitude: 16.363449 }
    }),
    watchPosition: vi.fn().mockResolvedValue('watch-id'),
    clearWatch: vi.fn(),
    checkPermissions: vi.fn().mockResolvedValue({ location: 'granted' }),
    requestPermissions: vi.fn().mockResolvedValue({ location: 'granted' }),
  }
}));


// --- SETUP HELPER ---

/**
 * Initializes the test environment for `AllRides`.
 * Queries common DOM elements (tabs, sort buttons) and provides helper functions
 * for interacting with dropdowns and retrieving ride data from the DOM.
 * * @returns An object containing DOM elements and helper functions for the tests.
 */
async function setup() {

  const timer = await screen.findByTestId("timer");
  const address = await screen.findByTestId("address");

  //Buttons
  const calculate = await screen.findByTestId("calculate-route");
  const start = await screen.findByTestId("start-ride");
  const end = await screen.findByTestId("end-ride");

  // Will trigger the menu and select the item
  const selectItem = async (triggerTestID: string, selectTestID: string) => {
    const trigger = await screen.findByTestId(triggerTestID);
    await userEvent.click(trigger);

    const onlyElement = await screen.findByTestId(selectTestID);
    await userEvent.click(onlyElement);
  }

  // Will trigger the menu and check if the given testID is selected
  const isSelected = async (triggerTestID: string, selectTestID: string) => {
    const trigger = await screen.findByTestId(triggerTestID);
    await userEvent.click(trigger);

    const onlyElement = await screen.findByTestId(selectTestID);

    await waitFor(() => {
      expect(onlyElement).toHaveAttribute("aria-selected", "true");
    })

    // Close the select menu manually with the keyboard
    await userEvent.keyboard('{Escape}');
  }

  return {
    timer: timer,
    address: address,
    buttons: {calculate, start, end},
    select: { selectItem, isSelected }
  }
}

// --- TESTS ---
 
describe("Ride", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    Element.prototype.hasPointerCapture = () => false;
    Element.prototype.scrollIntoView = vi.fn();

    renderWithRouter(<Ride />, ["/ride"], [
      { path: "/ride", element: <Ride /> },
    ]);
  })

  // -----------------------------
  // Test 1
  // -----------------------------

  /**
   * Verifies the 'Ride Type' menu filter.
   * Ensures specific types (e.g., 'Botenfahrt', 'Taxifahrt') can be selected and set as active.
   */

  it("checks if each 'ride_type' can be clicked", async () => {
    const { select } = await setup();
    const { selectItem, isSelected } = select;

    await selectItem("select-trigger", "botenfahrt");
    await isSelected("select-trigger", "botenfahrt");

    await selectItem("select-trigger", "taxifahrt");
    await isSelected("select-trigger", "taxifahrt");
  });

  // -----------------------------
  // Test 2
  // -----------------------------

  /**
   * Verifies the 'Ride Type' menu filter.
   * Ensures specific types (e.g., 'Botenfahrt', 'Taxifahrt') can be selected and set as active.
   */

  it("checks if some ui elements are disabled at fresh load", async () => {
    const { timer, buttons } = await setup();
    const {calculate, start, end} = buttons;

    expect(timer).toHaveTextContent("00:00:00");

    expect(calculate).toBeEnabled();
    expect(start).toBeDisabled();
    expect(end).toBeDisabled();
  });
})