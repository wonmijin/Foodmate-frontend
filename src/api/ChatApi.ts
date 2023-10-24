import axios from 'axios';
import { ChatroomType } from '../types/chatroomType';
import { ChatroomMessageType } from '../types/chatroomMessageType';
import { ACCESS_TOKEN, AUTHORIZATION } from '../constants/auth';

type Chatroom = {
  chatRoomId: number;
  chatRoomName: string;
  lastMessage: string;
  lastMessageTime: string;
  attendance: number;
  count: number;
};

type ChatroomInfo = {
  chatRoomId: number;
  chatRoomName: string;
  groupDate: string;
  attendance: number;
  chatMembers: [
    {
      memberId: number;
      nickname: string;
      image: string;
    },
  ];
};

const getChatroomInfo = async (chatroomId: number): Promise<ChatroomInfo> => {
  if (axios.defaults.headers.common[AUTHORIZATION] === undefined)
    axios.defaults.headers.common[AUTHORIZATION] = 'Bearer ' + sessionStorage.getItem(ACCESS_TOKEN);

  const { data } = await axios.get(`/api/chatroom/${chatroomId}`);
  return data;
};

export const getChatroomList = async (): Promise<ChatroomType[]> => {
  try {
    if (axios.defaults.headers.common[AUTHORIZATION] === undefined)
      axios.defaults.headers.common[AUTHORIZATION] = 'Bearer ' + sessionStorage.getItem(ACCESS_TOKEN);

    const chatroomAllInfoList: ChatroomType[] = [];
    const { data } = await axios.get(`/api/chatroom`, {});
    const chatroomList: Chatroom[] = data;
    const chatroomInfoPromise: Promise<ChatroomInfo>[] = [];

    for (let i = 0; i < chatroomList.length; i++) {
      chatroomInfoPromise[i] = getChatroomInfo(chatroomList[i].chatRoomId);
    }

    for (let i = 0; i < chatroomList.length; i++) {
      const chatroomInfo = await chatroomInfoPromise[i];

      chatroomAllInfoList.push({
        chatRoomId: chatroomList[i].chatRoomId,
        chatRoomName: chatroomList[i].chatRoomName,
        lastMessage: chatroomList[i].lastMessage,
        lastMessageTime: chatroomList[i].lastMessageTime,
        attendance: chatroomList[i].attendance,
        count: chatroomList[i].count,
        groupDate: chatroomInfo.groupDate,
        chatMembers: [...chatroomInfo.chatMembers],
      });
    }

    return chatroomAllInfoList;
  } catch (err) {
    return [];
  }
};

export const getChatroomMessage = async (chatroomId: number): Promise<ChatroomMessageType> => {
  if (axios.defaults.headers.common[AUTHORIZATION] === undefined)
    axios.defaults.headers.common[AUTHORIZATION] = 'Bearer ' + sessionStorage.getItem(ACCESS_TOKEN);

  const { data } = await axios.get(`/api/chatroom/${chatroomId}/message`);
  return data;
};
