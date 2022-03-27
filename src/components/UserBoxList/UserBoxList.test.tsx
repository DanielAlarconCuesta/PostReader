import React from 'react';
import { render } from '@testing-library/react';

import UserBoxList from './UserBoxList';
import UserBoxListProps from '../../interfaces/UserBoxListProps';
import { mockUsers } from "../../mockData/mockUser";

import { Provider } from 'react-redux'
import store from '../../store';

describe('UserBoxList component', () => {

	let userBoxListProps: UserBoxListProps;

	test('renders with data', () => {

		userBoxListProps = {
			users: mockUsers
		}

		render(
			<Provider store={store}>
				<UserBoxList {...userBoxListProps} />
			</Provider>
		);
	});

	test('renders without data', () => {

		userBoxListProps = {
			users: null!
		}

		render(
			<Provider store={store}>
				<UserBoxList {...userBoxListProps} />
			</Provider>
		);

		userBoxListProps = {
			users: []
		}

		render(
			<Provider store={store}>
				<UserBoxList {...userBoxListProps} />
			</Provider>
		);
	});
})
