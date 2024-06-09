import { useEffect } from "react"
import Body from "./Components/Body"
import Footer from "./Components/Footer"
import Header from "./Components/Header"

function App() {
  useEffect(() => {
    document.title = "Tic-Tac-Toe"
  }, [])

  return (
    <>
      <div className="flex flex-col px-6 py-8 bg-neutral-900 text-gray-300 min-h-screen">
        <Header />
        <Body />
        <Footer />
      </div>
    </>
  )
}

export default App
