import styled from 'styled-components';
import { BasicButton } from '../common/BasicButton';
import { useEffect, useState } from 'react';
import { fetchCall } from '../../api/fetchCall';

export const CreateComment = ({ groupId }: { groupId: number }) => {
  const [content, setContent] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    (async () => {
      const info = await fetchCall('get', '/member');
      setProfileImage(info.image);
    })();
  }, []);

  const handleRegist = async () => {
    if (confirm('댓글을 등록할까요?')) {
      await fetchCall('post', `group/${groupId}/comment`, content);
      setContent('');
    } else {
      return;
    }
  };

  return (
    <CreateCommentContainer>
      <div>
        <div className="photo">
          <img src={profileImage} alt="프로필" />
        </div>
        <textarea
          value={content}
          rows={4}
          placeholder="댓글을 입력하세요"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="submit-button">
        <BasicButton $fontSize="10px" onClick={handleRegist}>
          등록
        </BasicButton>
      </div>
    </CreateCommentContainer>
  );
};

const CreateCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 0 auto;

  & > div:first-child {
    display: flex;
    align-items: center;
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
