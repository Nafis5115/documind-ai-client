import DocumentsPage from "../pages/DocumentsPage";
import AppLayout from "../layouts/AppLayout";
import DashboardPage from "../pages/DashboardPage";
import { createBrowserRouter } from "react-router-dom";
import ChatInterface from "../components/ChatInterface";
import SettingsPage from "../pages/SettingsPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        path: "",
        Component: DashboardPage,
      },
      {
        path: "documents",
        Component: DocumentsPage,
      },
      {
        path: "chat",
        Component: ChatInterface,
      },
      {
        path: "chat/:id",
        Component: ChatInterface,
      },
      {
        path: "settings",
        Component: SettingsPage,
      },

      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
  {
    path: "login",
    Component: LoginPage,
  },
  {
    path: "register",
    Component: RegisterPage,
  },
]);

export default router;
