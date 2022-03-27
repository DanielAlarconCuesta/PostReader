import React, { useState, useEffect } from "react";

import User from "../../interfaces/User";
import UserBox from "../UserBox/UserBox";
import UserBoxListProps from "../../interfaces/UserBoxListProps";

import { RootState } from "../../store";
import { UserBoxListActionType } from "../../actions/userBoxListActions";
import { useDispatch, useSelector  } from 'react-redux';

import "./UserBoxList.css";

function UserBoxList(userBoxListProps: UserBoxListProps) {

    const dispatch = useDispatch();
    const selectedUser: User | null = useSelector<RootState, User | null>((state) => state.userBoxList.selectedUser);
    const nameFilter: string = useSelector<RootState, string>((state) => state.toolBar.nameFilter);

    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        
        if (userBoxListProps.users) {
            setUsers(filterByName(userBoxListProps.users.slice(0)));

        } else {
            setUsers([]);
        }

    }, [userBoxListProps.users, nameFilter])

    useEffect(() => {
        
        if (!users || !users.length) {
            dispatch({
                type: UserBoxListActionType.SELECT_USER,
                payload: null
            });

        } else {
            dispatch({
                type: UserBoxListActionType.SELECT_USER,
                payload: userBoxListProps.users[0]
            });
        }

    }, [users])

    const filterByName = ((users: User[]): User[] => {
        
        if (!users) {
            return [];

        } else if (!nameFilter) {
            return users;
        }

        let filteredUsers:  User[] = users.filter((user: User) => {

            if (user.name.includes(nameFilter)) return true;
            else return false;
        })

        return filteredUsers;
    })

    const handleClickUser = (user: User) => {

        if (!selectedUser || selectedUser.id != user.id) {
            dispatch({
                type: UserBoxListActionType.SELECT_USER,
                payload: user
            });
        }
    }

    return (
        <div className="user-list-container">

            <div className="user-list-users">

                {users.map((user: User) => (
                    <UserBox
                        key={user.id}
                        className={selectedUser == user ? "user-container-active" : ""}
                        onClickHandler={(user: User) =>  handleClickUser(user)}
                        user={user}
                    />
                ))}

            </div>
        </div>
    )
}

export default UserBoxList;
