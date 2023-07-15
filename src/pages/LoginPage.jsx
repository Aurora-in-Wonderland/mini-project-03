import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

export default function LoginPage() {
    const [form, setForm] = useState({ loginId: "", password: "" });
    const handleLoginSubmit = (event) => {
        event.preventDefault();
        console.log(form);
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <>
            <StForm onSubmit={handleLoginSubmit}>
                <div>
                    <label htmlFor="name">ID</label>
                    <input
                        type="text"
                        id="loginId"
                        name="loginId"
                        value={form.loginId}
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
