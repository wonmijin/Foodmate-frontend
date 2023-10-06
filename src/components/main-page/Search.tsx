import styled from 'styled-components';
import mainbg from '../../assets/mainbg.png';
import { BasicButton } from '../common/BasicButton';
import { ImSearch } from 'react-icons/im';
import useDebounce from '../../hooks/useDebounce';
import { useEffect, useState } from 'react';
import { searchData } from '../../mocks/serchData';
import { useNavigate } from 'react-router-dom';

const MainBg = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  background: url(${mainbg}) no-repeat center;

  .bg-filter {
    width: 100%;
    height: calc(100vh - 60px);
    position: absolute;
    background-color: rgb(130, 130, 130, 0.5);
  }
`;

const MainText = styled.h2`
  color: #fff;
  font-size: 50px;
  width: 100%;
  text-align: center;
  > span {
    color: #ffe782;
  }
`;

const MainSearchContainer = styled.div`
  padding: 18px;
  background-color: #fff;
  border-radius: 8px;
  width: 50%;
  margin-top: 32px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
`;

const SearchInputContainer = styled.div`
  width: 100%;
  position: relative;
`;

const SearchPopup = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px 0px;
  border-radius: 8px;
  width: 98%;
  position: absolute;
  margin-top: 3px;
  padding: 7px 0;

  .item-list {
    display: flex;
    align-items: center;
    padding: 5px 24px 5px 16px;
    height: 40px;
    background-color: #fff;
    color: ${(props) => props.theme.color.BLACK};

    &:hover {
      background-color: #eee;
    }

    &.active {
      background-color: #ffcc0021;
      font-weight: bold;
    }

    .item-text {
      display: inline-block;
      width: 118px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
      border-right: 1px solid #ccc;
      margin-right: 15px;
      padding-right: 5px;
    }
  }
`;

const SearchInput = styled.input`
  display: inline-block;
  padding: 14px;
  background-color: #f5f5f5;
  border: none;
  width: 98%;
  border-radius: 8px;
`;

const MainContentsContainer = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Shortcuts = styled.div`
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
  .iconDiv {
    margin-right: 10px;
    font-size: 12px;
  }
`;

const Skeleton = styled.img`
  width: 100%;
`;

type SearchItem = {
  groupId: number;
  postTitle: string;
  groupName: string;
  foodName: string;
};

export const Search = () => {
  const navigate = useNavigate();
  const [searchList, setSearchList] = useState<SearchItem[]>([]);
  const [searchKeyword, inputKeyword, setInputKeyword] = useDebounce<string>('', 500);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [isOnSkeleton, setIsOnSkeleton] = useState<boolean>(false);

  useEffect(() => {
    setSelectedGroupId(null);
    if (searchKeyword.length === 0) {
      setSearchList([]);
      return;
    }

    const newSearchList: SearchItem[] = [];

    searchData[0].list2.slice(0, 5).forEach((value) => {
      newSearchList.push({
        groupId: value.groupId,
        postTitle: value.title,
        groupName: value.name,
        foodName: value.food,
      });
    });

    setSearchList(newSearchList);
    setIsOnSkeleton(false);
  }, [searchKeyword]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOnSkeleton(true);
    setInputKeyword(e.target.value);
  };

  return (
    <MainBg>
      <div className="bg-filter"></div>
      <MainContentsContainer>
        <MainText>
          당신의 <span>Food Mate</span>를 찾아보세요
        </MainText>
        <MainSearchContainer>
          <SearchInputContainer>
            <SearchInput
              value={inputKeyword}
              onChange={onChange}
              placeholder="원하는 음식으로 활성화된 모임을 찾아보세요(ex. 🍕, 🍗, 🍷)"
            />
            {searchList.length === 0 ? (
              ''
            ) : (
              <SearchPopup>
                {isOnSkeleton ? (
                  <Skeleton src="src/assets/skeleton.gif" />
                ) : (
                  <ul>
                    {searchList.map((item) => {
                      return (
                        <li
                          className="item-list"
                          onClick={(e) => {
                            const len = (e.currentTarget as Element).parentElement!.children.length;

                            for (let i = 0; i < len; i++) {
                              (e.currentTarget as Element).parentElement!.children.item(i)?.classList.remove('active');
                            }
                            (e.currentTarget as Element).classList.add('active');

                            setSelectedGroupId(item.groupId);
                          }}
                        >
                          글제목:&nbsp;
                          <span className="item-text">{item.postTitle}</span>
                          모임명:&nbsp;
                          <span className="item-text">{item.groupName}</span>
                          음식명:&nbsp; <span> {item.foodName}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </SearchPopup>
            )}
          </SearchInputContainer>
          <BasicButton
            onClick={() => {
              if (selectedGroupId !== null) navigate(`/findfoodmate/${selectedGroupId}`);
            }}
            $fontSize={'16px'}
            $fontColor="#fff"
            $backgdColor={'#f96223'}
            $hoverBackgdColor={'#fb8958'}
          >
            <Shortcuts>
              <div className="iconDiv">
                <ImSearch />
              </div>
              모임 바로가기
            </Shortcuts>
          </BasicButton>
        </MainSearchContainer>
      </MainContentsContainer>
    </MainBg>
  );
};
