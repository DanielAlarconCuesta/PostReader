import React, { useState } from "react";

import RegisterService from "../../services/RegisterService";
import RegisterRequest from "../../interfaces/RegisterRequest";
import RegisterResponse from "../../interfaces/RegisterResponse";

import { SessionActionType } from '../../actions/sessionActions';
import { useDispatch } from 'react-redux';

import "./Login.css";

function Login() {

    const dispatch = useDispatch();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const handleNameOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        let currentName: string = event?.currentTarget?.value || "";
        setName(currentName);
    }

    const handleEmailOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        let currentEmail: string = event?.currentTarget?.value || "";
        setEmail(currentEmail);
    }

    const submit = () => {

        if (!name) {
            alert("Name is required");
            return;
        }

        if (!email) {
            alert("Email is required");
            return;
        }

        let registerRequest: RegisterRequest = {
            client_id: "ju16a6m81mhid5ue1z3v2g0uh",
            name: name,
            email: email,
        };

        RegisterService.registerClient(registerRequest)
            .then((registerResponse: RegisterResponse) => {

                if (registerResponse.error) {
                    alert(registerResponse.error.message)

                } else if (registerResponse.data) {

                    dispatch({
                        type: SessionActionType.CREATE_SESSION,
                        payload: registerResponse.data
                    });

                } else {
                    alert("Client could not be signed up. Try again");
                }

            })
    }

    return (
        <div className="login-container">

            <div className="login-box">
                <div className="login-box-title">
                    <span>LOGIN</span>
                </div>

                <div className="login-box-name">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name"
                        value={name}
                        onChange={handleNameOnChange}
                    />
                </div>

                <div className="login-box-email">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email"
                        value={email}
                        onChange={handleEmailOnChange}
                    />
                </div>

                <div className="login-box-submit">
                    <button
                        onClick={submit}
                    >
                        GO
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Login;
