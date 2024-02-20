import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import ThemeProvider from "./components/front/theme-provider.tsx";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <HashRouter>
    <ThemeProvider defualtTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" />
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </HashRouter>
  // </React.StrictMode>
);
