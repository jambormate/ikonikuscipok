import { useEffect, useState } from "react"
import type { Cipo } from "./type/types"

function App() {
  const [shoes, setShoes] = useState<Cipo[]>([])
  const [name, setName] = useState<string>("")
  const [size, setSize] = useState<number>()
  const [stock, setStock] = useState<boolean>(false)
  const [release, setRelease] = useState<Date>(new Date())
  useEffect(()=>{
    async function fetchCipos(){
      try{
        const response = await fetch("http://localhost:3000/cipok")
        const data: Cipo[] = await response.json()
        setShoes(data)
      }catch(error){
        console.log(error)
      }
    }
    fetchCipos()
  },[])
  return (
    <>
      
    </>
  )
}

export default App
