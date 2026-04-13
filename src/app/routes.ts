import { createBrowserRouter, redirect } from "react-router";
import { Page1Cover } from "./pages/Page1Cover";
import { Page2BridgeIdentity } from "./pages/Page2BridgeIdentity";
import { Page2MythBridge } from "./pages/Page2MythBridge";
import { Page2PoetryBridge } from "./pages/Page2PoetryBridge";
import { Page2StructureBridge } from "./pages/Page2StructureBridge";
import { Page3CulturalMeaning } from "./pages/Page3CulturalMeaning";
import { Page4StructureAndImagery } from "./pages/Page4StructureAndImagery";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Page1Cover,
  },
  {
    path: "/identity",
    Component: Page2BridgeIdentity,
  },
  {
    path: "/identity/myth",
    Component: Page2MythBridge,
  },
  {
    path: "/identity/poetry",
    Component: Page2PoetryBridge,
  },
  {
    path: "/identity/structure",
    Component: Page2StructureBridge,
  },
  {
    path: "/cultural-meaning",
    Component: Page3CulturalMeaning,
  },
  {
    path: "/structure",
    Component: Page4StructureAndImagery,
  },
  // Redirect old /emotion route to new /cultural-meaning route
  {
    path: "/emotion",
    loader: () => redirect("/cultural-meaning"),
  },
  // Catch all unknown routes and redirect to home
  {
    path: "*",
    loader: () => redirect("/"),
  },
]);