import React from 'react';
import { render } from '@testing-library/react';

import UserBox from './UserBox';
import UserBoxProps from '../../interfaces/UserBoxProps';
import { mockUsers } from "../../mockData/mockUser";

import { Provider } from 'react-redux'
import store from '../../store';

describe('UserBox component', () => {

	let userBoxProps: UserBoxProps;

	test('renders with data', () => {

		userBoxProps = {
			user: mockUsers[0]
		}
	
		   render(
			<Provider store={store}>
				<UserBox {...userBoxProps} />
			</Provider>
		);
	});

	test('renders without data', () => {

		userBoxProps = {
			user: null!
		}
	
		   render(
			<Provider store={store}>
				<UserBox {...userBoxProps} />
			</Provider>
		);
	});

});
