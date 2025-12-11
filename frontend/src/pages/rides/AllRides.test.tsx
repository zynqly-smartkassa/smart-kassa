import { screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { renderWithRouter } from "../../utils/test/renderWithRouter";
import AllRides from "./AllRides";
import * as ridesUtils from "../../utils/rides/all-rides";
import userEvent from "@testing-library/user-event";
import { getRidesToday, getRidesYesterday } from "../../utils/rides/getRides";
import { getDateFormat, getDateNow, getDateYesterday } from "../../utils/rides/getDate";
import { date, distance, duration, timeToSeconds } from "../../utils/rides/sort";
import type { AllRide } from "constants/AllRide";

const rides: AllRide[] = [

  {
    user_id: 6,
    ride_id: 4,
    vehicle_id: 7,
    start_address: "Hauptstraße 1",
    start_time: getDateYesterday(),
    end_address: "Bahnhof",
    end_time: getDateYesterday(),
    duration: "00:20:00",
    distance: 3200,
    ride_type: "Taxifahrt",
    whole_ride: [[50.55, 55], [50.55,  55]]
  },
  {
    user_id: 7,
    ride_id: 4,
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
    ride_id: 4,
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
    ride_id: 4,
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
    ride_id: 4,
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
    ride_id: 4,
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
]

// mock getAllRides method, so our own method will get called
vi.spyOn(ridesUtils, "getAllRides").mockResolvedValue({
  rides: rides
})

async function setup() {

  // tabs from the tabslist
  const today = await screen.findByTestId("today");
  const yesterday = await screen.findByTestId("yesterday");
  const every = await screen.findByTestId("every");

  // DESC and ASC

  const desc = await screen.findByTestId("desc");
  const asc = await screen.findByTestId("asc");

  // Filter Button
  const trigger = await screen.findByTestId("select-trigger");

  const useFilters = async () => {
    // Erst klicken (mit userEvent)
    await userEvent.click(trigger);

    // DANN warten, bis die Items da sind
    const dateItem = await screen.findByTestId("date");
    const distanceItem = await screen.findByTestId("distance");
    const durationItem = await screen.findByTestId("duration");

    return { dateItem, distanceItem, durationItem };
  };

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


  return {
    tabs: { today, yesterday, every },
    order: { desc, asc },
    filters: { trigger, useFilters },
    getRidesFromDom: getRidesFromDom
  }
}

describe("AllRides", () => {

  beforeEach(() => {
    vi.clearAllMocks();
    Element.prototype.hasPointerCapture = () => false;
    Element.prototype.scrollIntoView = vi.fn();
    renderWithRouter(<AllRides />, "/all-rides", 
      [{path: "/allrides/:id", element: <AllRides/>}]
    )
  })

  // -----------------------------
  // Test 1: Is the correct tab active?  
  // -----------------------------

  it("should be able to switch between each tab correctly", async () => {

    const { tabs } = await setup();
    const { today, yesterday, every } = tabs;

    // Today is the clicked one at the start!

    expect(today).toHaveAttribute("aria-selected", "true");
    expect(yesterday).toHaveAttribute("aria-selected", "false");
    expect(every).toHaveAttribute("aria-selected", "false");

    await userEvent.click(yesterday);

    expect(yesterday).toHaveAttribute("aria-selected", "true");
    expect(today).toHaveAttribute("aria-selected", "false");
    expect(every).toHaveAttribute("aria-selected", "false");

    await userEvent.click(every);

    expect(every).toHaveAttribute("aria-selected", "true");
    expect(today).toHaveAttribute("aria-selected", "false");
    expect(yesterday).toHaveAttribute("aria-selected", "false");
  });

  // -----------------------------
  // Test 2: Does it show only the rides for today when clicked on it?
  // -----------------------------

  it("should show only show rides of 'today' in the rides array", async () => {

    const { tabs } = await setup()
    const { today } = tabs;

    expect(today).toHaveAttribute("aria-selected", "true");

    const ridesToday = getRidesToday(rides);

    const now = new Date();

    const todayDate = getDateFormat(now);

    expect(ridesToday.every(ride => ride.start_time.split(" ")[0] === todayDate)).toBe(true);
  })

  // -----------------------------
  // Test 3: Does it show only the rides for yesterday when clicked on it? 
  // -----------------------------

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
  })

  // -----------------------------
  // Test 4: Does it show every ride for every when clicked on it? 
  // -----------------------------

  it("should show all the rides with out any sorted elements", async () => {

    const { tabs } = await setup()
    const { every } = tabs;

    await userEvent.click(every);
    expect(every).toHaveAttribute("aria-selected", "true");

    // Unsorted
    expect(rides).toHaveLength(rides.length);
  })

  // -----------------------------
  // Test 5: Are the DESC icon the sort method: 'date' active on freshly loaded all-rides? 
  // -----------------------------

  it("checks if sort method: 'date' (DESC) is selected on default", async () => {
    const { tabs, filters, order } = await setup()
    const { every } = tabs;
    const { useFilters } = filters;

    await userEvent.click(every);

    const { desc, asc } = order;

    // This means desc is active at beginning
    expect(desc).toHaveClass("text-violet-400");
    expect(asc).not.toHaveClass("text-violet-400")

    await userEvent.click(asc);

    expect(asc).toHaveClass("text-violet-400");
    expect(desc).not.toHaveClass("text-violet-400")

    const { dateItem } = await useFilters();

    // This means 'date" is active on default
    expect(dateItem).toHaveAttribute("aria-selected", "true");

    // The trigger is unavailable due to the functionality of <Select> in html
    // We are closing the context menu of Select with the ESC key.
    await userEvent.keyboard('{Escape}');

    expect(every).toBeInTheDocument();
  });

  // -----------------------------
  // Test 6: Does the sort method: 'date' work correctly with DESC and ASC?
  // -----------------------------

  it("sorts after 'date' (default) DESC as well as ASC correctly", async () => {
    const { tabs, filters, order, getRidesFromDom: ridesDom } = await setup()
    const { every } = tabs;
    const { useFilters } = filters;

    const { desc, asc } = order;

    // load all-rides
    await userEvent.click(every);

    // since 'date' is selected on default
    const { dateItem } = await useFilters();
    expect(dateItem).toHaveAttribute("aria-selected", "true");

    await userEvent.keyboard('{Escape}');

    // DESC
    await userEvent.click(desc);

    const descSorted: Date[] = []

    const currentRides = await ridesDom();

    currentRides.forEach((ride) => {
      // to bring it into format: yyyy-mm-ddThh:mm:ss
      const start = ride.start_time.replace(" ", "T");
      descSorted.push(new Date(start));
    })

    console.log("BEFORE:", currentRides)

    //sort our array DESC
    date(currentRides, true)

    console.log("AFTER:", currentRides)

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
  // Test 7: Does the sort method: 'distance' work correctly with DESC and ASC?
  // -----------------------------

  it("sorts after 'distance' DESC as well as ASC correctly", async () => {
    const { tabs, filters, order, getRidesFromDom: ridesDom } = await setup()
    const { every } = tabs;
    const { useFilters } = filters;

    const { desc, asc } = order;

    // load all-rides
    await userEvent.click(every);

    const { distanceItem } = await useFilters();
    await userEvent.click(distanceItem);

    await useFilters();

    const selected = await screen.findByTestId("distance");

    // Again search is needed, because the click results in closing the menu, and distance is then undefined
    await waitFor(async () => {
      expect(selected).toHaveAttribute("aria-selected", "true");
    });

    await userEvent.keyboard('{Escape}');

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
  // Test 8: Does the sort method: 'duration' work correctly with DESC and ASC?
  // -----------------------------

  it("sorts after 'duration' DESC as well as ASC correctly", async () => {
    const { tabs, filters, order, getRidesFromDom: ridesDom } = await setup()
    const { every } = tabs;
    const { useFilters } = filters;

    const { desc, asc } = order;

    // load all-rides
    await userEvent.click(every);

    const { durationItem } = await useFilters();
    await userEvent.click(durationItem);

    await useFilters();

    const selected = await screen.findByTestId("duration");

    // Again search is needed, because the click results in closing the menu, and distance is then undefined
    await waitFor(async () => {
      expect(selected).toHaveAttribute("aria-selected", "true");
    });

    await userEvent.keyboard('{Escape}');

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
});
