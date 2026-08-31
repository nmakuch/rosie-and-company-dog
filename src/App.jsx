import { Route, Routes } from "react-router";

import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import ScrollToLocation from "./components/ScrollToLocation/ScrollToLocation";
import FaqPage from "./pages/FaqPage/FaqPage";
import HomePage from "./pages/HomePage/HomePage";
import BookingPage from "./pages/BookingPage/BookingPage";

import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.site}>
      <ScrollToLocation />
      <Navbar />

      <main id="top">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}