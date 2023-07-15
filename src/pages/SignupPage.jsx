import { useState } from "react";
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
        background-color: #114e60;
        border: none;
        color: #fff;
        font-size: 30px;
        border-radius: 8px;
    }
`;

export default function SignupPage() {
    const [form, setForm] = useState({ username: "", loginId: "", password: "", confirm_password: "" });
    const handleSigninSubmit = (event) => {
        event.preventDefault();
        console.log(form);
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };
    return (
        <>
            <StForm onSubmit={handleSigninSubmit}>
                <div>
                    <label htmlFor="username">User name</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="id">ID</label>
                    <input
                        type="text"
                        id="lognId"
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
                <div>
                    <label htmlFor="password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        value={form.confirm_password}
                        onChange={handleChange}
                    />
                </div>
                <button>SIGN IN</button>
            </StForm>
        </>
    );
}
