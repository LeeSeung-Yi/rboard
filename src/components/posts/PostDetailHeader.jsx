import { Box, Chip, Typography, Divider  } from '@mui/material';
import React from 'react';

function PostDetailHeader({ post }) {
    const { title, readCount, createdAt, updatedAt, author } = post;

    return (
        <>

            <Typography variant='h6' sx={{ fontWeight: 700, mb: 1.5 }}>
                {title}

            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography variant='body2' sx={{ color: '#666'}}>
                    작성자:
            </Typography>

                <Chip label= {author.nickname} 
                    size='small' 
                    sx={{ ml: 0.5, px: 1.5, borderRadius: 999, bgcolor: 'primary.main', color: '#fff' }} />

                    <Typography variant='body2' sx={{ color: '#666', ml:5 }}>조회수: {readCount}</Typography>
            </Box>

            <Typography variant='caption' sx={{ color: '#666', display: 'block' }}>
                작성일 : { new Date(createdAt).toLocaleString() }
                { updatedAt && <> | 수정일 : {new Date(updatedAt).toLocaleString()} </>}
            </Typography>
            
            <Divider sx ={{ my: 2}}/>
        </>
    );
}

export default PostDetailHeader;