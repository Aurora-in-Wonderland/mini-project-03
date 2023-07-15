import React from "react";
import styled from "styled-components";
import Comments from "../components/Comments";

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

export default function ResultPage() {
    return (
        <>
            <StContainer>
                <h1>요기어때가 엄선한 오늘의 추천 메뉴</h1>
                <h2>마음에 드시는 메뉴를 선택해주세요!</h2>
                <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
                    alt="추천메뉴"
                />
                <h1>요리이름</h1>
                <p>설명</p>
                <StSection>
                    <section>
                        <img
                            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
                            alt="추천메뉴"
                        />
                        <p>요리이름</p>
                    </section>
                    <section>
                        <img
                            src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
                            alt="추천메뉴"
                        />
                        <p>요리이름</p>
                    </section>
                    <section>
                        <img
                            src="https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
                            alt="추천메뉴"
                        />
                        <p>요리이름</p>
                    </section>
                </StSection>
                <StButton>메뉴 선택하고 댓글쓰러 가기</StButton>
                {/* <Comments /> */}
            </StContainer>
        </>
    );
}
