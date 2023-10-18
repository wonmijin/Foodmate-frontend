import { PostCard } from './PostCard';
import { AllPostCardType } from '../../types/postCardType';

export const PostCardsList = ({ groupsData }: { groupsData: AllPostCardType[] }) => {
  return <div>{groupsData?.map((card: AllPostCardType, idx: number) => <PostCard cardData={card} key={idx} />)}</div>;
};
