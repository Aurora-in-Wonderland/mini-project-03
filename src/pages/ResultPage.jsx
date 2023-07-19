import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Loading from "../components/Loading";
import api from "../axios/api";

export default function ResultPage() {
    const [isData, isSetData] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [clickData, setClickData] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const accessToken = localStorage.getItem("accessToken");
    const choiceData = {
        salty: JSON.parse(localStorage.getItem("salty")),
        spicy: Number(localStorage.getItem("spicy")),
        world: Number(localStorage.getItem("world")),
        hot: JSON.parse(localStorage.getItem("hot")),
        night: JSON.parse(localStorage.getItem("night")),
    };

    const handleImageClick = (imageData) => {
        setSelectedImage(imageData);
        let selectedStatus = null;

        if (imageData === "Image 1 Data") {
            selectedStatus = isData[0];
        } else if (imageData === "Image 2 Data") {
            selectedStatus = isData[1];
        } else if (imageData === "Image 3 Data") {
            selectedStatus = isData[2];
        } else if (imageData === "Image 4 Data") {
            selectedStatus = isData[3];
        }
        setClickData(selectedStatus);
    };

    const instances = async () => {
        try {
            const response = await api.post("/api/food/result", choiceData, {
                headers: {
                    accesstoken: accessToken,
                },
            });
            isSetData(response.data);
            localStorage.removeItem("salty");
            localStorage.removeItem("spicy");
            localStorage.removeItem("world");
            localStorage.removeItem("hot");
            localStorage.removeItem("night");

            console.log("성공", response);
        } catch (error) {
            console.log("에러", error);
        }
    };

    useEffect(() => {
        instances();
    }, []);

    if (isData == null) {
        return null;
    }

    const onClickFinalMenu = async (event) => {
        const foodId = clickData.id;
        setLoading(true);

        try {
            const response = await api.patch(`/api/food/${foodId}/choice`);

            console.log("성공:", response);
            localStorage.setItem("foodId", clickData.id);
            localStorage.setItem("foodName", clickData.name);
            localStorage.setItem("imageUrl", clickData.imageUrl);

            navigate(`/food/${foodId}/comment`);
        } catch (error) {
            console.error("에러:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <Loading />}
            <StContainer>
                <h1>요기어때가 엄선한 오늘의 추천 메뉴</h1>
                <h2>마음에 드시는 메뉴를 선택해주세요!</h2>
                <img
                    src={isData && isData[0].imageUrl}
                    alt="추천메뉴"
                    onClick={() => handleImageClick("Image 1 Data")}
                    style={{
                        border: selectedImage === "Image 1 Data" ? "5px solid #FFE27C" : "none",
                    }}
                />
                <h1>{isData && isData[0].name}</h1>
                <p>설명</p>
                <StSection>
                    <section key={isData && isData[1].id}>
                        <img
                            src={isData && isData[1].imageUrl}
                            alt="추천메뉴"
                            onClick={() => handleImageClick("Image 2 Data")}
                            style={{
                                border: selectedImage === "Image 2 Data" ? "5px solid #FFE27C" : "none",
                            }}
                        />
                        <p>{isData && isData[1].name}</p>
                    </section>
                    <section key={isData && isData[2].id}>
                        <img
                            src={isData && isData[2].imageUrl}
                            alt="추천메뉴"
                            onClick={() => handleImageClick("Image 3 Data")}
                            style={{
                                border: selectedImage === "Image 3 Data" ? "5px solid #FFE27C" : "none",
                            }}
                        />
                        <p>{isData && isData[2].name}</p>
                    </section>
                    <section key={isData && isData[3].id}>
                        <img
                            src={isData && isData[3].imageUrl}
                            alt="추천메뉴"
                            onClick={() => handleImageClick("Image 4 Data")}
                            style={{
                                border: selectedImage === "Image 4 Data" ? "5px solid #FFE27C" : "none",
                            }}
                        />
                        <p>{isData && isData[3].name}</p>
                    </section>
                </StSection>
                {!clickData ? (
                    <StButton onClick={() => alert("메뉴를 클릭해주세요.")}>메뉴 선택하고 댓글쓰러 가기</StButton>
                ) : (
                    <StButton onClick={onClickFinalMenu}>메뉴 선택하고 댓글쓰러 가기</StButton>
                )}
            </StContainer>
        </>
    );
}

const StContainer = styled.div`
    width: 100%;
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
