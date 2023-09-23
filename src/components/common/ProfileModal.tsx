import styled from "styled-components";
import { UserInfoType } from "../../types/userInfoType";
import { GoHeart } from "react-icons/go";
import { BasicButton } from "./BasicButton";
import { MenuLabel } from "./MenuLabel";
import { LABELCOLOR } from "../../constants/menu";

export const ProfileModal = ({ userInfo }: { userInfo: UserInfoType }) => {
    const favoriteFoods = LABELCOLOR.filter((item) =>
        userInfo.food.includes(item.menu)
    );

    return (
        <ProfileModalContainer>
            <Modal>
                <div className="photo">
                    <img src={userInfo.image} alt="프로필사진" />
                </div>
                <div className="like-box">
                    <span className="icon">
                        <GoHeart />
                    </span>
                    <span className="like">{userInfo.like}</span>
                </div>
                <div className="nickname-email-wrap">
                    <div>{userInfo.nickname}</div>
                    <div>{userInfo.email}</div>
                </div>

                <div className="menu-labels">
                    {favoriteFoods.map((food) => {
                        return (
                            <MenuLabel
                                $menuColor={food.color}
                                $isSelected={true}
                            >
                                {food.menu}
                            </MenuLabel>
                        );
                    })}
                </div>
                <div className="buttons-wrap">
                    <BasicButton $fontSize="12px" $fontColor="#fff">
                        1:1 대화 요청
                    </BasicButton>
                    <BasicButton
                        $fontSize="12px"
                        $backgdColor="#c0c0c0"
                        $hoverBackgdColor="#a1a1a1"
                        $fontColor="#fff"
                    >
                        닫기
                    </BasicButton>
                </div>
            </Modal>
        </ProfileModalContainer>
    );
};

const ProfileModalContainer = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const Modal = styled.div`
    width: 350px;
    height: fit-content;
    border-radius: 12px;
    padding: 24px;
    background-color: #f5f5f5;
    position: relative;

    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: center;

    .photo {
        border: 1px solid #dbdbdb;
        border-radius: 50%;
        width: 120px;
        height: 120px;
        cursor: pointer;

        img {
            border-radius: 50%;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .like-box {
        display: flex;
        gap: 4px;

        .icon {
            font-size: 25px;
            color: #e30000;
        }

        .like {
            font-size: 22px;
            font-weight: 600;
        }
    }

    .nickname-email-wrap {
        text-align: center;

        & > div:first-child {
            font-weight: 900;
        }

        & > div:last-child {
            font-size: 12px;
            color: #858585;
        }
    }

    .menu-labels {
        scale: 0.9;
        display: flex;
        gap: 4px;
        margin: 12px;
    }

    .buttons-wrap {
        display: flex;
        width: 100%;
        button {
            width: 100%;
            margin: 12px 4px 0 4px;
        }
    }
`;
