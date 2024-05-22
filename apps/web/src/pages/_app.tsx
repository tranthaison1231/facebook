import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position="top-right" closeButton duration={5000} />
      <div className="h-screen bg-slate-100 font-primary">
        <Outlet />
      </div>
    </QueryClientProvider>
  )
}
