import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import ProfilePicture from "../image/ProfilePicture.png";
import { useNavigate, Link } from "react-router-dom";
import imageCompression from "browser-image-compression";
import axios from "axios";
import api from "../axios/api";
import FormData from "form-data";

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
            console.log("실패", error);
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
                            <div>
                                <button onClick={setMyPage}>수정하기</button>
                            </div>
                        </StData>
                    </StProfile>
                </StContainer>
                <StLikeContainer>
                    <StLikeTitle>관심 음식😋</StLikeTitle>
                    <div>
                        <StLikeWrapper>
                            {lists.map((item) => (
                                <section
                                    key={item.id}
                                    onClick={() => {
                                        localStorage.setItem("foodId", item.id);
                                        localStorage.setItem("foodName", item.name);
                                        localStorage.setItem("imageUrl", item.imageUrl);
                                        navigate(`/food/${item.id}/comment`);
                                    }}
                                >
                                    <img
                                        src={item.imageUrl}
                                        alt="추천 메뉴"
                                    />
                                    <p>{item.name}</p>
                                </section>
                            ))}
                        </StLikeWrapper>
                    </div>
                </StLikeContainer>
            </StBack>
        </>
    );
}

const StBack = styled.div`
    width: 100%;
    background-color: #f0ebe3;
    padding: 30px;
    @media (max-width: 768px) {
        width: 100%;
        padding: 0;
    }
`;
const StContainer = styled.div`
    width: 70%;
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
        width: 60%;
    }
`;

const StProfile = styled.div`
    display: flex;
    flex-direction: row;

    button {
        width: 100px;
        height: 50px;
        color: #fff;
        background-color: #41613c;
        font-size: 15px;
        font-weight: bold;
        border: none;
        border-radius: 8px;
        margin-left: 70%;
        cursor: pointer;
        &:hover {
            color: #fff;
            background-color: #374a34;
        }
    }
    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        button {
            width: 10rem;
            margin: 10% 25%;
        }
    }
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
        width: 24rem;
        height: 40%;
    }

    @media (max-width: 768px) {
        textarea {
            width: 60vw;
        }
    }
`;

const StLikeContainer = styled.div`
    width: 70%;
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
    @media (max-width: 768px) {
        width: 60%;

        div {
            overflow-y: scroll;
            overflow-x: hidden;
        }
    }
`;

const StLikeTitle = styled.h1`
    font-size: 25px;
    padding-bottom: 30px;
    @media (max-width: 768px) {
        text-align: center;
    }
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

    @media (max-width: 768px) {
        section {
            width: 100%;
        }
    }
`;
