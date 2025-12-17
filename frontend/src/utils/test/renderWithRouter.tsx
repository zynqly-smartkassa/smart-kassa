import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import StoreProvider from "../../../redux/StoreProvider"

interface RouteConfig {
  path: string;
  element: React.ReactElement;
}

export function renderWithRouter(
  _ui: React.ReactElement,
  initialEntries: string[] = ["/"],
  routes: RouteConfig[] = []
) {
  return render(
    <StoreProvider>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          {/* Alle Routen dynamisch hinzufügen */}
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </MemoryRouter>
    </StoreProvider>
  );
}



