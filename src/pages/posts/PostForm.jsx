import { Box, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PostFormFields from '../../components/posts/PostFormFields';
import PostFormImage from '../../components/posts/PostFormImage';
import PostFormSubmit from '../../components/posts/PostFormSubmit';
import { useQuery, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { createPosts, fetchPostsDetail, updatePosts } from '../../api/postsApi';
import { useNavigate, useParams } from 'react-router';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import { uploadImage } from '../../api/fileApi';


//홈 화면에서 새 글 작성하는 입력 폼, 페이지
// props mode가 
// create: 새 글 작성, edit: 글 수정 
function PostForm({ mode }) {
    const isEdit = mode === 'edit'; // true 수정, false 작성
    const queryClient = useQueryClient(); //react query 캐시 무효화 할 때 사용
    const navigate = useNavigate(); //페이지 이동
    const { id } = useParams(); //URL에서 :id와 같은 동적 파라미터 값을 가져옴. 문자열
    const postId = Number(id); //postid는 수정 id값/문자열 -> 숫자로 변경

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    //이미지 업로드 중인지 여부
    const [uploading, setUploading] = useState(false);
    const [imageName, setImageName] = useState("");


    //Api 관련 TanStaks Query=============
    // 생성 Mutation
    //생성 빼고는 모두 mutation 씁니다- 수정, 삭제 ,, 조회(탠스택쿼리로 코드 찾아서 확인)
    const createMutation = useMutation({
        mutationFn: createPosts,
        //모달창으로 띄우는 방식도 있으니까 확인하기
        onSuccess: (payload) => { //서버에 저장된 데이터의 id를 불러와 적용
            // 캐시 무효화 후 데이터 다시 불러옴
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            // 이동 -> PostDetail(useNavigate 훅 이용)
            navigate(`/posts/${payload.id}`);

        },
        onError: () => {
            alert('게시글 등록에 실패했습니다.')
        }
    });

    //수정 모드 일때 기본 데이터 가져오기
    const { data: post, isLoading, isError, error } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => fetchPostsDetail(postId),
        enabled: isEdit //isEdit가 true 수정일 때만 이 함수 조회
    })

    // 수정 Mutation
    //isEdit가 true일때 수정 실행되고 난 뒤(postId의 값- 백엔드에서는 pathvaliabe로 찾음) 결과 착착착
    const updateMutation = useMutation({
        mutationFn: (payload) => updatePosts(postId, payload),
        //결과 값
        onSuccess: (update) => {
            //목록 캐시 무효화
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            //상세 내용 무효화
            queryClient.invalidateQueries({ queryKey: ['post', postId] }); //배열: id *번인 post게시글 1개'posts'가 페이지 주소는 아님

            //이동
            navigate(`/posts/${update.id}`); //업데이트 된 내용이 백으로 넘어가서 매핑 주소로 넘겨주면 받는 건 res.data로 받음 
        },
        onError: () => {
            alert('게시글 수정에 실패했습니다.');
        }
    });

    //Side effect: 렌더링 후 하는 부가 작업
    // useEffect(콜백함수, [변경값])
    useEffect(() => {
        if (isEdit && post) {
            setTitle(post.title);
            setContent(post.content);
            setImageUrl(post.imageUrl || ""); //이미지 추가
        }
    }, [isEdit, post]);  // [isEdit, post])의 상태가 바뀌면 업데이트

    //이미지 업로드 Mutation
    const uploadMutation = useMutation ({
        mutationFn: (file) => uploadImage(file),
        onSuccess: (result) => {
        setImageUrl(result.imageUrl)
        },
        onError: () => {
            alert("이미지 업로드 실패");
        }

    });

    if (isEdit && isLoading) return <Loader />
    if (isEdit && isError) return <ErrorMessage error={error} />


    //이벤트 핸들러=======
    //이미지 업로드
    const handleChangeImage = async (evt) => {
        const file = evt.target.files?.[0]; //파일이 있으면 불러오라 ?를 쓴 이유
        if(!file) return;

        setImageName(file.name);

        if(file.size > 5 * 1024 * 1024) {
            alert('이미지는 5MB 이하만 가능합니다.')
            return;
        }

        uploadMutation.mutate(file); //이미지 수정 호출하기
        /*
        try {
        setUploading(true);
        const result = await uploadImage(file);

        setImageUrl(result.imageUrl) //다되면 이미지 업로드 시켜라
        } catch {
            alert('이미지 업로드에 실패하였습니다.')
        }finally {//무조건 실행함
            setUploading(false);
        }
        */

        
    };


    //폼 전송
    const handleSubmit = (evt) => {
        evt.preventDefault();   // 폼 제출 시 새로고침 막기

        const payload = {
            title: title.trim(),
            content: content.trim(),
            imageUrl:imageUrl || null
        }
        //검증
        if (!title.trim() || !content.trim()) {
            alert('제목과 내용은 필수입니다.');
            return;
        }

        // 이미지 업로드 중이면 저장 막기
        if(uploadMutation.isPending) {
            alert('이미지 업로드 중입니다.');
            return;
        }


        //받은 props에 따라 생성. 수정 mutation 호출
        if (isEdit) {
            updateMutation.mutate(payload); //isEdit값이 true면 수정 뮤테이션 실행 -> 밑으로 내려가서 수정 버튼 실행
        } else {
            createMutation.mutate(payload);
        }
    };



    return (
        <Box>
            <Paper sx={{
                width: '100%',
                borderRadius: 3,
                px: 4,
                py: 3,
                boxShadow: '0 16px 40px rgba(0,0,0, 0.07)' //x축과 y축 번짐값 컬러(투명도 조절)
            }}>

                {/* 제목: 새 글 작성 /  글 수정 */}
                <Typography variant='h6' sx={{ fontWeight: 600, mb: 3 }}>
                    {isEdit ? '게시글 수정' : '새 글 작성'}
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={2.5}>
                        {/* 입력필드 */}
                        <PostFormFields
                            title={title}
                            content={content}
                            onChangeTitle={setTitle}
                            onChangeContent={setContent} //setContent로 내려받아서 업데이트를 시켜줌

                        />

                        {/* 이미지 업로드 */}
                        <PostFormImage 
                        handleChangeImage={handleChangeImage}
                        uploading={uploadMutation.isPending} //탠스택쿼리가 자동으로 상태 관리 uploading → 결과isPending → 원인 + 과정 포함
                        imageName={imageName}
                        />

                        {/* 등록 / 수정 버튼 */}
                        <PostFormSubmit isEdit={isEdit} />

                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
}

export default PostForm;