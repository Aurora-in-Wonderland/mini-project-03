import { useState } from "react";
import Comments from "../components/Comments";

import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart, AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useParams } from "react-router-dom";

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
`;

export default function FinalResultPage() {
    const params = useParams();
    const [like, setLike] = useState(false);

    const likeButton = async () => {
        // try{
        //     const response = await axios.post(
        //         ""
        //     )
        // }
        console.log("좋아요 아직?");
    };

    return (
        <div>
            <StContainer>
                <h1>OOO님의 선택!</h1>
                <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
                    alt="추천메뉴"
                />

                <AiFillHeart
                    className="like"
                    onClick={likeButton}
                />
                <AiOutlineHeart
                    className="like"
                    onClick={likeButton}
                />

                <h1>요리이름</h1>
                <p>설명</p>
                <Comments />
            </StContainer>
        </div>
    );
}
