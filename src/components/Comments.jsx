import { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../axios/api";
import InputForm from "./InputForm";

export default function Comments({ setLike }) {
    const [contents, setContents] = useState([]);
    const [text, setText] = useState("");
    const [comment, setComment] = useState("");

    const foodId = localStorage.getItem("foodId");
    const MyName = localStorage.getItem("username");

    const CommentRedirect = (data) => {
        console.log(MyName);
        data.forEach((event) => {
            event.isMine = MyName === event.username ? true : false;
            event.isModified = false;
        });
        setContents(data);
    };

    const getPost = async () => {
        try {
            const response = await api.get(`/api/food/${foodId}/comment`);
            const { userLike, data } = response.data;
            console.log(data);
            setLike(userLike ? 1 : 0);
            CommentRedirect(data);
            console.log("성공", response);
        } catch (error) {
            console.log("에러", error);
        }
    };

    const handleAddSubmit = async (event) => {
        event.preventDefault();
        if (text.trim().length === 0) return alert("내용을 입력해주세요");
        try {
            const response = await api.post(`/api/food/${foodId}/comment`, {
                content: text,
            });
            setText("");
            console.log(response.data);
            CommentRedirect(response.data);
            console.log("성공", response);
        } catch (error) {
            console.log("에러", error);
        }
    };

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const commentChangeHandler = (event) => {
        setComment(event.target.value);
    };

    const textModifiedHandler = async (event, index, id) => {
        if (!contents[index].isModified) {
            contents[index].isModified = true;
            setComment(contents[index].content);
        } else {
            const payload = {
                content: comment,
            };
            try {
                const res = await api.patch(`/api/food/${foodId}/comment/${id}`, payload);
                console.log(res);
                contents[index].content = res.data[0].content;
                contents[index].isModified = false;
                const change = [...contents];
                // 주소값이 바뀌지 않으니 임시로 넘겨줌.
                setContents(change);
            } catch (error) {
                console.log(error);
            }
        }
        const change = [...contents];
        setContents(change);
    };

    useEffect(() => {
        getPost();
    }, []);

    return (
        <>
            <StComments>
                <form onSubmit={handleAddSubmit}>
                    <input
                        type="text"
                        placeholder="댓글을 입력해주세요."
                        value={text}
                        onChange={handleChange}
                    />
                    <StButton>입력</StButton>
                </form>
                <div
                    style={{
                        overflowY: "scroll",
                        overflowX: "hidden",
                        height: "200px",
                    }}
                >
                    {contents.map((item, index) => (
                        <section key={item.commentId}>
                            <p>{item.username}</p>
                            <InputForm
                                contents={contents}
                                item={item}
                                isMine={item.isMine}
                                foodId={foodId}
                                index={index}
                                setContents={setContents}
                            />
                        </section>
                    ))}
                </div>
            </StComments>
        </>
    );
}

const StComments = styled.div`
    width: 80%;
    border: 1px solid black;
    padding: 20px;
    margin: 40px;

    form {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0;
    }

    input {
        width: 80%;
        height: 30px;
        background-color: #f0ebe3;
    }

    section {
        width: 100%;
        height: 30px;
        background-color: #f0ebe3;
        margin: 5px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        p:first-child {
            width: 120px;
        }
        p {
            width: 420px;
        }
    }

    @media (max-width: 1024px) {
        input {
            width: 80%;
        }
    }
    @media (max-width: 768px) {
        input {
            width: 75%;
        }
    }
`;

const StButton = styled.button`
    width: 80px;
    height: 40px;
    background-color: #41613c;
    border: none;
    border-radius: 8px;
    color: #fff;
`;
