import { QueryClient, QueryClientProvider } from 'react-query'
import './utils/normalize.css';
import './App.scss';
import Spendings from './pages/Spendings/Spendings'


function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Spendings />
      </QueryClientProvider>
    </>
  )
}

export default App
