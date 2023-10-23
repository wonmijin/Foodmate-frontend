import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from '../common/Image';

interface MemberThumbnailProps {
  chatMembers: {
    memberId: number;
    nickname: string;
    image: string;
  }[];
}

const ThumbnailContainer = styled.div`
  width: 30px;
  height: 30px;
`;

const OneThumbnail = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  > img {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const TwoThumbnail = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  > img {
    width: 50%;
    height: 50%;
  }
`;

const ThreeThumbnail = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  > img {
    position: absolute;
    width: 60%;
    height: 60%;

    &:nth-child(1) {
      top: 0;
      left: 25%;
    }

    &:nth-child(2) {
      top: 40%;
      left: 0;
    }

    &:nth-child(3) {
      top: 40%;
      left: 40%;
    }
  }
`;

const FourThumbnail = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  > img {
    width: 100%;
    height: 100%;
  }
`;

const MemberThumbnail = ({ chatMembers }: MemberThumbnailProps) => {
  const [members, setMembers] = useState<
    {
      memberId: number;
      nickname: string;
      image: string;
    }[]
  >([]);

  useEffect(() => {
    setMembers(
      chatMembers.filter(
        (member) => member.memberId !== undefined && member.nickname !== undefined && member.image !== undefined,
      ),
    );
  }, [chatMembers]);

  return (
    <ThumbnailContainer>
      {members.length === 0 ? (
        <></>
      ) : members.length === 1 ? (
        <OneThumbnail>
          <Image
            imageKey={members[0].memberId.toString()}
            imageUrl={members[0].image}
            alt={members[0].nickname}
            tooltip={members[0].nickname}
          />
        </OneThumbnail>
      ) : members.length === 2 ? (
        <TwoThumbnail>
          <Image
            imageKey={members[0].memberId.toString()}
            imageUrl={members[0].image}
            alt={members[0].nickname}
            tooltip={members[0].nickname}
          />
          <Image
            imageKey={members[1].memberId.toString()}
            imageUrl={members[1].image}
            alt={members[1].nickname}
            tooltip={members[1].nickname}
          />
        </TwoThumbnail>
      ) : members.length === 3 ? (
        <ThreeThumbnail>
          <Image
            imageKey={members[0].memberId.toString()}
            imageUrl={members[0].image}
            alt={members[0].nickname}
            tooltip={members[0].nickname}
          />
          <Image
            imageKey={members[1].memberId.toString()}
            imageUrl={members[1].image}
            alt={members[1].nickname}
            tooltip={members[1].nickname}
          />
          <Image
            imageKey={members[2].memberId.toString()}
            imageUrl={members[2].image}
            alt={members[2].nickname}
            tooltip={members[2].nickname}
          />
        </ThreeThumbnail>
      ) : (
        <FourThumbnail>
          <Image
            imageKey={members[0].memberId.toString()}
            imageUrl={members[0].image}
            alt={members[0].nickname}
            tooltip={members[0].nickname}
          />
          <Image
            imageKey={members[1].memberId.toString()}
            imageUrl={members[1].image}
            alt={members[1].nickname}
            tooltip={members[1].nickname}
          />
          <Image
            imageKey={members[2].memberId.toString()}
            imageUrl={members[2].image}
            alt={members[2].nickname}
            tooltip={members[2].nickname}
          />
          <Image
            imageKey={members[3].memberId.toString()}
            imageUrl={members[3].image}
            alt={members[3].nickname}
            tooltip={members[3].nickname}
          />
        </FourThumbnail>
      )}
    </ThumbnailContainer>
  );
};

export default MemberThumbnail;
