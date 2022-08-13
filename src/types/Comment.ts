import firebase from 'firebase'

export interface Comment {
    content: string,
    lastModified: firebase.firestore.Timestamp,
    upvoteArray: firebase.firestore.DocumentReference[],
    isReply: boolean,
    replyTo: firebase.firestore.DocumentReference | undefined,
    replies: [],
    author: string,
    authorId: string,
    postId: string,
    boardId: string,
}