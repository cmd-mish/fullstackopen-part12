import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [NODE_ENV, setNODE_ENV] = useState(undefined)

  useEffect(() => {
    axios
      .get('http://localhost:3001/')
      .then(res => {
        setNODE_ENV(res.data.NODE_ENV)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <>
      {!NODE_ENV ? `Couldn't connect to the backend.` : `Backend is running in ${NODE_ENV} mode.`}<br />
      Frontend is running in {process.env.REACT_APP_MODE === 'dev' ? 'development' : 'production'} mode.
    </>
  )
}

export default App