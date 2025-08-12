import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// Query client kurulum
const queryClient = new QueryClient();

// Query client sağlayıcısı ile uygulamayı sarmalıyoruz
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ToastContainer />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
