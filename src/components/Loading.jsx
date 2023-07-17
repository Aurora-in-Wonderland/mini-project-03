import React from "react";
import { PulseLoader } from "react-spinners";

import styled from "styled-components";

export const StBackground = styled.header`
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: #ffffff;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const StLoadingText = styled.div`
    text-align: center;
    font-size: 20px;
`;

export default function Loading() {
    return (
        <StBackground>
            <StLoadingText>잠시만 기다려 주세요.</StLoadingText>
            <PulseLoader color="#FFE27C" />
        </StBackground>
    );
}
