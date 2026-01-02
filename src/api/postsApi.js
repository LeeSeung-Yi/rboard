//postsApi.js
/*리액트가 서버에게 주문을 요청하는 문서. 요청하는 함수들을 모아둠

비동기 함수
export async function name(params) {
    
} 

*/

import { api } from "./api";


//게시글 목록(조회) 요청 함수-> PostList.jsx
export async function fetchPosts({page=0, size=10, keyword=""}) { //몇번째 페이지, 한페이지에 몇개, 검색어 기본값 설정. 앤드 구조분해함
    const params = {page, size};
    if(keyword && keyword.trim() != '') {
        params.keyword = keyword;
    }

    // axios.get(url, {params}); GET요청을 보낼 때 axios가 자동으로 쿼리
    const res= await api.get(`/api/posts`, {params}); //서버가 만들어지길 기다려라. 서버 주소를 포함하는 api로 get메서드로 서버에서 불러옴, params에 있는 page, size, keyword값을 같이 보내줌
    return res.data; // 서버에서 받은 데이터를 json으로 반환 
    // -> postlist페이지에서 탠스택쿼리로 출력코드로 출력시키면 됨
} 

//게시글 상세 내용- PostDetail.jsx
export async function fetchPostsDetail(id) { //ID를 입력받아 서버에서 가져오는 역할
    const res = await api.get(`/api/posts/${id}`); //서버에게 GET 요청
    return res.data; //프론트에 데이터 리턴 
}

//게시글 등록
export async function createPosts(payload) { //구조분해 필요 없이 통째로 넘김, payload: 데이터 묶음
    const res = await api.post(`/api/posts`, payload);
    return res.data;
}

//게시글 수정
export async function updatePosts(id, payload) {
    const res = await api.put(`/api/posts/${id}`, payload);
    return res.data;
}

//게시글 삭제
export async function deletePosts(id) {
    await api.delete(`/api/posts/${id}`);
}
