import React from 'react';
import { render } from '@testing-library/react';

import Post from '../../interfaces/Post';
import PostBox from './PostBox';
import PostBoxProps from '../../interfaces/PostBoxProps';

import { mockPosts } from '../../mockData/mockPost';

import { Provider } from 'react-redux'
import store from '../../store';

describe('PostBox components', () => {
    
    let post: Post;

    test('renders with data', () => {

        post = mockPosts[0];
    
        let postBoxProps: PostBoxProps = {
            post: post
        };
    
        render(
            <Provider store={store}>
                <PostBox {...postBoxProps} />
            </Provider>
        );
    });

    test('renders without data', () => {

        let postBoxProps: PostBoxProps = {
            post: null!
        };
    
        render(
            <Provider store={store}>
                <PostBox {...postBoxProps} />
            </Provider>
        );
    });
    
});
