import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import { BsFillPersonFill } from "react-icons/bs";
import logo from "../image/logo.png";

const Nav = styled.div`
    height: 100px;
    background-color: #41613c;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 0 8rem;

    img {
        width: 100px;
        height: 100px;
    }
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 10px;
        button:first-child {
            width: 100px;
            height: 50px;
            color: #fff;
            background-color: #41613c;
            font-size: 15px;
            font-weight: bold;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            /* &:hover {
                background-color: #fff;
                color: #41613c;
            } */
        }
        button:nth-child(2) {
            width: 100px;
            height: 50px;
            color: #41613c;
            font-size: 15px;
            font-weight: bold;
            border: none;
            border-radius: 8px;
            cursor: pointer;
        }

        /* button:nth-child(2):hover {
            background-color: #41613c;
            color: #fff;
        } */
        .human {
            width: 50px;
            height: 50px;
            color: #fff;
            margin: 10px;
            cursor: pointer;
        }
    }
`;

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <>
            <Nav>
                <Link to="/">
                    <img
                        src={logo}
                        alt="요기어때 로고"
                    />
                </Link>
                <div>
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
                    {/* <BsFillPersonFill className="human" /> */}
                </div>
            </Nav>
        </>
    );
}
