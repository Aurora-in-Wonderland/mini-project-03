import { styled } from "styled-components";

export const color = {
  white : "white",
  yellow : "#FFE27C",
  orange : "#E8B535",
  brown : "#E4DCCF",
  green : "#B5C268",
  nok : "#758650",
}

export const StContainer = styled.div`
  background: ${color.white};
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0 auto;
  max-width: 1200px;
  overflow: hidden;
`
export const StNav = styled.header`
  position: pixed;
  height: 50px;
  background: ${color.brown};
`
export const StFooter = styled.footer`
  position: fixed;
  bottom: 0;
  height: 50px;
  background: ${color.white};
`
export const StMain = styled.main`
  display: flex;
  margin: auto 0;
  height: 90vh;
  flex-direction: column;
  text-align: center;
  justify-content: space-around;
`
export const StRankContainer = styled.div`
  height: 40vw;
  max-height: 250px;
  border: 1px solid ${color.yellow};
`
export const StButton = styled.button`
  border-radius: 20px;
  cursor: pointer;
  font-size: 18px;
  min-width: 200px;
  padding: 10px;
  color: ${(p)=>p.color};
  border: 2px solid ${(p)=>p.color};
  background: ${(p)=>p.background};
`
export const StBtnGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
`