import { useRef } from 'react'
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query'

import '../styles/globals.css'
import '../styles/global.scss'
import '../styles/react-calendar.scss'


function MyApp({ Component, pageProps }) {
  const qc = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 20 * 1000,
          refetchOnWindowFocus: false,
        },
      },
    })
  )

  return (
    <QueryClientProvider client={qc.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
