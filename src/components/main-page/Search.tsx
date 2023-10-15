import styled from 'styled-components';
import mainBg from '../../assets/main-background.png';
import useDebounce from '../../hooks/useDebounce';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuickSearch } from '../../hooks/useQuickSearch';

const MainBg = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  background: center / cover no-repeat url(${mainBg});

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
    cursor: pointer;

    &:hover {
      background-color: #eee;
      font-weight: bold;
    }

    .item-text {
      display: inline-block;
      width: 200px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
      border-right: 1px solid #ccc;
      margin-right: 15px;
      padding-right: 5px;
    }
  }

  .item-list .item-text:last-child {
    border-right: none;
  }
`;

const SearchInput = styled.input`
  display: inline-block;
  padding: 14px;
  background-color: #f5f5f5;
  border: none;
  width: 98%;
  border-radius: 8px;

  &:focus {
    outline: none;
  }
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

const Skeleton = styled.img`
  width: 100%;
`;

type SearchItem = {
  groupId: number;
  postTitle: string;
  nickname: string;
  foodName: string;
};

export const Search = () => {
  const navigate = useNavigate();
  const [searchList, setSearchList] = useState<SearchItem[]>([]);
  const [searchKeyword, inputKeyword, setInputKeyword] = useDebounce<string>('', 500);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [isOnSkeleton, setIsOnSkeleton] = useState<boolean>(false);
  const [isOpenSearchPopup, setIsOpenSearchPopup] = useState<boolean>(false);
  const { data: searchData } = useQuickSearch(searchKeyword);

  useEffect(() => {
    setSelectedGroupId(null);
    if (searchData === undefined || searchData.content.length === 0) {
      setSearchList([]);
      setIsOpenSearchPopup(false);
      return;
    }

    const newSearchList: SearchItem[] = [];

    searchData.content.slice(0, 5).forEach((value) => {
      newSearchList.push({
        groupId: value.groupId,
        postTitle: value.title,
        nickname: value.nickname,
        foodName: value.food,
      });
    });

    setSearchList(newSearchList);
    setIsOnSkeleton(false);
  }, [searchData]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setIsOnSkeleton(false);
      setIsOpenSearchPopup(false);
    } else {
      setIsOnSkeleton(true);
      setIsOpenSearchPopup(true);
    }
    
    setInputKeyword(e.target.value);
  };

  const selectGroup = (item: SearchItem, e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const len = (e.currentTarget as Element).parentElement!.children.length;

    for (let i = 0; i < len; i++) {
      (e.currentTarget as Element).parentElement!.children.item(i)?.classList.remove('active');
    }
    (e.currentTarget as Element).classList.add('active');
    setSelectedGroupId(item.groupId);

    if (selectedGroupId !== null) navigate(`/findfoodmate/${selectedGroupId}`);
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
              autoFocus
              value={inputKeyword}
              onChange={onChange}
              placeholder="원하는 음식으로 활성화된 모임을 찾아보세요(ex. 🍕, 🍗, 🍷)"
            />
            {isOpenSearchPopup === false ? (
              ''
            ) : (
              <SearchPopup>
                {isOnSkeleton ? (
                  <Skeleton src="src/assets/skeleton.gif" />
                ) : (
                  <ul>
                    {searchList.map((item, index) => {
                      return (
                        <li key={index} className="item-list" onClick={(e) => selectGroup(item, e)}>
                          <span className="item-text">글제목:&nbsp;{item.postTitle}</span>
                          <span className="item-text">음식명:&nbsp;{item.foodName}</span>
                          <span className="item-text">모임장 닉네임:&nbsp;{item.nickname}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </SearchPopup>
            )}
          </SearchInputContainer>
        </MainSearchContainer>
      </MainContentsContainer>
    </MainBg>
  );
};
