import { App } from "@/pages/App";
import { Route, Routes } from "react-router-dom";

import { Cart } from "@/pages/Cart";
import { AppLayout } from "@/layout/AppLayout";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<App />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  );
};
