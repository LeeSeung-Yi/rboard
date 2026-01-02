import { TextField } from '@mui/material';
import React from 'react';

function PostFormFields({title, content, onChangeTitle, onChangeContent}) {
    return (
        <>
         <TextField placeholder='제목'
            value={title}
            onChange={(evt) => onChangeTitle(evt.target.value)}//인풋에서 무조건 내용 감지
         />   
         <TextField placeholder='내용'
            value={content}
            onChange={(evt) => onChangeContent(evt.target.value)}
            multiline
            minRows={8}
         />   
        </>
    );
}

export default PostFormFields;