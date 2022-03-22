import Post from "./Post"

interface User {
    id: string,
    name: string,    
    posts?: Post[]
}

export default User;
