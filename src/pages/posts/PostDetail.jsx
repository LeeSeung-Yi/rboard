import { Box, Paper } from '@mui/material';
import React from 'react';
import PostDetailHeader from '../../components/posts/PostDetailHeader';
import PostDetailContent from '../../components/posts/PostDetailContent';
import PostDetailButtons from '../../components/posts/PostDetailButtons';
import { useNavigate, useParams } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePosts, fetchPostsDetail } from '../../api/postsApi';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import PostComments from '../../components/comments/PostComments';
import { useMe } from '../../hooks/useMe';

/*
url에서 id를 읽고 서버에서 해당 데이터를 가져옴
화면에 내용을 보여주고 
삭제 버튼 클릭 시 삭제 api 함수 호출 후 목록으로 돌아감
수정 버튼 클릭시 수정 페이지로 이동
*/


function PostDetail(props) {
    const {id} = useParams();
    const postId = Number(id);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const apiBasic = import.meta.env.VITE_API_BASE_URL; //이미지 URL 환경설정 파일 추가

    const {data:me, isLoading:meIsLoading} = useMe();

    //Api 관련 Tanstack Query ==================
    //상세 내용 조회
    const { data: post, isLoading, isError, error } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => fetchPostsDetail(postId)
    });
    
    //삭제
    const deleteMutation = useMutation({
        mutationFn: () => deletePosts(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts']});
            navigate('/posts');
        },
        onError: () => {
            alert('게시글 삭제에 실패했습니다.')
        }

    });
    if(isLoading) return <Loader />
    if(isError || !post) return <ErrorMessage error ={error} />

    // 본인 글 확인
    const myId = me?.id;
    const authorId = post?.author?.id;
    const loginedEdit = !meIsLoading && 
    myId != null && 
    authorId !==null &&
    Number(authorId) === Number(myId);
    



    return (
        <Box sx={{ mt: 3 }}>   {/* 페이지 상단 여백 */}
        <Paper
                sx={{
                    px: 4,          // 좌우 안쪽 여백
                    py: 3.5,        // 상하 안쪽 여백
                    borderRadius: 3,
                    boxShadow: '0 12px 32px rgba(0,0,0,0.08)'
                }}
        >
            {/* 머릿말: 제목, 작성자, 작성일, 수정일.. */}
            <PostDetailHeader post={post}/>

            {/* content */}
            <PostDetailContent post={post} apiBasic={apiBasic} />

            {/*댓글*/}
            <PostComments postId={postId} />

            {/* 수정/ 삭제 버튼 */}
            <PostDetailButtons id={postId} deleteMutation={deleteMutation}  loginedEdit={loginedEdit}/>
        </Paper>
       </Box>
    );
}

export default PostDetail;