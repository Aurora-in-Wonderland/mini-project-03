import { useState } from "react";
import Comments from "../components/Comments";

import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import api from "../axios/api";

export default function FinalResultPage() {
    const [like, setLike] = useState(0);

    const foodId = localStorage.getItem("foodId");
    const foodName = localStorage.getItem("foodName");
    const imageUrl = localStorage.getItem("imageUrl");
    const username = localStorage.getItem("username");

    const likeButton = async (event) => {
        try {
            const response = await api.post(`/api/food/${foodId}/like`, null);
            setLike(response.data);
            console.log("성공", response);
        } catch (error) {
            console.log("에러", error);
        }
    };


    return (
        <div>
            <StContainer>
                {!username ? <h1>오늘의 메뉴 선택!</h1> : <h1>{username}님의 선택!</h1>}
                <img
                    src={imageUrl}
                    alt="추천메뉴"
                />
                {like === 0 ? (
                    <AiOutlineHeart
                        className="like"
                        onClick={likeButton}
                    />
                ) : (
                    <AiFillHeart
                        className="like"
                        onClick={likeButton}
                    />
                )}
                <h1>{foodName}</h1>
                <p>설명</p>
                <Comments setLike={setLike} />
            </StContainer>
        </div>
    );
}

const StContainer = styled.div`
    width: 60%;
    margin: auto;
    background-color: #e4dccf;
    padding: 5%;

    display: flex;
    flex-direction: column;
    justify-content: center;
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
    width: 768px;

    @media (max-width: 1024px) {
        width: 768px;
        padding: 10% 0;
    }

    @media (max-width: 768px) {
        width: 100%;
        padding: 10% 0;
    }
`;
