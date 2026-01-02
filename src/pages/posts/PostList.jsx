import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchPosts } from '../../api/postsApi';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import PostSearch from '../../components/posts/PostSearch';
import PostTable from '../../components/posts/PostTable';
import PostPagination from '../../components/posts/PostPagination';
import { useMe } from '../../hooks/useMe';


// 홈화면 PostList

function PostList(props) {
    const [page, setPage] = useState(0); //변수 정의 새로운 페이지, 검색어  값을 업데이트시킴
    const [keyword, setKeyword] = useState('');

    const apiBasic = import.meta.env.VITE_API_BASE_URL; //이미지 URL 환경설정 파일 추가

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['posts', page, keyword], // page, keyword가 바뀌면 새로운 데이터를 가져옴
        queryFn: () => fetchPosts({ page, size: 10, keyword }),
        placeholderData: keepPreviousData //페이지 전환 시 기존 데이터 유지
    });  //기본 값 10개


    const {data: me, isLoading: meIsLoading} = useMe();

    if (isLoading) return <Loader />;
    if (isError) return <ErrorMessage error={error} />

    const { content, totalPages } = data;

    //이벤트 핸들러 ========

    const handleNext = () => {
        setPage((prev) =>
            prev + 1 < totalPages ? prev + 1 : prev
        );
    };

    const handlePrev = () => {
        setPage((prev) => Math.max(prev - 1, 0));
    };

    const handleSearch = (evt) => {
        evt.preventDefault(); //새로고침 막기
        setPage(0); //검색하면 처음 페이지부터 다시 시작
    };



    return (
        <Box sx={{
            //minHeight: '100vh'
        }}>
            <Paper elevation={0} sx={{
                width: '100%',
                borderRadius: 3,
                px: 4,
                py: 3,
                boxShadow: '0 16px 40px rgba(0,0,0, 0.07)' //x축과 y축 번짐값 컬러(투명도 조절)
            }}>
                <Box>
                    {/* 제목 */}
                    <Typography variant='h5' sx={{ fontWeight: 700, fontSize: 24, mb: 3 }}>
                        게시글 목록🐻‍❄️
                    </Typography>

                    {/* 검색 */}
                    <PostSearch
                        keyword={keyword}
                        onChangeKeyword={setKeyword}
                        onSubmit={handleSearch}
                    />

                    {/* 테이블 */}
                    <PostTable posts={content} apiBasic={apiBasic} />
                    {/*{[]} 빈배열 확인*/}

                    {/* 페이지네이션 + 새 글 버튼 */}
                    <PostPagination
                        page={page}
                        totalPages={totalPages}
                        onNext={handleNext}
                        onPrev={handlePrev}
                        logined={!meIsLoading && !!me}//로딩상태 true, 데이터 true일때 -> true
                    />



                </Box>
            </Paper>
        </Box>

    );
}

export default PostList;