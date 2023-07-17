import React from "react";
import styled from "styled-components";
import Comments from "./Comments";

const StContainer = styled.div`
    width: 900px;
    height: 100vh;
    margin: auto;
    background-color: #e4dccf;

    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        font-size: 30px;
        margin: 10px;
    }
    h2 {
        font-size: 20px;
    }
    img {
        width: 200px;
        height: 200px;
        border-radius: 100%;
        margin: 20px;
        cursor: pointer;
    }
`;

const StSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;

    section {
        width: 180px;
        height: 230px;
        border: 1px solid black;
        border-radius: 8px;
        margin: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        img {
            width: 150px;
            height: 150px;
            border-radius: 100%;
            align-items: center;
            cursor: pointer;
        }
        p {
            text-align: center;
        }
    }
`;
const StButton = styled.button`
    width: 300px;
    height: 50px;
    color: #8dabb5;
    border: 3px solid #8dabb5;
    border-radius: 20px;
    cursor: pointer;
`;

export default function Random({ status }) {
    return (
        <>
            <StContainer>
                <h1>100% 랜덤! 오늘의 랜덤 메뉴</h1>
                <h2>마음에 드시는 메뉴를 선택해주세요!</h2>
                <img
                    src={status[0].imageUrl}
                    alt="추천메뉴"
                />
                <h1>{status[0].name}</h1>
                <StSection>
                    {status.slice(1, 4).map((item) => (
                        <section key={item.id}>
                            <img
                                src={item.imageUrl}
                                alt="추천메뉴"
                            />
                            <p>{item.name}</p>
                        </section>
                    ))}
                </StSection>
                <StButton>메뉴 선택하고 댓글쓰러 가기</StButton>
                {/* <Comments /> */}
            </StContainer>
        </>
    );
}
