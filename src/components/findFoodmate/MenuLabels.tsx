import { useState } from "react";
import styled from "styled-components";
import { MenuLabel } from "../common/MenuLabel";
import { AiFillCloseCircle } from "react-icons/ai";
import { LabelColorType } from "../../types/menuType";

interface MenuLabelsPropsType {
    handleMenuLabelModal: (bool: boolean) => void;
}

export const MenuLabels = ({ handleMenuLabelModal }: MenuLabelsPropsType) => {
    const [selectedMenus, setSelectedMenus] = useState<string[]>([]);

    const lebelsColor: LabelColorType[] = [
        {
            menu: "족발·보쌈",
            color: "#B9693C",
        },
        {
            menu: "찜·탕·찌개",
            color: "#3C67B9",
        },
        {
            menu: "돈까스·회·일식",
            color: "#3CB9B9",
        },
        {
            menu: "피자",
            color: "#643CB9",
        },
        {
            menu: "고기·구이",
            color: "#B99D3C",
        },
        {
            menu: "양식",
            color: "#8C1C1C",
        },
        {
            menu: "치킨",
            color: "#9DC307",
        },
        {
            menu: "중식",
            color: "#505050",
        },
        {
            menu: "아시안",
            color: "#FFA800",
        },
        {
            menu: "백반·죽·국수",
            color: "#41B9ED",
        },
        {
            menu: "도시락",
            color: "#79B93C",
        },
        {
            menu: "분식",
            color: "#FF8F8F",
        },
        {
            menu: "카페·디저트",
            color: "#902679",
        },
        {
            menu: "패스트푸드",
            color: "#E63B3B",
        },
    ];

    const handleLabels = (menu: string) => {
        const updatedSelectedMenus = selectedMenus.includes(menu)
            ? selectedMenus.filter((selectedMenu) => selectedMenu !== menu)
            : [...selectedMenus, menu];
        setSelectedMenus(updatedSelectedMenus);
    };

    return (
        <MenuLabelsContainer>
            {lebelsColor.map((item, idx) => {
                const isSelected = selectedMenus.includes(item.menu);

                return (
                    <MenuLabel
                        $menuColor={item.color}
                        key={idx}
                        onClick={() => handleLabels(item.menu)}
                        $isSelected={isSelected}
                    >
                        {item.menu}
                    </MenuLabel>
                );
            })}
            <div
                className="close-button"
                onClick={() => handleMenuLabelModal(false)}
            >
                <AiFillCloseCircle />
            </div>
        </MenuLabelsContainer>
    );
};

const MenuLabelsContainer = styled.div`
    font-size: 12px;
    border: 1px solid #c0c0c0;
    border-radius: 12px;
    width: 650px;
    padding: 30px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;

    .close-button {
        font-size: 22px;
        color: ${(props) => props.theme.color.ORANGE}90;
        position: absolute;
        top: 3px;
        right: 6px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
            color: ${(props) => props.theme.color.ORANGE};
        }
    }
`;
