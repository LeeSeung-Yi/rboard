import { Box, Container, Stack, Typography, Button } from '@mui/material'; //div처럼 사용하는 태그, 범위를 정할 때 사용하는 태그

import React from 'react';
import { Outlet, useNavigate } from 'react-router';
import { BiFace } from "react-icons/bi";
import { Link } from 'react-router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMe } from '../hooks/useMe';
import { clearAuth } from '../api/authApi';


function AppLayout(props) {
    const queryClient = useQueryClient();

    //인증 사용자 정보
    const { data:me, isLoading:meIsLoading } = useMe();
    const navigate = useNavigate();

    //로그아웃 이벤트 핸들러
    const handleLogout = () => {    
        clearAuth();
        queryClient.setQueryData(["me"], null);//즉시 UI 반영
        navigate("/posts");
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: '#f48fb1',
            },
            secondary: {
                main: '#ce93d8',
            },
        },
    });




    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'rgba(230, 238, 225, 0.47)'}}>
            {/* header */}
            <Box component="header" sx={{ 
                position: "fixed", 
                top:0, 
                zIndex: 10, 
                bgcolor: 'rgba(236, 118, 187, 0.47)', 
                borderBottom: '1px solid #e9dee4ff',
                width: '100%', 
                }}>

                <Container maxWidth="md" sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    height: 60, }}>
                        
                <Box component={Link} to="/posts"
                sx= {{
                    display: 'flex',
                    alignItems: 'center', //flex일때 가능한 위 아래 중앙정렬
                    textDecoration: 'none'
                }}>
                    <Box sx={{ 
                        width: 40, height: 40,
                        borderRadius: '50%', //모서리 둥글게 처리
                        bgcolor: '#dfcdcd3f',
                        display: 'grid', //바둑판 형태 레이아웃
                            placeItems: 'center', // grid 일 때만 적용 가능한 x, y 축 중앙 정렬
                        mr: 1.5
                        }}> 

                            <BiFace size={28} style={{  fontSize: 22  }} />
                           
                    </Box>   
                    <Typography variant='h6' sx={{ 
                        fontWeight: 700, 
                        color: '#2e272dff'}}>
                        게시판
                    </Typography>
                </Box>

                {/* 오른쪽 메뉴: 회원가입/ 로그인 */}
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        { !meIsLoading && me ? (

                            <Button onClick={handleLogout}>로그아웃</Button>
                        ): (
                            <>
                        <Button
                            component={Link}to="/auth/login"
                            variant="outlined"
                            sx={{
                                fontWeight: 500,
                                fontSize: 14,
                                color: '#152431ff',
                                borderColor: '#bd3579ff',
                                borderRadius: 7,
                                px: 2,
                                '&:hover': {
                                    borderColor: '#302b2bff',
                                    backgroundColor: '#b13688ff'
                                }
                            }}
                        >
                            로그인
                        </Button>

                        <Button
                            component={Link}to="/auth/register"
                            variant="contained"
                            sx={{
                                fontWeight: 500,
                                fontSize: 14,
                                backgroundColor: '#b13688ff',
                                color: '#fff',
                                borderRadius: 7,
                                px: 2,
                                boxShadow: 'none',
                                '&:hover': {
                                    backgroundColor: '#3630359a'
                                }
                            }}
                        >
                            회원가입
                        </Button>
                          </>
                          )}
                    </Stack>

            </Container>

            </Box>

            

            {/*자식 컴포넌트(본문)  영역*/}
            <Container maxWidth="md" sx={{ pt: 10, mb: 4 }}>
                <Outlet />
            </Container>
        </Box>
    );
}

//공통레이아웃 -> api -> 각각 컴포넌트 만들기

export default AppLayout;