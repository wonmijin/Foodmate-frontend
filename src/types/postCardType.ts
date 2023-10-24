export interface AllPostCardType {
  groupId: number;
  memberId: number;
  nickname: string;
  image: string;
  title: string;
  name: string;
  food: string;
  date: string;
  time: string;
  maximum: number;
  current: number;
  storeName: string;
  storeAddress: string;
  createdDate: string;
}

export interface PostCardType {
  groupId: number;
  memberId: number;
  nickname: string;
  image: string;
  title: string;
  name: string;
  content: string;
  food: string;
  date: string;
  time: string;
  maximum: number;
  current: number;
  storeName: string;
  storeAddress: string;
  latitude: string;
  longitude: string;
  createdDate: string;
  chatRoomId: number;
}

export interface CommentsType {
  commentId: number;
  content: string;
  createdDate: string;
  image: string;
  memberId: number;
  nickname: string;
  replies?: ReplyType[];
  updatedDate: string;
}

export interface ReplyType {
  content: string;
  createdDate: string;
  image: string;
  memberId: number;
  nickname: string;
  replyId: number;
  updatedDate: string;
}

export interface CreateGroupType {
  title: string;
  name: string;
  content: string;
  food: string;
  date: string;
  time: Date;
  maximum: number;
  storeName: string;
  storeAddress: string;
  latitude: string;
  longitude: string;
}

export interface ModifyGroupType extends CreateGroupType {
  groupId: number;
}

export interface MeetingRequestDataType {
  enrollmentId: number;
  groupId: number;
  memberId: number;
  nickname: string;
  image: string;
  title: string;
  name: string;
  food: string;
  foodGroupGroupDateTime: string;
  maximum: number;
  storeName: string;
  storeAddress: string;
}

export interface MeetingInfoDataType {
  id: number;
  foodGroupId: number;
  foodGroupMemberImage: string;
  foodGroupTitle: string;
  foodGroupName: string;
  foodGroupFoodType: string;
  foodGroupGroupDateTime: string;
  foodGroupMaximum: number;
  foodGroupStoreName: string;
  foodGroupStoreAddress: string;
  status: string;
}
