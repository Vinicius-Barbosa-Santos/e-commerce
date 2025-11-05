import { Header } from "@/components/header";
import { Outlet } from "react-router";

export const AppLayout = () => {
  return (
    <main className="min-h-dvh w-full bg-indigo-950 md:min-h-screen">
      <div className="container mx-auto px-3 py-7 sm:px-7">
        <Header />
        <Outlet />
      </div>
    </main>
  );
};
