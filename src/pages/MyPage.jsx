import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import ProfilePicture from "../image/ProfilePicture.png";
import api from "../axios/api";

export default function MyPage() {
    const [image, setImage] = useState(ProfilePicture);
    const [file, setFile] = useState("");
    const [data, setData] = useState("");
    const fileInput = useRef(null);

    const onChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        } else {
            //업로드 취소할 시
            setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
            return;
        }

        //화면에 프로필 사진 표시
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const getMyPage = async () => {
        try {
            const response = await api.get(`/api/user/introduce`);
            console.log("성공", response);
        } catch (error) {
            console.log("에러", error);
        }
    };
    useEffect(() => {
        getMyPage();
    }, []);

    // useEffect(() => {
    //     const getMyPage = async () => {
    //         try {
    //             const response = await api.get(`/api/user/introduce`);
    //             console.log("성공", response);
    //         } catch (error) {
    //             console.log("에러", error);
    //         }
    //     };
    //     getMyPage();
    // }, []);

    // 둘 다 엑세스 토큰이 없을 때(리프레시토큰 확인차) 무한 렌더링 일어납니다.

    return (
        <>
            <StBack>
                <StContainer>
                    <StLikeTitle>회원정보</StLikeTitle>
                    <StProfile>
                        <>
                            <img
                                src={image}
                                onClick={() => {
                                    fileInput.current.click();
                                }}
                                alt="프로필 이미지"
                            />
                            <input
                                type="file"
                                style={{ display: "none" }}
                                accept="image/jpg,impge/png,image/jpeg"
                                name="profile_img"
                                onChange={onChange}
                                ref={fileInput}
                            />
                        </>
                        <StData>
                            <p>ID: </p>
                            <p>Username:</p>
                            <textarea
                                placeholder="자기소개를 입력해주세요"
                                className="introduction"
                                name="memberDescription"
                                style={{ resize: "none" }}
                            />
                        </StData>
                    </StProfile>
                </StContainer>
                <StLikeContainer>
                    <StLikeTitle>관심 음식😋</StLikeTitle>
                    <StLikeWrapper>
                        <section>
                            <img
                                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
                                alt="음식내역"
                            />
                            <p>음식 이름</p>
                        </section>
                    </StLikeWrapper>
                </StLikeContainer>
            </StBack>
        </>
    );
}

const StBack = styled.div`
    background-color: #f0ebe3;
    height: 1000px;
    padding: 30px;
`;
const StContainer = styled.div`
    width: 1000px;
    margin: auto;
    margin-top: 7%;
    margin-bottom: 7%;
    padding: 50px;
    border: 3px solid #41613c;
    border-radius: 20px;

    img {
        width: 200px;
        height: 200px;
        border-radius: 100%;
        margin: 20px;
    }
`;

const StProfile = styled.div`
    display: flex;
    flex-direction: row;
`;

const StData = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
        margin: 10px 40px;
    }
    textarea {
        margin: 10px 40px;
        width: 400px;
        height: 100px;
    }
`;

const StLikeContainer = styled.div`
    width: 1000px;
    max-height: 490px;
    margin: auto;
    margin-top: 7%;
    margin-bottom: 7%;
    padding: 50px;
    border: 3px solid #41613c;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const StLikeTitle = styled.h1`
    font-size: 25px;
    padding-bottom: 30px;
`;

const StLikeWrapper = styled.div`
    gap: 20px;
    display: flex;
    flex-wrap: wrap;
    section {
        width: 150px;
        text-align: center;
        background-color: rgba(65, 97, 60, 0.2);
        border-radius: 10px;
        margin-bottom: 10px;
        padding: 25px 15px;
    }
    img {
        width: 120px;
        height: 120px;
        border-radius: 100%;
        margin-bottom: 20px;
        border: 2px solid white;
    }
`;
