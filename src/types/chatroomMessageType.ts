export type ChatroomMessageType = {
  loginMemberId: number;
  chatRoomMessageResponses: MessageType[];
};

export type MessageType = {
  memberId: number;
  nickname: string;
  image: string;
  content: string;
  createdDate: string;
};
