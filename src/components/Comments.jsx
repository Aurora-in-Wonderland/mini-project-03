import { useState, useEffect } from "react";
import styled from "styled-components";
import { BsFillTrashFill, BsFillPenFill } from "react-icons/bs";
import axios from "axios";

const StComments = styled.div`
    /* width: 600px; */
    border: 1px solid black;
    padding: 20px;
    margin: 40px;
    input {
        width: 500px;
        height: 30px;
        background-color: #f0ebe3;
    }
    section {
        width: 600px;
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
`;

const StButton = styled.button`
    width: 80px;
    height: 40px;
    margin: 10px;
    background-color: #41613c;
    border: none;
    border-radius: 8px;
    color: #fff;
`;

export default function Comments() {
    const [contents, setContents] = useState([]);
    const [text, setText] = useState("");

    const accessToken = localStorage.getItem("accessToken");
    const foodId = localStorage.getItem("foodId");

    const getPost = async () => {
        try {
            const { data } = await axios.get(`http://1.244.223.183/api/food/${foodId}/comment`, {
                headers: {
                    accesstoken: accessToken,
                },
            });
            setContents(data);
            console.log("성공", data);
        } catch (error) {
            console.log("에러", error);
        }
    };

    const handleAddSubmit = async (event) => {
        event.preventDefault();
        if (text.trim().length === 0) return alert(" 입력하세요");
        try {
            const response = await axios.post(
                `http://1.244.223.183/api/food/${foodId}/comment`,
                {
                    content: text,
                },
                {
                    headers: {
                        accesstoken: accessToken,
                    },
                }
            );
            setText("");
            setContents([...contents, { content: text, commentId: "" }]);
            getPost();
            console.log("성공", response);
        } catch (error) {
            console.log("에러", error);
        }
    };

    const handleDeleted = async (commentId) => {
        try {
            const response = await axios.delete(`http://1.244.223.183/api/food/4/comment/${commentId}`, {
                headers: {
                    accesstoken: accessToken,
                },
            });
            setContents(
                contents.filter((item) => {
                    return item.commentId !== commentId;
                })
            );
            console.log("성공", response);
        } catch (error) {
            if (error.response.data.statusCode === 401) {
                alert("자기 자신의 댓글만 삭제할 수 있습니다.");
            }
            console.log("에러", error);
        }
    };

    const handleChange = (event) => {
        setText(event.target.value);
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
                {contents.map((item) => (
                    <section key={item.commentId}>
                        <p>{item.username}</p>
                        <p>{item.content}</p>
                        <div>
                            <button>
                                <BsFillPenFill />
                            </button>
                            <button>
                                <BsFillTrashFill onClick={() => handleDeleted(item.commentId)} />
                            </button>
                        </div>
                    </section>
                ))}
            </StComments>
        </>
    );
}
