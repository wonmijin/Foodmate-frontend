import styled from "styled-components";
import { BasicButton } from "../common/BasicButton";
import { CommentsList } from "./CommentsList";
import { commentsData } from "../../mocks/postCardData";

export const Comments = () => {
    return (
        <CommentsContainer>
            <div>
                <div className="photo">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4vHdExU4YJF6ejyLvoWb5Ojt1QcmM8d7BiXtalvKeQxvXRnTSampcNTMuciVrZzoazY&usqp=CAU" />
                </div>
                <textarea rows={4} placeholder="댓글을 입력하세요" />
            </div>
            <div className="submit-button">
                <BasicButton $fontSize="8px">등록</BasicButton>
            </div>
            <CommentsList commentsData={commentsData} />
        </CommentsContainer>
    );
};

const CommentsContainer = styled.div`
    margin: 50px auto;
    width: 50%;
    display: flex;
    flex-direction: column;

    & > div:first-child {
        display: flex;
    }

    .submit-button {
        display: flex;
        justify-content: flex-end;
        margin-top: 6px;
    }

    textarea {
        width: 100%;
        padding: 8px 12px;
        resize: none;
        border: none;
        border-radius: 12px;
        background-color: ${(props) => props.theme.color.LIGHT_GRAY};
        margin-left: 12px;
        font-size: 12px;
    }
`;
