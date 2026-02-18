import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import StoreProvider from "../../../redux/StoreProvider"

interface RouteConfig {
  path: string;
  element: React.ReactElement;
}

export function renderWithRouter(
  ui: React.ReactElement,
  initialPath = "/",
  extraRoutes: RouteConfig[] = []
) {
  return render(
    <StoreProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          {/* Main element: f.e: First element will be Register */}
          <Route path={initialPath} element={ui} />
          {/* additional Routes: f.e switch to login  */}
          {extraRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </MemoryRouter>
    </StoreProvider>
  );
}



