import styled from "styled-components";
import { PostCardType } from "../../types/postCardType";
import { BsStar, BsStarFill } from "react-icons/bs";

interface PropsType {
    cardData: PostCardType;
}

export const PostCard = ({ cardData }: PropsType) => {
    return (
        <div>
            <PostCards>
                <RightAlign>
                    <div className="date">{cardData.date}</div>
                </RightAlign>
                <LeftAlign>
                    <div className="title">{cardData.title}</div>
                    <div className="sub-title">모임명</div>
                    <div className="input-text">{cardData.meetingName}</div>
                    <div className="sub-title">언제?</div>
                    <div className="input-text">{cardData.when}</div>
                    <div className="sub-title">어디서?</div>
                    <div className="input-text">{cardData.where}</div>
                </LeftAlign>
                <RightAlign>
                    <span className="participant">
                        {cardData.current}/{cardData.maximum}
                    </span>
                    명
                </RightAlign>
            </PostCards>
            <WriterInfo>
                <div className="photo">
                    <img src={cardData.imageUrl} />
                </div>
                <div className="status">
                    <div>{cardData.nickname}</div>
                    <div>
                        {cardData.participationStatus ? (
                            <Participated>
                                <BsStarFill /> 참여됨
                            </Participated>
                        ) : (
                            <NotParticipating>
                                <BsStar /> 참여하기
                            </NotParticipating>
                        )}
                    </div>
                </div>
            </WriterInfo>
        </div>
    );
};

const PostCards = styled.div`
    background-color: #f3f3f3;
    width: 100%;
    min-width: 160px;
    height: 250px;
    border-radius: 12px;
    padding: 18px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        background-color: #ededed;
    }

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const LeftAlign = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
        font-size: 14px;
        color: #000;
        font-weight: 600;
    }

    .sub-title {
        margin-top: 8px;
        color: #009a5f;
        font-weight: 600;
        font-size: 13px;
    }

    .input-text {
        font-size: 11px;
    }
`;

const RightAlign = styled.div`
    font-size: 1px;
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    .date {
        color: #999999;
    }

    .participant {
        font-weight: 600;
        font-size: 20px;
        padding: 0 4px;
    }
`;

const WriterInfo = styled.div`
    width: 100%;
    height: 70px;

    display: flex;
    align-items: center;
    gap: 8px;

    .photo {
        border: 1px solid #dbdbdb;
        border-radius: 50%;
        width: 45px;
        height: 45px;
        cursor: pointer;

        img {
            border-radius: 50%;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .status {
        font-size: 12px;
        cursor: pointer;

        &::first-line {
            font-weight: 600;
        }
    }
`;

const Participated = styled.div`
    color: ${(props) => props.theme.color.ORANGE};
    font-weight: 600;
`;
const NotParticipating = styled.div`
    color: #777777;
`;
