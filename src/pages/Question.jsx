import { Navigate, useNavigate } from "react-router-dom";
import * as S from "./components/style";
import { styled } from "styled-components";

function Question() {
  const navigate = useNavigate();
  return (
    <S.StContainer>
      <S.StMain>
        <QuestionImage>뭔가 이미지 하나 들어가고</QuestionImage>
          <div>
            <div>지금 땡기는 음식은?</div>
            <ButtonGroup>
              <S.StButton onClick={()=> navigate("0")}>단</S.StButton>
              <S.StButton onClick={()=> navigate("0")}>짠</S.StButton>
            </ButtonGroup>
            <div>1 / 5</div>
          </div>
      </S.StMain>
    </S.StContainer>
  )
}
export default Question;

const QuestionImage = styled.div`
  border: 1px solid;
  height: 300px;
`
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 10px;
  margin: 0 auto;
  margin-bottom: 100px;
`