import "./App.css";
import SearchBoard from "./components/SearchBoard"
import ViewLocation from "./components/ViewLocation";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchBoard />} />
          <Route path="/view/:eid" element={<ViewLocation />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
