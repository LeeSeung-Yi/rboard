import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

function PostDetailContent({post, apiBasic}) {
    const {content, imageUrl, title } = post;
    const imageSrc = imageUrl ? `${apiBasic}${imageUrl}` : null; 

    return (
        <>
            {
                imageSrc && (
                    <Box sx = {{ mb: 2, borderRadius: 2, overflow: "hidden", border: "1px solid #e5e7eb", maxWidth: 400 }}>
                        <img src={imageSrc} alt={title} style={{ maxWidth: 400, display: 'block'}}/>
                    </Box>
                ) 
            }


            <Typography sx={{ p: 2, lineHeight: 1.6, mb: 4 }}>
            {content}
        </Typography>   
            
            <Divider sx={{ my: 2 }} />
        </>
    );
}

export default PostDetailContent;