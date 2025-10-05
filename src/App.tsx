import { BrowserRouter, Route, Routes } from "react-router";

import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Vendor from "./pages/Vendor";
import Notfound from "./pages/Notfound";
import AppLayout from "./components/layout/AppLayout";
import LoginAndSignup from "./pages/LoginAndSignup";

export default function App() {
  const queryclient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryclient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<Vendor />}></Route>
          </Route>
          <Route path="/login" element={<LoginAndSignup />}></Route>

          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>

      {/* toaster (model) */}
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          // استایل عمومی (پایه) برای همه toast ها
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "15px 24px",
            color: "var(--color-dark--0)",
          },

          // استایل مخصوص موفقیت
          success: {
            duration: 3000,
            style: {
              background: "var(--color-brand--2)",
              color: "#fff",
            },
          },

          // استایل مخصوص خطا
          error: {
            duration: 4500,
            style: {
              background: "var(--color-error)",
              color: "#fff",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}
