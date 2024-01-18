import ReactDOM from "react-dom/client";
import App from "./routes/App.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoIndexPage from "./components/todos/TodoIndexPage.tsx";
import { loader as UserPageLoader, UserPage } from "./routes/UserPage.tsx";
import Modal from "react-modal";
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

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
