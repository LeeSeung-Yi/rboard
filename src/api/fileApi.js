//fileApi.js
import { data } from "react-router";
import { api } from "./api";

/*
이미지 업로드 API
<input type='file' /> 이미지 업로드 -> 미리 서버 전송
업로드 된 url을 받아서 게시글 작성, 수정 시에 그 url을 포함시켜 서버에 전송
*/

export async function uploadImage(file) {
    //브라우저에서는 바이너리 데이터를 전송할 때 반드시 FormData 사용
    const formData = new FormData();
    formData.append('file', file); //폼에서 파일을 받아서 추가한 과정
    const res = await api.post('/api/files/image', formData, {
        headers: {
            'Content-Type' : 'multipart/form-data'
        }
    }); 
    
    //생성이기 때문에 post로 받음 -> 엑시오스로 받음(주소, 데이터)
        

    return res.data;
    
}