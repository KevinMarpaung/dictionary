import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Pencarian from "./Pages/Pencarian";
import Admin from "./Pages/Admin.jsx";
import About from "./Pages/About.jsx";

const router = createBrowserRouter([
  {
    path: "home",
    element: <Home></Home>,
  },
  {
    path: "pencarian",
    element: <Pencarian></Pencarian>,
  },
  {
    path: "admin",
    element: <Admin></Admin>,
  },
  {
    path: "about",
    element: <About></About>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
