import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../axios/api";

export default function LoginPage() {
    const [form, setForm] = useState({ address: "", password: "" });
    const [isCorrect, setIsCorrect] = useState({
        addressCorrect: true,
        passwordCorrect: true,
    });

    const navigate = useNavigate();

    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        const idRegExp = /^[a-z0-9]{4,12}$/;
        const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z\d]{8,25}$/;

        if (form.address.trim().length === 0 || !idRegExp.test(form.address.trim())) {
            alert("ID는 영어 대소문자, 4-12글자여야 합니다.");
            setIsCorrect((prev) => {
                return { ...prev, addressCorrect: false };
            });
            return;
        }
        if (form.password.trim().length === 0 || !passwordRegExp.test(form.password.trim())) {
            alert("비밀번호는 영어와 숫자가 포함된 8글자 이상입니다.");
            setIsCorrect((prev) => {
                return { ...prev, passwordCorrect: false };
            });
            return;
        }
        try {
            const response = await api.post("/api/user/login", form);
            console.log("성공:", response);
            navigate("/");
        } catch (error) {
            alert("ID나 비밀번호가 틀렸습니다.");
            console.error("에러:", error);
        }
        setForm({ address: "", password: "" });
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    useEffect(() => {
        localStorage.clear();
    }, []);
    return (
        <>
            <StForm onSubmit={handleLoginSubmit}>
                <div>
                    <label htmlFor="name">ID</label>
                    <input
                        autoFocus
                        type="text"
                        id="address"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                </div>
                <button>LOG IN</button>
                <Link to="/signup">
                    <p>회원가입하러가기</p>
                </Link>
            </StForm>
        </>
    );
}

const StForm = styled.form`
    height: 75vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    div {
        display: flex;
        flex-direction: column;
        justify-content: baseline;
    }

    label {
        margin-bottom: 8px;
    }

    input {
        width: 292px;
        height: 40px;
        border-radius: 8px;
        color: #114e60;
        margin-bottom: 16px;
    }

    button {
        width: 300px;
        height: 50px;
        background-color: #41613c;
        border: none;
        color: #fff;
        font-size: 30px;
        border-radius: 8px;
    }
    p {
        margin: 10px;
        color: #41613c;
    }
`;
