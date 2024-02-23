import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ErrorPage from "./ErrorPage";
import Contact from "./ContactPage";
import { getContactLoader, getContactsLoader } from "./loaders/contactsLoader";
import {
  createContactsActions,
  deleteContactAction,
  editContactAction,
  updateContactFavourite,
} from "./actions/contactsActions";
import EditContact from "./EditContact";
import Index from "./Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: getContactsLoader,
    action: createContactsActions,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: getContactLoader,
            action: updateContactFavourite,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: getContactLoader,
            action: editContactAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: deleteContactAction,
            errorElement: <div>ops there is an error.</div>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
