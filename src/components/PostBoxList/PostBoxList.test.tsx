import React from 'react';
import { render } from '@testing-library/react';

import PostBoxList from './PostBoxList';
import PostBoxListProps from '../../interfaces/PostBoxListProps';
import Post from '../../interfaces/Post';

import { mockPosts } from '../../mockData/mockPost';

import { Provider } from 'react-redux'
import store from '../../store';

describe('PostBoxList component', () => {

	let posts: Post[];
	let postBoxListProps: PostBoxListProps;

	test('renders with data', () => {

		posts = mockPosts

		let postBoxListProps: PostBoxListProps = {
			posts: posts
		}

		render(
			<Provider store={store}>
				<PostBoxList {...postBoxListProps} />
			</Provider>
		);
	});

	test('renders without data', () => {
		postBoxListProps = {
			posts: null!
		}

		render(
			<Provider store={store}>
				<PostBoxList {...postBoxListProps} />
			</Provider>
		);

		postBoxListProps = {
			posts: []
		}

		render(
			<Provider store={store}>
				<PostBoxList {...postBoxListProps} />
			</Provider>
		);
	});
});
