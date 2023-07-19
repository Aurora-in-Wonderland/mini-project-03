import { useState, useEffect } from "react";
import { BsFillPenFill, BsFillTrashFill } from "react-icons/bs";
import api from "../axios/api";

export default function InputForm({ contents, item, foodId, isMine, index, setContents }) {
    const [comment, setComment] = useState(item.content);
    const [modified, setModified] = useState(false);

    useEffect(() => {
        setComment(item.content);
    }, []);
    const commentChangeHandler = (event) => {
        setComment(event.target.value);
    };


    const handleDeleted = async (event) => {
        try {
            const response = await api.delete(`/api/food/${foodId}/comment/${item.commentId}`);
            setContents(
                contents.filter((element) => {
                    return element.commentId !== item.commentId;
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

    const ButtonHandler = async (event, index) => {
        console.log(modified);
        if (!modified) {
            setModified(true);
        } else {
            const payload = {
                content: comment,
            };
            try {
                const res = await api.patch(`/api/food/${foodId}/comment/${item.commentId}`, payload);
                console.log(res);
                contents[index].content = res.data[0].content;
                contents[index].isModified = false;
                setModified(false);
                const change = [...contents];
                // 주소값이 바뀌지 않으니 임시로 넘겨줌.
                setContents(change);
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <>
            {
                modified ? (
                    <>
                        <input
                            style={{
                                width: "68.5%",
                            }}
                            value={comment}
                            onChange={commentChangeHandler}
                        />
                        {isMine ? <button onClick={(e) => ButtonHandler(e, index)}>✔️</button> : ""}
                    </>
                ) : (
                    <>
                        <p>{comment}</p>
                        {isMine ? (
                            <>
                                {modified ? (
                                    ""
                                ) : (
                                    <button onClick={(e) => ButtonHandler(e, index)}>
                                        <BsFillPenFill />
                                    </button>
                                )}
                                <button onClick={(e) => handleDeleted(e)}>
                                    <BsFillTrashFill />
                                </button>
                            </>
                        ) : (
                            ""
                        )}
                    </>
                )
                //(e) => textModifiedHandler(e, index, item.commentId)
            }
        </>
    );
}
