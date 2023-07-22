import { Outlet } from "react-router-dom";
import "./index.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const styles = {

}

export default function MainLayout() {
  return (
    <>
      <Header />
      <div className="flex-auto h-full">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}