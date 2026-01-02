import { Button, Stack } from '@mui/material';
import React from 'react';
import { Link } from 'react-router';

function PostDetailButtons({ id, deleteMutation, loginedEdit }) {
    return (
        <Stack direction="row" spacing={1.5} justifyContent='space-between' alignItems='center'>
        <Button component={Link} to='/posts' variant='outlined' size='small' sx={{
            borderRadius: 999, px: 2.5}}>목록</Button>
      {
      loginedEdit &&(  
        <Stack direction="row" spacing={1.2}>
                <Button component={Link} to={`/posts/${id}/edit`} 
                variant='outlined' 
                size='small' 
                sx={{borderRadius: 999, px: 2.5, color: '#e91e63', borderColor: '#e91e63',
                    '&:hover': {
                        bgcolor: '#e91e63',     // 호버 시 배경 핑크
                        color: '#fff',
                        borderColor: '#e91e63'
                    }
                 }}>
                수정</Button>

                <Button 
                variant='outlined' 
                color="error" 
                size='small' 
                    sx={{
                        borderRadius: 999, px: 2.5, borderRadius: 999,
                        px: 2.5,
                        color: '#e91e63',
                        borderColor: '#e91e63',
                        '&:hover': {
                            bgcolor: '#e91e63',
                            color: '#fff',
                            borderColor: '#e91e63' }}
                        }
                disabled={deleteMutation.isPending}
                onClick={() =>{
                    if (window.confirm('삭제하시겠습니까?'))  deleteMutation.mutate();
                }}
                >삭제</Button>
        </Stack>
      )}
        </Stack>
    );
}

export default PostDetailButtons;