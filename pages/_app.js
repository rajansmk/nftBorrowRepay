import '../styles/globals.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { Layout } from '../components'

function MyApp({ Component, pageProps }) {
  return(
    <Layout>
      <Component {...pageProps}/>
    </Layout>
  )
}

export default MyApp
