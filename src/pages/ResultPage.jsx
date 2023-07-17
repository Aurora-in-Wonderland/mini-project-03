import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

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
    const [data, setData] = useState([
        {
            id: 0,
            name: "",
            imageUrl: "",
        },
    ]);
    const accessToken = localStorage.getItem("accessToken");
    const choiceData = {
        salty: JSON.parse(localStorage.getItem("salty")),
        spicy: Number(localStorage.getItem("spicy")),
        world: Number(localStorage.getItem("world")),
        hot: JSON.parse(localStorage.getItem("hot")),
        night: JSON.parse(localStorage.getItem("night")),
    };

    useEffect(() => {
        const instances = async () => {
            try {
                const response = await axios.post("http://1.244.223.183/api/food/result", choiceData, {
                    headers: {
                        accesstoken: accessToken,
                    },
                });
                setData(response.data);
                console.log("성공", response);
            } catch (error) {
                console.log("에러", error);
            }
        };
        instances();
    }, []);

    // console.log(data[0].name);

    return (
        <>
            <StContainer>
                <h1>요기어때가 엄선한 오늘의 추천 메뉴</h1>
                <h2>마음에 드시는 메뉴를 선택해주세요!</h2>
                <img
                    src={data[0].imageUrl}
                    alt="추천메뉴"
                />
                {/* <p>
                    <AiFillHeart />
                    <AiOutlineHeart />
                </p>  */}
                <h1>{data[0].name}</h1>
                <p>설명</p>
                <StSection>
                    {data.slice(1, 4).map((item) => (
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
            </StContainer>
        </>
    );
}
