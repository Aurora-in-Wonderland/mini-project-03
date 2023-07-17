import { useState } from "react";
import styled from "styled-components";
import clickImage from "../image/clickImage.png";

import Random from "../components/Random";
import axios from "axios";

const StContainer = styled.div`
    width: 900px;
    height: 65vh;
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
    h2 {
        font-size: 20px;
    }
    img {
        width: 550px;
        height: 400px;
        transform: scale(1);
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        -o-transform: scale(1);
        transition: all 0.5s ease-in-out;
        cursor: pointer;
        &:hover {
            transform: scale(1.5);
            -webkit-transform: scale(1.5);
            -moz-transform: scale(1.5);
            -ms-transform: scale(1.5);
            -o-transform: scale(1.5);
        }
    }
`;

export default function RandomPage() {
    const [showResult, setShowResult] = useState(false);
    const [data, setData] = useState(null);

    const handleClick = async () => {
        try {
            const response = await axios.get(`http://1.244.223.183/api/food/result/random`);
            setShowResult(true);
            setData(response.data);
            console.log("성공:", response);
        } catch (error) {
            console.error("에러:", error);
        }
    };
    console.log("data", data);
    return (
        <>
            {!showResult ? (
                <StContainer>
                    <h1>100% 랜덤! 오늘의 랜덤 메뉴</h1>
                    <h2>마음에 드시는 메뉴를 선택해주세요!</h2>
                    <img
                        src={clickImage}
                        alt="클릭하세요"
                        onClick={handleClick}
                    />
                </StContainer>
            ) : (
                <Random
                    status={data}
                />
            )}
        </>
    );
}
