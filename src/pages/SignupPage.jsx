import { useState } from "react";
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

export default function SignupPage() {
    const [form, setForm] = useState({ username: "", loginId: "", password: "", confirm_password: "" });
    const [isCorrect, setIsCorrect] = useState({
        usernameCorrect: true,
        loginIdCorrect: true,
        passwordCorrect: true,
        confirm_passwordCorrect: true,
    });

    const handleSigninSubmit = (event) => {
        event.preventDefault();
        console.log(form);
        const idRegExp = /^[a-zA-z0-9]{4,12}$/;
        const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
        if (form.username.trim().length === 0) {
            alert("이름을 입력하세요");
            setIsCorrect((prev) => {
                return { ...prev, usernameCorrect: false };
            });
            return;
        }
        if (form.loginId.trim().length === 0 || !idRegExp.test(form.loginId.trim())) {
            alert("ID는 영어 대소문자, 4-12글자여야 합니다.");
            setIsCorrect((prev) => {
                return { ...prev, loginIdCorrect: false };
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
        if (form.password !== form.confirm_password) {
            alert("비밀번호가 일치하지 않습니다.");
            setIsCorrect((prev) => {
                return { ...prev, confirm_passwordCorrect: false };
            });
            return;
        }
        setForm({ username: "", loginId: "", password: "", confirm_password: "" });
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
                <Link to="/login">
                    <p>로그인하러가기</p>
                </Link>
            </StForm>
        </>
    );
}
