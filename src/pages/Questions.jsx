import { useNavigate, useParams } from "react-router-dom";
import * as S from "./components/style";
import { styled } from "styled-components";



function Question() {
  const questions =[
    {
      id : "spicy",
      script : "매운 음식, 어디까지 가능?!",
      option : [
        {
          id : 0,
          answer : "상관 없음",
          value : 0,
        },
        {
          id : 1,
          answer : "매운 거 못 먹음",
          value : 1,
        },
        {
          id : 2,
          answer : "약간 매콤한 정도",
          value : 2,
        },
        {
          id : 3,
          answer : "신라면 정도는?",
          value : 3,
        },
        {
          id : 4,
          answer : "불닭 정도는 가능",
          value : 4,
        },
        {
          id : 5,
          answer : "내가 못 먹는 매움은 없음!",
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
          value : 1,
        },
        {
          id : 2,
          answer : "중식",
          value : 2,
        },
        {
          id : 3,
          answer : "일식",
          value : 3,
        },
        {
          id : 4,
          answer : "양식",
          value : 4,
        },
        {
          id : 0,
          answer : "안 가리고 다 잘 먹음!",
          value : 0,
        }
      ]
    },
    {
      id : "hot",
      script : "차가운 음식, 따뜻한 음식 중 고르자면?",
      option : [
        {
          id : 0,
          answer : "따뜻한 음식",
          value : true,
        },
        {
          id : 1,
          answer : "차가운 음식",
          value : false,
        }
      ]
    },
    {
      id : "when",
      script : "점심? 저녁?",
      option : [
        {
          id : 0,
          answer : "점심",
          value : false,
        },
        {
          id : 1,
          answer : "저녁",
          value : true,
        }
      ]
    }
  ]

  const param = useParams();
  const pageNum = Number(param.id);
  const thisQuestion = questions[pageNum];
  const navigate = useNavigate();

  return (
    <S.StContainer>
      <S.StMain>
        <QuestionImage>뭔가 이미지 하나 들어가고</QuestionImage>
          { pageNum<=2 && <div>
            <div>{thisQuestion.script}</div>
            <ButtonGroup>
              {
                thisQuestion.option.map((item)=>{
                  return <S.StButton key={item.id} onClick={()=>{
                    localStorage.setItem(thisQuestion.id, item.value);
                    navigate(`../question/${pageNum+1}`)}}>{item.answer}</S.StButton>
                })
              }
            </ButtonGroup>
          </div>
          }
          { pageNum===3 && <div>
            <div>{thisQuestion.script}</div>
            <ButtonGroup>
              {
                thisQuestion.option.map((item)=>{
                  return <S.StButton key={item.id} onClick={()=>{
                    localStorage.setItem(thisQuestion.id, item.value);
                    navigate("/food/result")}}>{item.answer}</S.StButton> // 결과 페이지로 이동
                })
              }
            </ButtonGroup>
          </div>}
          <div>{pageNum+2} / 5</div>
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