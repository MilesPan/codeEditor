
import ErrorBoundary from '@/components/ErrorBoundary'
import Code from '@/pages/Code'
import Index from '@/pages/Index'
import JoinRoom from '@/pages/JoinRoom'
import Container from '@/Layout/Container/Container'
import { createBrowserRouter } from 'react-router-dom'
const router = createBrowserRouter([
    {
        path: '/',
        element: <Container />,
        children: [
            {
                path: '/',
                element: <Index />,
            },
            {
                path: '/joinRoom',
                element: <JoinRoom />
            },
            {
                path: '/code/:roomId',
                element: <Code />
            }
        ],
        errorElement: <ErrorBoundary />
    },
    {
        path: '*',
        element: <ErrorBoundary />,
    }
])

export { router }