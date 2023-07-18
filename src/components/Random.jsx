import { useState } from "react";
import styled from "styled-components";
// import Comments from "./Comments";
import axios from "axios";
import { useNavigate } from "react-router";

// import { stat } from "fs";

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
    const [selectedImage, setSelectedImage] = useState(null);
    const [clickData, setClickData] = useState(null);
    const navigate = useNavigate();

    const handleImageClick = (imageData) => {
        setSelectedImage(imageData);
        let selectedStatus = null;

        if (imageData === "Image 1 Data") {
            selectedStatus = status[0];
        } else if (imageData === "Image 2 Data") {
            selectedStatus = status[1];
        } else if (imageData === "Image 3 Data") {
            selectedStatus = status[2];
        } else if (imageData === "Image 4 Data") {
            selectedStatus = status[3];
        }
        // console.log(selectedStatus);
        setClickData(selectedStatus);
    };
    // console.log("sss", clickData.id);

    const onClickRandomMenu = async (event) => {
        const foodId = clickData?.id;
        try {
            const response = await axios.patch(`http://1.244.223.183/api/food/${foodId}/choice`);
            console.log("성공:", response);
            localStorage.setItem("foodId", clickData.id);
            localStorage.setItem("foodName", clickData.name);
            localStorage.setItem("imageUrl", clickData.imageUrl);

            navigate(`/food/${foodId}/comment`);
        } catch (error) {
            console.error("에러:", error);
        }
    };

    return (
        <>
            <StContainer>
                <h1>100% 랜덤! 오늘의 랜덤 메뉴</h1>
                <h2>마음에 드시는 메뉴를 선택해주세요!</h2>
                <img
                    src={status && status[0].imageUrl}
                    alt="추천메뉴"
                    onClick={() => handleImageClick("Image 1 Data")}
                    style={{
                        border: selectedImage === "Image 1 Data" ? "5px solid #FFE27C" : "none",
                    }}
                />
                <h1>{status && status[0].name}</h1>
                <StSection>
                    <section key={status && status[1].id}>
                        <img
                            src={status && status[1].imageUrl}
                            alt="추천메뉴"
                            onClick={() => handleImageClick("Image 2 Data")}
                            style={{
                                border: selectedImage === "Image 2 Data" ? "5px solid #FFE27C" : "none",
                            }}
                        />
                        <p>{status && status[1].name}</p>
                    </section>
                    <section key={status && status[2].id}>
                        <img
                            src={status && status[2].imageUrl}
                            alt="추천메뉴"
                            onClick={() => handleImageClick("Image 3 Data")}
                            style={{
                                border: selectedImage === "Image 3 Data" ? "5px solid #FFE27C" : "none",
                            }}
                        />
                        <p>{status && status[2].name}</p>
                    </section>
                    <section key={status && status[3].id}>
                        <img
                            src={status && status[3].imageUrl}
                            alt="추천메뉴"
                            onClick={() => handleImageClick("Image 4 Data")}
                            style={{
                                border: selectedImage === "Image 4 Data" ? "5px solid #FFE27C" : "none",
                            }}
                        />
                        <p>{status && status[3].name}</p>
                    </section>
                </StSection>
                <StButton onClick={onClickRandomMenu}>메뉴 선택하고 댓글쓰러 가기</StButton>
                {/* <Comments /> */}
            </StContainer>
        </>
    );
}
