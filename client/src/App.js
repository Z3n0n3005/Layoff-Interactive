import React, {useEffect, useState} from "react"
import './App.css';

function App() {
  const [data, setData] = useState("")

  useEffect(() => {
    fetch('http://localhost:8080/companyData/getAll')
    .then(res => res.json())
    .then(res => {
      console.log(res)
      return res
    })
    .then(res => setData(res))
    .catch(err => console.log(err))
  }, [])

  return(
    <>
      <h1>Hello</h1>
      {/* <svg>
        {
          data.map((item) => {
            return <circle
              cx = {item.x}
              cy = {item.y}
              r = {5}
            />
          })
        }
      </svg> */}
    </>
  )
}

export default App;