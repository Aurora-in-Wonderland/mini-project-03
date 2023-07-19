import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
});

export default function SignupPage() {
    const [form, setForm] = useState({ username: "", address: "", password: "", confirm_password: "" });
    const [isCorrect, setIsCorrect] = useState({
        usernameCorrect: true,
        addressCorrect: true,
        passwordCorrect: true,
        confirm_passwordCorrect: true,
    });
    const [outName, setOutName] = useState(false);
    const [outNameText, setOutNameText] = useState("");
    const [outAddress, setOutAddress] = useState(false);
    const [outAddressText, setOutAddressText] = useState("");
    const navigate = useNavigate();

    const handleSigninSubmit = async (event) => {
        event.preventDefault();
        console.log(form);
        setForm({ username: "", address: "", password: "", confirm_password: "" });
        const idRegExp = /^[a-z0-9]{4,12}$/;
        const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z\d]{8,25}$/;

        if (form.username.trim().length === 0) {
            alert("이름을 입력하세요");
            setIsCorrect((prev) => {
                return { ...prev, usernameCorrect: false };
            });
            return;
        }

        if (form.address.trim().length === 0 || !idRegExp.test(form.address.trim())) {
            alert("ID는 영어 소문자와 숫자로 이루어진 4-12글자여야 합니다.");
            setIsCorrect((prev) => {
                return { ...prev, addressCorrect: false };
            });
            return;
        }

        if (form.password.trim().length === 0 || !passwordRegExp.test(form.password.trim())) {
            alert("비밀번호는 영어와 숫자가 포함된 8글자 이상이어야 합니다.");
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
        try {
            const response = await api.post("/api/user/signup", form);
            console.log("성공:", response.data);
            navigate("/login");
        } catch (error) {
            if (error.response.data.msg === "Same Username") {
                alert("같은 이름을 이미 사용 중인 사람이 있습니다. 다른 이름을 사용해주세요.");
            } else if (error.response.data.msg === "Same Id") {
                alert("같은 ID를 이미 사용 중인 사람이 있습니다. 다른 ID를 사용해주세요.");
            }
            console.error("에러:", error);
        }
        setForm({ username: "", address: "", password: "", confirm_password: "" });
    };
    //

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const nameInHandler = (event) => {
        setOutName(false);
    };

    const nameOutHandler = async (event) => {
        try {
            const response = await api.post("/api/user/signup/username", {
                username: form.username,
            });
            console.log("성공:", response.data);
        } catch (error) {
            if (error.response.status === 409) {
                setOutNameText("같은 이름을 이미 사용 중인 사람이 있습니다. 다른 이름을 사용해주세요.");
            }
            setOutName(true);
            console.error("에러:", error);
        }
    };

    const addressInHandler = (event) => {
        setOutAddress(false);
    };

    const addressOutHandler = async (event) => {
        try {
            const response = await api.post("/api/user/signup/address", {
                address: form.address,
            });
            console.log("성공:", response.data);
        } catch (error) {
            if (error.response.status === 409) {
                setOutAddressText("같은 ID를 이미 사용 중인 사람이 있습니다. 다른 ID를 사용해주세요.");
            } else if (error.response.status === 406) {
                setOutAddressText("ID는 영어 소문자와 숫자로 이루어진 4-12글자여야 합니다.");
            }
            setOutAddress(true);
            console.error("에러:", error);
        }
    };
    useEffect(() => {
        console.log(outAddressText);
    }, []);

    return (
        <>
            <StForm onSubmit={handleSigninSubmit}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div style={{ textAlign: "left" }}>
                        <label htmlFor="username">User name</label>
                        <input
                            autoFocus
                            type="text"
                            id="username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            onFocus={nameInHandler}
                            onBlur={nameOutHandler}
                        />
                    </div>
                    <div style={{ height: "30px" }}>{outName ? <p style={{ color: "red" }}>{outNameText}</p> : null}</div>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div style={{ textAlign: "left" }}>
                        <label htmlFor="id">ID</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            onFocus={addressInHandler}
                            onBlur={addressOutHandler}
                        />
                    </div>
                    <div style={{ height: "30px" }}>{outAddress ? <p style={{ color: "red" }}>{outAddressText}</p> : null}</div>
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
