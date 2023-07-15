import * as S from "./components/style";
import { styled } from "styled-components";

const questions =[
  {
    id : "gender",
    script : "성별이 어떻게 되시나요?",
    option : [
      {
        id : 1,
        answer : "여자",
        value : true
      },
      {
        id : 2,
        answer : "남자",
        value : false
      }
    ]
  },
  {
    id : "salty",
    script : "지금 땡기는 음식은?",
    option : [
      {
        id : 1,
        answer : "단",
        value : false
      },
      {
        id : 2,
        answer : "짠",
        value : true
      }
    ]
  },
  {
    id : "spicy",
    script : "매운 음식, 어디까지 가능?!",
    option : [
      {
        id : 1,
        answer : "진짜 못 먹음",
        value : 1,
      },
      {
        id : 2,
        answer : "조금은 매워도 괜찮음",
        value : 2,
      },
      {
        id : 3,
        answer : "신라면 정도는?",
        value : 3,
      },
      {
        id : 4,
        answer : "불닭볶음면도 가능함",
        value : 4,
      },
      {
        id : 5,
        answer : "맵기는 날 방해할 수 없음",
        value : 5,
      }
    ]
  },
  {
    id : "world",
    script : "선호하는 음식이 있다면?",
    option : [
      {
        id : 1,
        answer : "한식",
        value : "kor",
      },
      {
        id : 2,
        answer : "중식",
        value : "chi",
      },
      {
        id : 3,
        answer : "양식",
        value : "",
      },
      {
        id : 4,
        answer : "일식",
        value : 4,
      },
      {
        id : 5,
        answer : "안 가리고 다 잘 먹음!",
        value : 5,
      }
    ]
  }
]

function Question() {

  return (
    <S.StContainer>
      <S.StNav />
      <S.StMain>
        <QuestionImage>뭔가 이미지 하나 들어가고</QuestionImage>
        <div>여기 질문 뭐 예를들면 성별?</div>
        <ButtonGroup>
          <S.StButton color={S.color.yellow} background={S.color.white}>여자</S.StButton> <br />
          버튼에 hover, active 스타일 넣기 (시간 되면..)
          <S.StButton color={S.color.yellow} background={S.color.white}>남자</S.StButton>
        </ButtonGroup>
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