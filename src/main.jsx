import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools' 
import { createTheme, ThemeProvider } from '@mui/material'

const queryClient = new QueryClient ({
  defaultOptions: {
    queries: {
      retry: 1, //실패 시 재시도 횟수
      staleTime: 100 * 60 * 5 //데이터 유지 시간
    }
  }
})

//mui 기본 스타일
const theme = createTheme({
/*
  palette: {
  primary: {},
  secondary: {},


},*/
typography: {
  fontFamily: ["Pretendard", "-apple - system", "BlinkMacSystemFont", "Apple SD Gothic Neo", "Pretendard Variable", "Roboto", "Noto Sans KR", "Segoe UI", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "sans - serif"].join(',')
}
});

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  </ThemeProvider>
)
