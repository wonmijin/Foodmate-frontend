export type ChatroomType = {
  chatRoomId: number;
  chatRoomName: string;
  lastMessage: string;
  lastMessageTime: string;
  attendance: number;
  count: number;
  groupDate: string;
  chatMembers: {
    memberId: number;
    nickname: string;
    image: string;
  }[];
};
