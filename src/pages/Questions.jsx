import { useNavigate, useParams } from "react-router-dom";
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
      id : "night",
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
    <Stcontainer>
      <div>
        {/* <img>뭔가 이미지 하나 들어가고</img> */}
          { pageNum<=2 && <div>
            <StTitle>{thisQuestion.script}</StTitle>
            <StButtonGroup>
              {
                thisQuestion.option.map((item)=>{
                  return <StButton key={item.id} onClick={()=>{
                    localStorage.setItem(thisQuestion.id, item.value);
                    navigate(`../question/${pageNum+1}`)}}>{item.answer}</StButton>
                })
              }
            </StButtonGroup>
          </div>
          }
          { pageNum===3 && <div>
            <StTitle>{thisQuestion.script}</StTitle>
            <StButtonGroup>
              {
                thisQuestion.option.map((item)=>{
                  return <StButton key={item.id} onClick={()=>{
                    localStorage.setItem(thisQuestion.id, item.value);
                    navigate("/food/result")}}>{item.answer}</StButton>
                })
              }
            </StButtonGroup>
          </div>}
          <StPageCount>{pageNum+2} / 5</StPageCount>
      </div>
    </Stcontainer>
  )
}
export default Question;

export const StButton = styled.button`
  font-size: 16px;
  width: 300px;
  padding: 10px 30px;
  border-radius: 30px;
  background: none;
  border: 3px solid #114E60;
  color: #114E60;

  &:hover {
    background-color: #114E60;
    color: #F0EBE3;
  }
`
export const StButtonGroup = styled.div`
  margin: auto 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  gap: 15px;
`
export const StTitle = styled.h2`
  margin-top: 50px;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 700;
  font-size: 22px;
`
export const StPageCount = styled.h4`
  font-size: 20px;
  color: #8DABB5;
  text-align: center;
  margin: 100px 0 40px;
`
export const Stcontainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 74vh;
  margin: 0 auto;
  max-width: 1200px;
  overflow: hidden;
`