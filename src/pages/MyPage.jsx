import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import ProfilePicture from "../image/ProfilePicture.png";
import { useNavigate } from "react-router-dom";
import imageCompression from 'browser-image-compression';
import axios from "axios";
import api from "../axios/api";
import FormData from "form-data";

// const api = axios.create({
//     // baseURL: process.env.REACT_APP_SERVER_URL,
//     baseURL: "http://1.244.223.183",
// });

const DEFAULT_PROFILE_IMAGE = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";


const getImgUpload = async (image) => {
    const resizingBlob = await imageCompression(image, { maxWidthOrHeight: 600 });
    const resizingFile = new File([resizingBlob], image.name, { type: image.type });
    return resizingFile;
};

export default function MyPage() {
    const [image, setImage] = useState(ProfilePicture);
    const [upimageBoolean, setupimageBoolean] = useState(false);
    const [file, setFile] = useState("");
    const [isData, setIsData] = useState("");
    const [lists, setLists] = useState("");
    const [TextField, setTextField] = useState("");
    const fileInput = useRef(null);
    const [wait, setWait] = useState(true);
    const navigate = useNavigate();

    const onChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            setupimageBoolean(true);
        } else {
            //업로드 취소할 시
            setImage(DEFAULT_PROFILE_IMAGE);
            setupimageBoolean(false);
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

    const SetMyPage = (response) => {
        setIsData(response.data);
        setTextField(response.data.introduce);
        const List = [...response.data.myLike];
        List.forEach((e) => {
            e.onLoad = false;
        });
        response.data.profileImage === null ? setImage(DEFAULT_PROFILE_IMAGE) : setImage(response.data.profileImage);
        setLists(List);
        setWait(false);
    };

    const getMyPage = async () => {
        try {
            const response = await api.get(`/api/account/introduce`);
            SetMyPage(response);
            console.log("성공", response);
        } catch (error) {
            try {
                const refreshToken = localStorage.getItem("authorizationToken");
                if (refreshToken === null) document.location.href = "/";
                const headers = {
                    Authorization: refreshToken,
                };
                const response = await api.get(`/api/account/introduce`, { headers: headers });
                SetMyPage(response);
            } catch (error) {
                console.log(error);
                if (error.response.data.refreshValidationError) {
                    localStorage.removeItem("authorizationToken");
                    document.location.href = "/login";
                }
            }
        }
    };
    const setMyPage = async () => {
        try {
            let ImageUrl = null;
            if (upimageBoolean) {
                const resizeFile = getImgUpload(file);
                const form = new FormData();
                form.append("image", resizeFile);

                const imageResponse = await axios.post("https://api.imgbb.com/1/upload", form, {
                    params: {
                        key: "66c373ad4a23ed26f9071e0e10803cfd",
                    },
                });

                console.log(imageResponse.data.data.display_url);
                ImageUrl = imageResponse.data.data.display_url;
            }
            const payload = {
                introduce: TextField,
                profileImage: ImageUrl,
            };
            const response = await api.patch(`/api/account/introduce`, payload);
            console.log(response);
            SetMyPage(response);
        } catch (error) {
            console.log(error);
        }
    };

    const textFieldHandler = (event) => {
        setTextField(event.target.value);
        console.log(event.target.value);
    };

    useEffect(() => {
        getMyPage();
    }, []);

    if (wait) {
        return <div></div>;
    }
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
                            <p>ID: {isData.username}</p>
                            <p>Username: {isData.address}</p>
                            {isData.introduce === null ? (
                                <textarea
                                    placeholder="자기소개를 입력해주세요"
                                    className="introduction"
                                    name="memberDescription"
                                    style={{ resize: "none" }}
                                />
                            ) : (
                                <textarea
                                    placeholder="자기소개를 입력해주세요"
                                    className="introduction"
                                    name="memberDescription"
                                    value={TextField}
                                    onChange={textFieldHandler}
                                    style={{ resize: "none" }}
                                />
                            )}
                            <button onClick={setMyPage}>수정하기</button>
                        </StData>
                    </StProfile>
                </StContainer>
                <StLikeContainer>
                    <StLikeTitle>관심 음식😋</StLikeTitle>
                    <StLikeWrapper>
                        {lists.map((item) => (
                            <section
                                key={item.id}
                                // onClick={}
                            >
                                <img
                                    src={item.imageUrl}
                                    alt="추천 메뉴"
                                />
                                <p>{item.name}</p>
                            </section>
                        ))}
                    </StLikeWrapper>
                </StLikeContainer>
            </StBack>
        </>
    );
}

const StBack = styled.div`
    background-color: #f0ebe3;
    padding: 30px;
    @media (max-width: 768px) {
        width: 100%;
    }
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
    @media (max-width: 768px) {
        width: 100%;
        padding: 0;
        h1 {
            font-size: 25px;
        }
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
