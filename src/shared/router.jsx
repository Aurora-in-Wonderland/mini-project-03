import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../App.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ResultPage from "../pages/ResultPage";
import RandomPage from "../pages/RandomPage";

const Router = () => {
    return (
        <BrowserRouter>
            <header>
                <Navbar />
            </header>
            <main>
                <Routes>
                    <Route
                        path="/login"
                        element={<LoginPage />}
                    ></Route>
                    <Route
                        path="/signup"
                        element={<SignupPage />}
                    ></Route>
                    <Route
                        path="/food/result"
                        element={<ResultPage />}
                    ></Route>
                    <Route
                        path="/random"
                        element={<RandomPage />}
                    ></Route>
                </Routes>
            </main>
            <footer>
                <Footer />
            </footer>
        </BrowserRouter>
    );
};

export default Router;
