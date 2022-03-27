import User from "./User";

interface UserResponse {
    users?: User[],
    error?: Error
}

export default UserResponse;
