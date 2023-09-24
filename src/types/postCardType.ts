export interface PostCardType {
    id: number,
    date: string,
    title: string,
    meetingName: string,
    when: string,
    where: string,
    maximum: number,
    current: number,
    imageUrl: string,
    nickname: string,
    participationStatus: boolean,
}

export interface PostDetailInfoType {
        groupId: number,
        memberId: number,
        nickname : string,
        image : string,
        title: string,
        name: string,
        content: string,
        food: string,
        date: string,
        time: string,
        maximum: number,
        current: number,
        storeName: string,
        storeAddress: string,
        latitude: string,
        longitude: string,
        createdDate: string,
        chatRoomId : number,
}

export interface CommentsType {
    commentId: number,
    memberId: number,
    nickname : string,
    image : string,
    content: string,
    createdDate: string,
    replies?: ReplyType[]
}

export interface ReplyType {
    replyId: number,
    memberId: number,
    nickname : string,
    image : string,
    content: string,
    createdDate: string,
}