import ReactDOM from "react-dom/client";
import App from "./routes/App.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { fetchUsers } from "./redux/usersSlice.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <>ErrorPage</>,
    children: [
      {
        path: "users",
        element: <>users</>,
        errorElement: <>ErrorPage</>,
      },
      {
        path: "users/:userId",
        element: <>users/:userId</>,
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

store.dispatch(fetchUsers());
