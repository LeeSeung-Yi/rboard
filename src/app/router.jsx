import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router'
import AppLayout from '../layouts/AppLayout';
import PostList from '../pages/posts/PostList';
import PostForm from '../pages/posts/PostForm';
import PostDetail from '../pages/posts/PostDetail';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';

//라우터 트리 + loader -> 따로 빼서 작성
//굳이 대문자로 안쓰고 소문자로 작성


export const router = createBrowserRouter([
{
    path: '/',
    element: <AppLayout />,
    children: [
        {
            index: true,
            //사용자가 /5173로 들어오면 자동으로 /posts로 이동
            element: <Navigate to="posts" replace />
        },
        {
            path: "posts",
            element: <PostList />
        },
        {
            path: 'posts/new',
            // PostForm 컴포넌트가 mode를 props로 받아 create 면 새 글 작성
            element: <PostForm mode="create" />
        },
        {
            path: "posts/:id", // :id 동적 파라미터 
            element: <PostDetail />
        },
        {
            path: 'posts/:id/edit', //수정
            element: <PostForm mode="edit" />
        },
        {
            path: 'auth/login',
            element: <LoginPage />
        },
        {
            path: 'auth/register',
            element: <RegisterPage />
        }
    ]
}

]);