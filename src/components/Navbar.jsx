import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsFillPersonFill } from "react-icons/bs";
import logo from "../image/logo.png";

const Nav = styled.div`
    position: fixed;
    width: 100vw;
    height: 13vh;
    background-color: #41613c;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 0 5vw;

    img {
        width: 100px;
        height: 100px;
    }
`;

const StUnLogin = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10%;
    button {
        width: 100px;
        height: 50px;
        color: #fff;
        background-color: #41613c;
        font-size: 15px;
        font-weight: bold;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        &:hover {
            color: #41613c;
            background-color: #fff;
        }
    }
`;

const StLogin = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10%;
    button {
        width: 100px;
        height: 50px;
        color: #fff;
        background-color: #41613c;
        font-size: 15px;
        font-weight: bold;
        border: none;
        border-radius: 8px;
        cursor: pointer;
    }
    .human {
        width: 50px;
        height: 50px;
        color: #fff;
        margin: 10px;
        cursor: pointer;
    }
`;

export default function Navbar() {
    const accessToken = localStorage.getItem("accessToken");
    const navigate = useNavigate();
    const onClickLogoutButton = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("authorizationToken");
        localStorage.removeItem("foodName");
        localStorage.removeItem("foodId");
        localStorage.removeItem("username");
        localStorage.removeItem("imageUrl");
        navigate("/");
    };
    return (
        <>
            <Nav>
                <Link to="/">
                    <img
                        src={logo}
                        alt="요기어때 로고"
                    />
                </Link>

                {!accessToken ? (
                    <StUnLogin>
                        <button
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            LOG IN
                        </button>
                        <button
                            onClick={() => {
                                navigate("/signup");
                            }}
                        >
                            SIGN UP
                        </button>
                    </StUnLogin>
                ) : (
                    <StLogin>
                        <button onClick={onClickLogoutButton}>LOG OUT</button>
                        <BsFillPersonFill className="human" />
                    </StLogin>
                )}
            </Nav>
        </>
    );
}
