import React from "react";
import Comments from "../components/Comments";

import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart, AiFillStar, AiOutlineStar } from "react-icons/ai";

const StContainer = styled.div`
    width: 900px;
    margin: auto;
    background-color: #e4dccf;
    padding: 50px;

    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;

    h1 {
        font-size: 30px;
        margin: 10px;
    }
    img {
        width: 200px;
        height: 200px;
        border-radius: 100%;
        margin: 20px;
        cursor: pointer;
    }
    .like {
        width: 30px;
        height: 30px;
        color: #d13b40;
    }
    .star {
        width: 30px;
        height: 30px;
        color: #e8b535;
    }
`;

export default function FinalResultPage() {
    const username = localStorage.get("username");
    console.log(username);
    return (
        <div>
            <StContainer>
                <h1>OOO님의 선택!</h1>
                <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
                    alt="추천메뉴"
                />
                <p>
                    <AiFillStar className="star" />
                    <AiOutlineStar className="star" />
                    <AiFillHeart className="like" />
                    <AiOutlineHeart className="like" />
                </p>
                <h1>요리이름</h1>
                <p>설명</p>
                <Comments />
            </StContainer>
        </div>
    );
}
