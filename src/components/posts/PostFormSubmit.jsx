import { Button, Box } from '@mui/material';
import React, { Component } from 'react';

function PostFormSubmit({ isEdit }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
            <Button type='submit' variant='contained' sx={{ borderRadius: 999, px: 3, fontWeight: 500 }}>
                {isEdit ? '수정' : '등록'}
            </Button>
        </Box>
    );
}

export default PostFormSubmit;