import { Outlet } from "react-router-dom";
import "./index.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="flex-auto max-w-[56rem] w-full self-center py-4">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}