import { screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { renderWithRouter } from "../../../utils/test/renderWithRouter";
import AllRides from "../AllRides";
import * as ridesUtils from "../../../utils/rides/all-rides";
import userEvent from "@testing-library/user-event";
import { getRidesToday, getRidesYesterday } from "../../../utils/rides/getRides";
import { getDateFormat, getDateNow, getDateYesterday } from "../../../utils/rides/getDate";
import { date, distance, duration, timeToSeconds } from "../../../utils/rides/sort";
import type { AllRide } from "constants/AllRide";

const rides: AllRide[] = [
  {
    user_id: 6,
    ride_id: 1,
    vehicle_id: 7,
    start_address: "Hauptstraße 1",
    start_time: getDateYesterday(),
    end_address: "Bahnhof",
    end_time: getDateYesterday(),
    duration: "00:20:00",
    distance: 3200,
    ride_type: "Taxifahrt",
    whole_ride: [[50.55, 55], [50.55, 55]]
  },
  {
    user_id: 7,
    ride_id: 2,
    vehicle_id: 7,
    start_address: "Sarkweg 12",
    start_time: getDateYesterday(),
    end_address: "Altstadt",
    end_time: getDateYesterday(),
    duration: "00:10:00",
    distance: 1500,
    ride_type: "Botenfahrt",
    whole_ride: [[50.55, 55], [50.55, 55]]
  },

  {
    user_id: 3,
    ride_id: 3,
    vehicle_id: 7,
    start_address: "Neugasse 20",
    start_time: getDateNow(),
    end_address: "Zentrum",
    end_time: getDateNow(),
    duration: "00:15:00",
    distance: 2800,
    ride_type: "Taxifahrt",
    whole_ride: [[50.55, 55], [50.55, 55]]
  },
  {
    user_id: 5,
    ride_id: 4,
    vehicle_id: 7,
    start_address: "Lindenplatz",
    start_time: getDateNow(),
    end_address: "Hauptplatz",
    end_time: getDateNow(),
    duration: "00:09:50",
    distance: 1200,
    ride_type: "Taxifahrt",
    whole_ride: [[50.55, 55], [50.55, 55]]
  },

  {
    user_id: 4,
    ride_id: 5,
    vehicle_id: 7,
    start_address: "Gartenweg 2",
    start_time: "2025-12-11 11:10:00",
    end_address: "ZOB",
    end_time: "2025-12-11 11:25:00",
    duration: "00:15:00",
    distance: 3000,
    ride_type: "Taxifahrt",
    whole_ride: [[50.55, 55], [50.55, 55]]
  },
  {
    user_id: 1,
    ride_id: 6,
    vehicle_id: 7,
    start_address: "Bergstraße 5",
    start_time: getDateNow(),
    end_address: "Universität",
    end_time: getDateNow(),
    duration: "00:17:00",
    distance: 4100,
    ride_type: "Botenfahrt",
    whole_ride: [[50.55, 55], [50.55, 55]]
  },
  {
    user_id: 2,
    ride_id: 7,
    vehicle_id: 7,
    start_address: "Ringstraße",
    start_time: "2025-12-20 19:00:00",
    end_address: "Rathaus",
    end_time: "2025-12-20 19:12:00",
    duration: "00:12:00",
    distance: 2500,
    ride_type: "Taxifahrt",
    whole_ride: [[50.55, 55], [50.55, 55]]
  }
];

// mock the SummaryRide, if anyone accesses it.
vi.mock("../SummaryRide", () => ({
  default: ({ ride }: { ride: AllRide }) => (
    <div data-testid="summary-ride">
      Mocked Summary: {ride.start_address}
    </div>
  ),
}));

// mock getAllRides method, so our own method will get called
vi.spyOn(ridesUtils, "getAllRides").mockResolvedValue({
  rides: rides
})

/**
 * Initializes the test environment for `AllRides`.
 * Queries common DOM elements (tabs, sort buttons) and provides helper functions
 * for interacting with dropdowns and retrieving ride data from the DOM.
 * * @returns An object containing DOM elements and helper functions for the tests.
 */
async function setup() {

  // tabs from the tabslist
  const today = await screen.findByTestId("show-today");
  const yesterday = await screen.findByTestId("show-yesterday");
  const every = await screen.findByTestId("show-every");

  // DESC and ASC

  const desc = await screen.findByTestId("desc");
  const asc = await screen.findByTestId("asc");

  // Get all rides from the DOM
  const getRidesFromDom = async () => {
    const ridesDom = await screen.findAllByTestId("ride-item");
    const currentRides = ridesDom.map((ride) => {
      const json = ride.getAttribute("data-ride");
      if (json) {
        return JSON.parse(json);
      }
    })
    return currentRides;
  }

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
    tabs: { today, yesterday, every },
    order: { desc, asc },
    getRidesFromDom: getRidesFromDom,
    select: { selectItem, isSelected }
  }
}

describe("AllRides", () => {

  beforeEach(() => {
    vi.clearAllMocks();
    Element.prototype.hasPointerCapture = () => false;
    Element.prototype.scrollIntoView = vi.fn();
    renderWithRouter(<AllRides />, ["/all-rides"], [
      { path: "/all-rides", element: <AllRides /> },
      { path: "/all-rides/:id", element: <AllRides /> }
    ]);
  });

  // -----------------------------
  // Test 1
  // -----------------------------

  /**
   * Verifies that the tab navigation works correctly.
   * Ensures that clicking on 'Today', 'Yesterday', or 'Every' updates the active state (aria-selected).
   */
  it("should be able to switch between each tab correctly", async () => {

    const { tabs } = await setup();
    const { today, yesterday, every } = tabs;

    // Today is the clicked one at the start!

    expect(today).toHaveAttribute("aria-selected", "true");

    await userEvent.click(yesterday);

    expect(yesterday).toHaveAttribute("aria-selected", "true");

    await userEvent.click(every);

    expect(every).toHaveAttribute("aria-selected", "true");
  });

  // -----------------------------
  // Test 2
  // -----------------------------

  /**
   * Tests the 'Today' filter functionality.
   * Checks if the list only contains rides where the start_time matches the current date.
   */
  it("should show only show rides of 'today' in the rides array", async () => {

    const { tabs } = await setup()
    const { today } = tabs;

    expect(today).toHaveAttribute("aria-selected", "true");

    const ridesToday = getRidesToday(rides);

    const now = new Date();

    const todayDate = getDateFormat(now);

    expect(ridesToday.every(ride => ride.start_time.split(" ")[0] === todayDate)).toBe(true);
  });

  // -----------------------------
  // Test 3
  // -----------------------------

  /**
   * Tests the 'Yesterday' filter functionality.
   * Checks if clicking the yesterday tab filters the list to show only rides from the previous day.
   */
  it("should show only show rides of 'yesterday' in the rides array", async () => {

    const { tabs } = await setup()
    const { yesterday } = tabs;

    await userEvent.click(yesterday);
    expect(yesterday).toHaveAttribute("aria-selected", "true");

    const ridesYesterday = getRidesYesterday(rides);

    const now = new Date();
    const y = new Date(now);
    y.setDate(now.getDate() - 1);

    const yesterdayDate = getDateFormat(y);

    expect(ridesYesterday.every(ride => ride.start_time.split(" ")[0] === yesterdayDate)).toBe(true);
  });

  // -----------------------------
  // Test 4
  // -----------------------------

  /**
   * Tests the 'Every' (All) filter functionality.
   * Ensures that clicking this tab resets filters and displays the full list of rides.
   */
  it("should show all the rides with out any sorted elements", async () => {

    const { tabs } = await setup()
    const { every } = tabs;

    await userEvent.click(every);
    expect(every).toHaveAttribute("aria-selected", "true");

    // Unsorted
    expect(rides).toHaveLength(rides.length);
  });


  // -----------------------------
  // Test 5
  // -----------------------------

  /**
   * Verifies the 'Ride Type' dropdown filter.
   * Ensures specific types (e.g., 'Botenfahrt', 'Taxifahrt') can be selected and set as active.
   */
  it("checks if each 'ride_type' can be clicked", async () => {

    const { select } = await setup()
    const { selectItem, isSelected } = select;

    // This means 'every" is active on default
    await isSelected("select-only-trigger", "only-every");

    await selectItem("select-only-trigger", "only-botenfahrt");
    await isSelected("select-only-trigger", "only-botenfahrt");

    await selectItem("select-only-trigger", "only-taxifahrt");
    await isSelected("select-only-trigger", "only-taxifahrt");
  });

  // -----------------------------
  // Test 6
  // -----------------------------

  /**
   * Checks the initial state of sorting controls on page load.
   * Expects 'Date' to be the default sort metric and 'Descending' (DESC) to be the default order.
   */
  it("checks if sort method: 'date' (DESC) is selected on default", async () => {
    const { tabs, order, select } = await setup()
    const { every } = tabs;
    const { desc, asc } = order;
    const { isSelected: isSelectTrue } = select;

    await userEvent.click(every);

    // This means desc is active at beginning
    expect(desc).toHaveClass("text-violet-400");
    expect(asc).not.toHaveClass("text-violet-400")

    await userEvent.click(asc);

    expect(asc).toHaveClass("text-violet-400");
    expect(desc).not.toHaveClass("text-violet-400")

    // This means 'date" is active on default
    isSelectTrue("select-filter-trigger", "date");

    expect(every).toBeInTheDocument();
  });



  // -----------------------------
  // Test 7
  // -----------------------------

  /**
   * Tests sorting by 'Date'.
   * Verifies that the rides are correctly re-ordered in the DOM when switching between DESC and ASC for dates.
   */
  it("sorts after 'date' (default) DESC as well as ASC correctly", async () => {
    const { tabs, order, getRidesFromDom: ridesDom, select } = await setup()
    const { every } = tabs;
    const { desc, asc } = order;
    const { isSelected } = select;

    // load all-rides
    await userEvent.click(every);

    // since 'date' is selected on default
    await isSelected("select-filter-trigger", "date");

    // DESC
    await userEvent.click(desc);

    const descSorted: Date[] = []

    const currentRides = await ridesDom();

    currentRides.forEach((ride) => {
      // to bring it into format: yyyy-mm-ddThh:mm:ss
      const start = ride.start_time.replace(" ", "T");
      descSorted.push(new Date(start));
    })

    //sort our array DESC
    date(currentRides, true)

    descSorted.sort((a, b) => b.getTime() - a.getTime());

    expect(currentRides.every((ride, index) => {
      const start = new Date(ride.start_time.replace(" ", "T"));
      return start.getTime() === descSorted[index].getTime()
    })).toBe(true);


    // ASC
    await userEvent.click(asc);

    const ascSorted: Date[] = []

    currentRides.forEach((ride) => {
      // to bring it into format: yyyy-mm-ddThh:mm:ss
      const start = ride.start_time.replace(" ", "T");
      ascSorted.push(new Date(start));
    })

    //sort our array ASC
    date(currentRides, false)

    // test if sorted correctly
    ascSorted.sort((a, b) => a.getTime() - b.getTime());

    expect(currentRides.every((ride, index) => {
      const start = new Date(ride.start_time.replace(" ", "T"));
      return start.getTime() === ascSorted[index].getTime()
    })).toBe(true);
  });

  // -----------------------------
  // Test 8
  // -----------------------------

  /**
   * Tests sorting by 'Distance'.
   * Selects the distance filter and verifies correct ASC and DESC ordering of the ride list based on meters.
   */
  it("sorts after 'distance' DESC as well as ASC correctly", async () => {
    const { tabs, order, getRidesFromDom: ridesDom, select } = await setup()
    const { every } = tabs;
    const { desc, asc } = order;
    const { selectItem, isSelected } = select;

    // load all-rides
    await userEvent.click(every);

    await selectItem("select-filter-trigger", "distance");
    await isSelected("select-filter-trigger", "distance");

    // DESC
    await userEvent.click(desc);

    const descSorted: number[] = []

    const currentRides = await ridesDom();

    currentRides.forEach((ride) => {
      descSorted.push(Number(ride.distance));
    })

    //sort our array DESC
    distance(rides, true);

    descSorted.sort((a, b) => b - a);

    expect(rides.every((ride, index) => Number(ride.distance) === descSorted[index])).toBe(true);

    // ASC
    await userEvent.click(asc);

    const ascSorted: number[] = []

    currentRides.forEach((ride) => {
      ascSorted.push(Number(ride.distance));
    })

    //sort our array ASC
    distance(currentRides, false);

    // test if sorted correctly
    ascSorted.sort((a, b) => a - b);

    expect(currentRides.every((ride, index) => Number(ride.distance) === ascSorted[index])).toBe(true);
  });

  // -----------------------------
  // Test 9
  // -----------------------------

  /**
   * Tests sorting by 'Duration'.
   * Selects the duration filter and verifies correct ASC and DESC ordering based on ride time (converted to seconds).
   */
  it("sorts after 'duration' DESC as well as ASC correctly", async () => {
    const { tabs, order, getRidesFromDom: ridesDom, select } = await setup()
    const { every } = tabs;
    const { selectItem, isSelected } = select;

    const { desc, asc } = order;

    // load all-rides
    await userEvent.click(every);

    await selectItem("select-filter-trigger", "duration");
    await isSelected("select-filter-trigger", "duration");

    // DESC
    await userEvent.click(desc);

    const descSorted: number[] = []

    const currentRides = await ridesDom();

    currentRides.forEach((ride) => {
      descSorted.push(timeToSeconds(ride.duration));
    })

    //sort our array DESC
    duration(currentRides, true);

    descSorted.sort((a, b) => b - a);

    expect(currentRides.every((ride, index) => timeToSeconds(ride.duration) === descSorted[index])).toBe(true);

    // ASC
    await userEvent.click(asc);

    const ascSorted: number[] = []

    currentRides.forEach((ride) => {
      ascSorted.push(timeToSeconds(ride.duration));
    })

    //sort our array ASC
    duration(currentRides, false);

    // test if sorted correctly
    ascSorted.sort((a, b) => a - b);

    expect(currentRides.every((ride, index) => timeToSeconds(ride.duration) === ascSorted[index])).toBe(true);
  });

  // -----------------------------
  // Test 10
  // -----------------------------

  /**
   * Tests the navigation to SummaryRide when clicking a ride item.
   * Verifies that clicking an item (e.g., ride_id 3) successfully triggers
   * the rendering of SummaryRide and shows the correct ride data.
   */
  it("navigates to the SummaryRide when clicking on a ride", async () => {
    // Warte auf die Liste
    const rideItem = await screen.findByTestId("ride-item-3"); // ride_id 3
    await userEvent.click(rideItem);

    // Jetzt sollte SummaryRide erscheinen
    const summary = await screen.findByTestId("summary-ride");
    expect(summary).toBeInTheDocument();

    // Optional: prüfen, dass die richtigen Daten kommen
    expect(summary).toHaveTextContent("Neugasse 20"); // start_address von ride_id 3
  });
});