import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "../component/BaseLayout";
import Home from "../pages/Home";
import Comperation from "../pages/Comperation"
import News from "../pages/News";
import NotFound from "../pages/ErorrPage";
import ResultCompare from "../pages/ResultCompare";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout/>,
    errorElement: <NotFound/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "compare",
        element: <Comperation />,
        children:[
          {
          path: ":country1/:country2",
          element: <ResultCompare />,
          },
        ]
      },
      {
        path: "article",
        element: <News />,
      },
    ],
  },
]);