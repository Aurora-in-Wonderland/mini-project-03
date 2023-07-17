import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react"; 
import * as S from "./components/style";
import { styled } from "styled-components";
import axios from "axios";

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
  // const choiceData = {
  //       salty : JSON.parse(localStorage.getItem("salty")),
  //       spicy : Number(localStorage.getItem("spicy")),
  //       world : Number(localStorage.getItem("world")),
  //       hot : JSON.parse(localStorage.getItem("hot")),
  //       night : JSON.parse(localStorage.getItem("night")),
  //     }
  // const accessToken = localStorage.getItem("accessToken");
  // const handleChoiceSubmit = async () => {
  //   try {
  //   const response = await axios.post(
  //   "http://1.244.223.183/api/food/result",
  //     choiceData,
  //     {
  //       headers: {
  //       Authorization: "Bearer%20eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0ZkxKdVV4cVJoRWVHYjhTR1BTVzBGazQ0MTN0Wk94L1hweW5pelNNUXQ4Z0diNVZYc3o5TTBLYmUzNElzYm54IiwiZXhwIjoxNjg5NzA0MjU4LCJpYXQiOjE2ODk2MTc4NTh9.ksBqKhSYRlslEhiQETdKTD5X2d4buNMnAq7Mlj8hvC8",

  //     },
  //   });
  //   console.log("성공", response);
  //   } catch (error) {
  //   console.log("에러", error);
  //   }
  //   };


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
                    // handleChoiceSubmit();
                    navigate("/food/result")}}>{item.answer}</S.StButton>
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