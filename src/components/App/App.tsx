import React, { useEffect } from "react";

import Login from '../Login/Login';

import Client from '../../interfaces/Client';

import { useDispatch, useSelector  } from 'react-redux';
import { RootState } from '../../store';

import PostsView from '../PostsView/PostsView';

import './App.css';

function App() {

	const dispatch = useDispatch();
	const client: Client | null = useSelector<RootState, Client | null>((state) => state.session.client);

	if (client) {
		return (
			<div className="app-posts-view">
				<PostsView />
			</div>
		
		)
	
	} else {
		return(
			<div className="app-login-container">
				<Login />
			</div>
		)
	}
}

export default App;
