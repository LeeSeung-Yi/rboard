import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router';

function PostPagination({ page, totalPages, onNext, onPrev, logined }) {
    return (
        // Stack 여러 개를 정렬하고 row는 가로로 방향 진행 
        <Stack direction="row" alignItems='center' justifyContent="space-between" sx={{ mt: 3 }}>
            {/* */}
            <Stack direction='row' alignItems='center' spacing={1.6}>
            <Button 
            variant='outlined' 
            size='small' 
            disabled={page === 0} 
            onClick={onPrev}
                    sx={{
                        borderRadius: 4
                    }}
            >⬅️</Button>
            <Typography variant='body2'>
            {page + 1} / {totalPages}
            </Typography>
            <Button 
            variant='outlined' 
            size='small' 
            disabled={page + 1 >= totalPages} 
            onClick={onNext}
                    sx={{
                        borderRadius: 4
                    }}
            >▶️</Button> 
            </Stack>

            {/*새 글 작성 버튼*/}
            {
            logined && <Button component={Link} to='/posts/new' variant='contained' size='small' sx={{ 
                borderRadius: 999,
                px: 3, 
                fontWeight: 600, 
                color: '#b65a90ff', 
                backgroundColor: '#e6a1c754', }}>새 글 작성</Button>
            }
        </Stack>
    );
}

export default PostPagination;