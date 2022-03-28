import React from 'react';
import { render } from '@testing-library/react';

import PostsView from './PostsView';

import { Provider } from 'react-redux'
import store from '../../store';

describe('PostsView component', () => {

	jest.spyOn(window, "alert").mockImplementation(() => {});

	test('renders', () => {
		render(
			<Provider store={store}>
				<PostsView />
			</Provider>
		);
	});
	
});
