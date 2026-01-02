import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { createComment, deleteComment, fetchComment, updateComment } from '../../api/commentApi';
import { Alert, Box, Button, Divider, Paper, Stack, TextField, Typography } from '@mui/material';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import { useMe } from '../../hooks/useMe';

function PostComments({ postId }) {
    const queryClient = useQueryClient();

    //새 댓글 입력
    const [newContent, setNewContent] = useState("");
    //수정 모드
    const [edit, setEdit] = useState();
    // 수정 댓글 입력
    const [editContent, setEditContent] = useState("");

  const { data: me, isLoading: meIsLoading } = useMe();
  const isMe = !meIsLoading && !!me;

  // 로그인한 사용자와 작성자가 동일한지 확인하는 함수
  const loginedEdit = (authorId) => (
    !meIsLoading &&
    me?.id != null &&
    authorId != null &&
    Number(authorId) === Number(me.id)
  );
    //TansStack Query =========================
    //조회: 겹칠 수가 있으니까 이름을 바꿔준 것임
    const {
        data:comments=[],
        isLoading: isCommentsLoading,
        isError: isConmmentsError
    } = useQuery({
        queryKey:['postComments', postId],
        queryFn: () => fetchComment(postId)
    });

    //Mutation===========================
    //작성
    const createCommentMutation = useMutation({
        mutationFn:(content) => createComment(postId, { content }),
        onSuccess:() => {
            setNewContent("")
            queryClient.invalidateQueries({ queryKey: ['postComments', postId]});
        },
        onError: () => {
            alert('댓글 등록에 실패했습니다.')
        }
    });// .mutate(newContent);

    //수정
    const updateCommentMutation = useMutation({
        mutationFn: ({ commentId, content }) => updateComment( postId, commentId, {content}),
        onSuccess: () => {
            setEdit(false); //아이디가 없다 null넣어도 됨
            setEditContent("");
            queryClient.invalidateQueries({ queryKey: ['postComments', postId] });
        }
    });
    //삭제
    const deleteCommentMutation = useMutation({
        mutationFn: (commentId) => deleteComment(postId, commentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['postComments', postId] });
        },
        onError: () => {
            alert("댓글 삭제에 실패했습니다.");
        }
    });


    //이벤트 핸들러======================
    //댓글 작성
    const handleNewContent = (evt) => {
        evt.preventDefault();

        if(!isMe) return; //로그아웃 상태면 종료
        const newComment = newContent.trim();
        if(!newComment) return;

        createCommentMutation.mutate(newComment);
    }

    //수정 시작
    const handleStartEdit = (comment) => {
        //본인 확인
        if(!loginedEdit(comment.author?.id))return;

        setEdit(comment.id); //수정모드로 변경되기 위해 아이디가 필요함
        setEditContent(comment.content); //기존 내용을 보여줌
    }
    //수정 저장
    const handleSaveEdit = (commentId) => {
        const editComment = editContent.trim();
        if(!editComment) return;
        updateCommentMutation.mutate({
            commentId, content: editComment
        });
    } //객체 넘겨줄 때 키: 값으로 넘겨줘야 함

    //수정 취소
    const handleCancelComment = () => {
        setEdit(null);
        setEditContent("");
    }

   
     // 삭제
     const deleteCommentMutation = useMutation({
       mutationFn: (commentId) => deleteComment(postId, commentId),
       onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['postComments', postId] });
       },
       onError: () => {
         alert("댓글 삭제에 실패했습니다.");
       }
     });

    return (
        <Box sx={{ mt: 4 }}> 
            <Typography variant='h6' sx={{ fontWeight: 600, mb:1, fontSize:16 }}>댓글</Typography>
        
            { isCommentsLoading && <Loader /> }
            { isConmmentsError && <ErrorMessage /> }

            {/* 댓글 목록 */}
            {/* 오류나 에러가 없으면 배열을 돌리겠다. 구조분해 소괄호 넣기 위해 return 넣어야 햄 */} 
                { !isCommentsLoading && !isConmmentsError &&
                comments.map( (comment) => {
                    const { id, content, createdAt, author } = comment;
             
                       return (
                         <Paper key={id} variant='outlined' sx={{ p: 2, mb: 1.5 }}>
                           {
                             edit === id ? (
                               <>
                                 {/* 수정 모드 */}
                                 <TextField fullWidth value={editContent} onChange={(evt) => setEditContent(evt.target.value)}/>
                               
                               <Stack>
                                <Button size='small' variant='contained' onClick={ () => handleSaveEdit(id)}>저장</Button>
                                <Button size='small' variant='outlined' color='inherit' onClick={handleCancelComment}>취소</Button>
                               </Stack>

                               </>
                             ) : (
                               <>
                                 {/* 리스트 모드 */}
                                 <Typography>
                                   {content}
                                 </Typography>

                                 <Stack direction="row" justifyContent="space-between"
                                 sx={{ mt: 1, pr: 1 }}>

                                    <Typography variant='caption'>
                                    {author?.nickname || '익명'} -{""}
                                    {createdAt && new Date(createdAt).toLocaleString()}
                                    </Typography>
                                    {/*본인 댓글 일 때만 표시  */}
                                {
                                                       <Stack direction='row'
                                                           spacing={1}
                                                           sx={{ mt: 1 }}>

                                                           <Button
                                                               size='small'
                                                               variant="outlined"
                                                               sx={{ px: 3, borderRadius: 999 }}

                                                               onClick={() => {
                                                                   setEdit(id);
                                                                   setEditContent(content)
                                                               }}
                                                           >
                                                               수정</Button>
                                                           <Button
                                                               size="small"
                                                               variant="outlined"
                                                               color="error"
                                                               sx={{ px: 3, borderRadius: 999 }}
                                                               onClick={() => handleDeleteComment(id)}
                                                           >삭제</Button>
                                                       </Stack>
                                }
                                 
                                </Stack>
                               </>
                             )
                           }
                         </Paper>
                       )
                    })
                   }
            <Divider sx={{ my: 3 }} />

            {/* 댓글 작성 -> 로그인 상태에서만 표기 */}
            {
                isMe ? (
                    //로그인 상태
                    <Box component="form" sx={{ mt: 2, mb: 3 }} onSubmit={handleNewContent}>
                        <TextField fullWidth multiline minRows={2} label="댓글 내용" value={newContent} onChange={(evt) => setNewContent(evt.target.value)} />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>

                            <Button type='submit' variant='contained' size='small' sx={{ borderRadius: 999, mt: 2 }} >댓글 등록</Button>
                        </Box>
                    </Box>
                ) : (
                    //로그아웃 상태
                        <Alert severity='info' sx={{mt: 2}}>댓글을 작성하려면 로그인을 해 주세요.</Alert>
                )
            }

           
            
        </Box>
    );
}

export default PostComments;