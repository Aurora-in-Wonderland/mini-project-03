import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Question from "./pages/Question";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ResultPage from "./pages/ResultPage";
import RandomPage from "./pages/RandomPage";
import FinalResultPage from "./pages/FinalResultPage";

function App() {
    return (
        <BrowserRouter>
            <header>
                <Navbar />
            </header>
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/question"
                        element={<Question />}
                    />
                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />
                    <Route
                        path="/signup"
                        element={<SignupPage />}
                    />
                    <Route
                        path="/food/result"
                        element={<ResultPage />}
                    />
                    <Route
                        path="/random"
                        element={<RandomPage />}
                    />
                    <Route
                        path="/food/:foodId/comment"
                        element={<FinalResultPage />}
                    />
                </Routes>
            </main>
            <footer>
                <Footer />
            </footer>
        </BrowserRouter>
    );
}

export default App;
