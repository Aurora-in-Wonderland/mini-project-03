import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Stcontainer } from './Questions';
import api from "../axios/api";

function Home() {
    const [ranks, setRanks] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const instances = async () => {
            try {
                const response = await api.get("/api/food/rank");
                setRanks(response.data);
            } catch (error) {
                console.log("에러", error);
            }
        };
        instances();
    }, []);

    return (
        <Stcontainer>
            <div>
                <StRankTitle> 지금 사람들이 많이 찾는 음식 🔥</StRankTitle>
                <StRankContainer>
                    {ranks.map((item) => {
                        return (
                            <StRanks key={item.id} onClick={()=>{
                                localStorage.setItem("foodId", item.id);
                                localStorage.setItem("foodName", item.name);
                                localStorage.setItem("imageUrl", item.imageUrl);
                                navigate(`/food/${item.id}/comment`);
                            }}>
                                <StRankImage src={item.imageUrl}></StRankImage>
                                <StRankName>{item.name}</StRankName>
                            </StRanks>
                        );
                    })}
                </StRankContainer>
                <StButtonGroup>
                    <StButton
                        onClick={() => {
                            navigate("/question");
                        }}
                    >
                        취향대로 추천받기
                    </StButton>
                    <StButton
                        onClick={() => {
                            navigate("/random");
                        }}
                    >
                        랜덤 메뉴 뽑기
                    </StButton>
                </StButtonGroup>
            </div>
        </Stcontainer>
    );
}

export default Home;

const StRankTitle = styled.h2`
    margin-top: 5vh;
    margin-bottom: 2vh;
    font-size: 30px;
    font-weight: 600;
    line-height: 30px;
    color: #114E60;
`
const StRankContainer = styled.div`
    display: flex;
    justify-content: space-around;
    height: 25vh;
    margin-bottom: 5vh;
`
const StButtonGroup = styled.div`
    margin-bottom: 100px;
    text-align: center;
`
const StButton = styled.button`
    font-size: 18px;
    font-weight: 500;
    height: 50px;
    width: 200px;
    margin: 20px;
    border-radius: 20px;
    background-color: #114E60;
    border: 3px solid #114E60;
    color : #F9F9F9;

    &:hover {
        background-color: #F9F9F9;
        color: #114E60;
    }
`
const StRanks = styled.div`
    width: 180px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 10px;
    align-items: center;
    padding: 10px;
    border-radius: 30px;
    &:hover {
        background-color: rgba(0,0,0,0.3);
    }
`
const StRankImage = styled.img`
    border-radius: 100%;
    width: 90%;
    max-width: 200px;
    object-fit: contain;
    border: 3px solid #41613C;
`
const StRankName = styled.h4`
    font-size: 18px;
    padding: 5px;
    text-align: center;
`