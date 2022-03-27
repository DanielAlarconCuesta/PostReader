import React from 'react';
import { render } from '@testing-library/react';

import Login from './Login';

import { Provider } from 'react-redux'
import store from '../../store';

describe('Login component', () => {

	test('renders', () => {
		render(
		 	<Provider store={store}>
				<Login />
			</Provider>
	 	);
 	});

});
