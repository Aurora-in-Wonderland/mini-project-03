import React from "react";
import styled from "styled-components";
import { BsFillTrashFill, BsFillPenFill } from "react-icons/bs";

const StComments = styled.div`
    /* width: 600px; */
    border: 1px solid black;
    padding: 20px;
    input {
        width: 500px;
        height: 30px;
        background-color: #f0ebe3;
    }
    section {
        width: 600px;
        height: 30px;
        background-color: #f0ebe3;
        margin: 5px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        p:first-child {
            width: 120px;
        }
        p {
            width: 420px;
        }
    }
`;

const StButton = styled.button`
    width: 80px;
    height: 40px;
    margin: 10px;
    background-color: #114e60;
    border: none;
    border-radius: 8px;
    color: #fff;
`;

export default function Comments() {
    return (
        <>
            <StComments>
                <input />
                <StButton>입력</StButton>
                <section>
                    <p>username</p>
                    <p>댓글내역</p>
                    <div>
                        <button>
                            <BsFillPenFill />
                        </button>
                        <button>
                            <BsFillTrashFill />
                        </button>
                    </div>
                </section>
            </StComments>
        </>
    );
}
