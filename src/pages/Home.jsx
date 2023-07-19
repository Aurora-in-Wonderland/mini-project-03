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
                <StRankTitle> ⭐ 지금 사람들이 많이 찾는 음식</StRankTitle>
                <StRankContainer>
                    {ranks.map((item, index) => {
                        return (
                            <StRanks key={item.id}>
                                <StRankImage src={item.imageUrl}></StRankImage>
                                {index}. {item.name}
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
    margin-top: 8vh;
    margin-bottom: 2vh;
    font-size: 20px;
    font-weight: 600;
    line-height: 30px;
    color: #114E60;
`
const StRankContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 30vh;
    margin-bottom: 5vh;
`
const StRank = styled.div`
    border: 1px solid;
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
    gap: 10px;
`;
const StRankImage = styled.img`
    border-radius: 100%;
    object-fit: contain;
`;


