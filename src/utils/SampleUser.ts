import { FirebaseUser } from "../types/FirebaseUser";

export const SampleUser: FirebaseUser = {
    username: "",
    email: '',
    verificationFile: undefined,
    isVerified: false,
    role: "User", // User, Undergraduate, Graduate, Admin
    enrolledYear: "",
    major: "",
    faculty: "",
    profilePictureURL: "",
    userId: "userId",
}