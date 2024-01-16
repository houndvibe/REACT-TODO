import ReactDOM from "react-dom/client";
import App from "./routes/App.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoIndexPage from "./components/TodoIndexPage.tsx";
import { loader as UserPageLoader, UserPage } from "./routes/UserPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <>ErrorPage</>,
    children: [
      {
        index: true,
        element: <TodoIndexPage />,
        errorElement: <>ErrorPage</>,
      },
      {
        path: "user/:userId",
        loader: UserPageLoader,
        element: <UserPage />,
        errorElement: <>ErrorPage</>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
