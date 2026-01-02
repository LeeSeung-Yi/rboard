import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
//image/* 모든 이미지 

function PostFormImage({handleChangeImage, uploading, imageName}) {
    return (
        <Box>
        <Stack direction="row">
            <Button variant="outlined" component="label" size="small" disabled= {uploading}>
                이미지 선택
                <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleChangeImage}
                />
            </Button>

            {uploading && (
                <Typography variant="body2" sx={{ ml: 1 }}>
                    업로드 중...
                </Typography>
            )}

            {!uploading && imageName && (
                <Typography variant="body2" sx={{ ml: 1 }}>
                    {imageName}
                </Typography>
            )}
        </Stack>
        </Box >
    );
}

export default PostFormImage;