import { Outlet } from "react-router-dom";
import "./index.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="flex-auto max-w-[56rem] w-[calc(100%-4rem)] self-center py-4">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}