import firebase from 'firebase'

export interface Post {
    postId: string,
    title: string,
    content: string,
    isAnnouncement: boolean,
    isAnonymous: boolean,
    isPinned: boolean,
    isHidden: boolean,
    isEvent?: boolean | undefined,
    lastModified: firebase.firestore.Timestamp,
    upvoteArray: firebase.firestore.DocumentReference[],
    numComments: number,
    permissions: string[],
    author: string,
    parentBoardId: string,
    parentBoardTitle: string,
    parentColor: string,
    parentTextColor: string
}