import React, {useEffect, useState} from "react"
import './App.css';

function App() {
  // Change this from String to array for easier
  const [companyData, setCompanyData] = useState([])
  const [data, setData] = useState([])
  const [industryData, setIndustryData] = useState([])

  // data failed to be set previously due to the api
  useEffect(() => {
    // Can't console log companyData, data, industryData here due to not passing it in as a parameter
    fetch('http://localhost:8080/companyData/getAll')
    .then(res => res.json())
    .then(res => {
      setCompanyData(res)
      return res
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))

    fetch('http://localhost:8080/data/getAll')
    .then(res => res.json())
    .then(res => {
      setData(res)
      return res
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))

    fetch('http://localhost:8080/industryData/getAll')
    .then(res => res.json())
    .then(res => {
      setIndustryData(res)
      return res
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }, [])

  return(
    <>
      <h1>Hello</h1>
      
      <p>CompanyData: {companyData[0].Year} {companyData[0].Quarter} {companyData[0].Company} {companyData[0].NumberOfLayOff}</p>
      
      <p>RandomData: {data[0].x} {data[0].y}</p>

      <p>InformationIndustryData: {industryData[0].Year} {industryData[0].Quarter} {industryData[0].NumberOfLayOff}</p>

      {/* Can use this to test stuffs out */}
      {/* <svg>
        {
          companyData.map((item) => {
            return <circle
              cx = {item.x}
              cy = {item.y}
              r = {5}
            />
          })
        }
      </svg> */}

      {/* {companyData.map(item => {
        return <p>{item.Year} {item.Quarter} {item.Company} {item.NumberOfLayOff}</p>
      })} */}
    </>
  )
}

export default App;