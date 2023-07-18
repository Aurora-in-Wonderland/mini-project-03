import { useNavigate } from "react-router-dom";
import * as S from "./components/style";
import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from "styled-components";


function Home() {
    const [ranks, setRanks] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const instances = async () => {
            try {
            const response = await axios.get(
            "http://1.244.223.183/api/food/rank");
            setRanks(response.data);
            } catch (error) {
            console.log("에러", error);
            }
            };
            instances();
        }, [])

    return (
        <S.StContainer>
            <S.StMain>
                Home
                <img src="https://blog.kakaocdn.net/dn/cd2MQ5/btqx0q65v5Y/mKwQKWKh0HNtslQkgsktE0/img.jpg" />
                <S.StBtnGroup>
                    <S.StButton
                        color={S.color.white}
                        background={S.color.yellow}
                        onClick={() => {
                            navigate("/question");
                        }}
                    >
                        취향대로 추천받기
                    </S.StButton>
                    <S.StButton
                        color={S.color.yellow}
                        background={S.color.white}
                        onClick={() => {
                            navigate("/random");
                        }}
                    >
                        랜덤 메뉴 뽑기
                    </S.StButton>
                </S.StBtnGroup>
                <S.StRankContainer>
                    <h4>지금 사람들이 많이 찾는 음식</h4>
                    <StRankWrapper>
                        {
                            ranks.map((item)=>{
                                return(
                                    <StRanks key={item.id}>
                                        <StRankImage src={item.imageUrl}></StRankImage>
                                        {item.name}
                                    </StRanks>
                                )
                            })
                        }
                    </StRankWrapper>
                </S.StRankContainer>
            </S.StMain>
        </S.StContainer>
    );
}

export default Home;

const StRankWrapper = styled.div`
    display: flex;
    justify-content: space-around;
`
const StRanks = styled.div`
    width: 180px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`
const StRankImage = styled.img`
    border-radius: 100%;
    object-fit: contain;
`


// Bearer%20eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLquYDrlaHrlaEiLCJhdXRoIjoiVVNFUiIsImV4cCI6MTY4OTU1NzEwMiwiaWF0IjoxNjg5NTUzNTAyfQ.d71Mmca1_yJS9M67J88THQHd5fJLhmHP8TppNwi1DHQ