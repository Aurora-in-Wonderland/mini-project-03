import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { StButton, StButtonGroup, StTitle, StPageCount, Stcontainer } from './Questions';

function Question() {
  const navigate = useNavigate();
  return (
    <Stcontainer>
      <div>
          <div>
            <StTitle>지금 땡기는 음식은?</StTitle>
            <StButtonGroup>
              <StButton onClick={()=> {
                localStorage.setItem('salty',false);
                navigate("0")}}>단</StButton>
              <StButton onClick={()=> {
                localStorage.setItem('salty',true);
                navigate("0")}}>짠</StButton>
            </StButtonGroup>
            <StPageCount>1 / 5</StPageCount>
          </div>
      </div>
    </Stcontainer>
  )
}
export default Question;

