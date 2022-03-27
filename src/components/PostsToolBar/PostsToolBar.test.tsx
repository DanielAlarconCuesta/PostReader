import React from 'react';
import { render } from '@testing-library/react';

import PostsToolBar from './PostsToolBar';

import { Provider } from 'react-redux'
import store from '../../store';

describe('PostToolBar component', () => {
	
	test('renders', () => {
		render(
		 	<Provider store={store}>
				<PostsToolBar />
			</Provider>
	 	);
 	});

});
