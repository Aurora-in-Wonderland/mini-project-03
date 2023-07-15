import { useNavigate } from "react-router-dom";
import * as S from "./components/style"

function Home() {
  const navigate = useNavigate();
  return (
    <S.StContainer>
      <S.StNav>
        네비게이션 바
      </S.StNav>
      <S.StMain>
        Home
        <img src="https://blog.kakaocdn.net/dn/cd2MQ5/btqx0q65v5Y/mKwQKWKh0HNtslQkgsktE0/img.jpg" />
        <S.StBtnGroup>
          <S.StButton color={S.color.white} background={S.color.yellow}
            onClick={()=>{navigate('/question')}}>취향대로 추천받기</S.StButton>
          <S.StButton color={S.color.yellow} background={S.color.white}
            onClick={()=>{navigate('/random-result')}}>랜덤 메뉴 뽑기</S.StButton>
        </S.StBtnGroup>
        <S.StRankContainer></S.StRankContainer>
      </S.StMain>
      <S.StFooter></S.StFooter>
    </S.StContainer>
  )
}

export default Home;