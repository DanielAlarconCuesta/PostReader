import User from "./User";

interface UserBoxProps {
    style?: React.CSSProperties,
    className?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    onClickHandler?: any,
    user: User
}

export default UserBoxProps;
