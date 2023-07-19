import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { styled } from "styled-components";

import Home from "./pages/Home";
import Question from "./pages/Question";
import Questions from "./pages/Questions";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ResultPage from "./pages/ResultPage";
import RandomPage from "./pages/RandomPage";
import FinalResultPage from "./pages/FinalResultPage";
import MyPage from "./pages/MyPage";

function App() {
    return (
        <BrowserRouter>
            <header>
                <Navbar />
            </header>
            <StMain>
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
                        path="/question/:id"
                        element={<Questions />}
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
                    <Route
                        path="/mypage"
                        element={<MyPage />}
                    />
                </Routes>
            </StMain>
            <footer>
                <Footer />
            </footer>
        </BrowserRouter>
    );
}

export default App;

const StMain = styled.div`
    width: 100%;
    margin: auto;
    background-color: #f0ebe3;
    padding-top: 13vh;
`;
