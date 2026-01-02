import { Box, Button, TextField } from '@mui/material';
import React from 'react';

function PostSearch({keyword, onSubmit, onChangeKeyword}) {
    return (
        <Box component="form" //폼의 submit 이벤트를 자동으로 실행함
        onSubmit={onSubmit}
        sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1.5,
            mt: 1,
            mb: 2,
        }}
        >
            <TextField
            type='search' 
            size='small'
            placeholder='제목 또는 내용 검색하세요 🐻‍❄️' 
            value={keyword}
            onChange={(evt) => onChangeKeyword(evt.target.value)} //setKeword로 넘어감 -> postList 
                sx={{
                    width: 260,
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '999px',
                        '& fieldset': {
                            borderColor: '#c9c9c9',
                        },
                        '&:hover fieldset': {
                            borderColor: '#999',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#dd427eff',
                        },
                    },
                }}
            />
            <Button
            type="submit"
            variant="contained"
            size="small"
            sx={{
                borderRadius: '999px',
                px: 2,
                textTransform: 'none',
                fontWeight: 500,
                backgroundColor: '#eecfe5ff',
                '&:hover': {
                    backgroundColor: '#e076b8ff',
                },
            }}
            >
                검색
            </Button> {/*onclick은 각각 클릭이벤트에서. 위에 폼으로 연결해놔서 안해도됨*/}
        </Box>
    );
}

export default PostSearch;