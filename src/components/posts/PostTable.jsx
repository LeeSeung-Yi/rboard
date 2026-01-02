import React from 'react';
import { Link } from 'react-router';
import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import dayjs from 'dayjs';

function PostTable({ posts, apiBasic }) { //posts라는 이름으로 받게 됩니다?- 구조분해 한 것임
    const lists = posts ? posts : []; //배열을 돌릴 때 오류 막기 위해 빈 값 넣음


    return (
        <TableContainer sx={{ mt: 3 }}>
            <Table>
                {/*테이블 머릿말*/}
                <TableHead>
                    <TableRow sx={{
                        '& th': { //row 안에 있는 모든 <th> 셀에 스타일 적용 
                            borderBottom: '1px solid #e5e7',
                            fontSize: 14,
                            fontWeight: 500,
                            color: '#5a3e85',
                            backgroundColor: 'rgba(230, 220, 255, 0.4)', // 헤더 배경 컬러
                        }
                    }}>
                        <TableCell align='center' width={80}>번호</TableCell>
                        <TableCell align='center' width={80}>미리보기</TableCell>
                        <TableCell align='center' width={80}>제목</TableCell>
                        <TableCell align='center' width={160}>작성자</TableCell>
                        <TableCell align='center' width={80}>조회수</TableCell>
                        <TableCell align='center' width={100}>작성일</TableCell>
                    </TableRow>
                </TableHead>


                {/*테이블 본문*/}
                <TableBody>
                    {
                        lists.map(({ id, imageUrl, title, readCount, createdAt, author }) => (
                            <TableRow key={id}
                                hover sx={{ '& td': { fontSize: 15, borderBottom: '1px solid #e5e7' } }} //올리면 마우스모양으로 바뀜
                            >
                                <TableCell align='center'>{id}</TableCell>
                                <TableCell align="center"> {imageUrl ? (
                                    <img
                                        src={`${apiBasic}${imageUrl}`}
                                        alt={title}
                                        style={{
                                            width: 60,
                                            height: 60,
                                            objectFit: 'cover',
                                            borderRadius: 8
                                        }}
                                    />
                                ) : (
                                    <Typography sx={{ fontSize: 12, color: '#aaa' }}>
                                        없음
                                    </Typography>
                                )}</TableCell>

                                <TableCell>
                                    <Typography component={Link} to={`/posts/${id}`}
                                        sx={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit', '&:hover': { color: 'primary.main' } }}
                                    >
                                        {title}
                                    </Typography>
                                </TableCell>

                                <TableCell align='center'>

                                    {
                                        author?.nickname && author.nickname !=='익명' ? (
                                            <Chip label={author.nickname} size='small' sx={{ borderRadius: 999, px: 2, height: 25, fontSize: 13, bgcolor: 'rgba(238, 85, 149, 0.11)', color: '#c48e8eff' }}/>
                                                
                                    ) : (
                                                <Typography sx={{ fontSize: 14 }}>{author?.nickname || '익명'}</Typography>


                                    )}


                                   
                                </TableCell>
                                <TableCell align='center'>{readCount}</TableCell>
                                <TableCell align='center' sx={{ color: 'rgba(192, 11, 86, 0.69)' }}>
                                    {/*{new Date(createdAt).toLocaleString()}*/}
                                    {/*//npm i dayjs설치 필요**/}
                                    {dayjs(createdAt).format('YY년 MM월 DD일 HH:mm')}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                    {/* 게시글이 하나도 없을 때 */}
                    {
                        lists.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align='center' sx={{ py: 5 }}>게시글이 없습니다. 😴
                                </TableCell> {/* colSpan은 셀의 갯수 */}
                            </TableRow>
                        )
                    }


                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default PostTable;