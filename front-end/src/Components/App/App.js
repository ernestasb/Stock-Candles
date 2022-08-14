import SearchBar from "../SearchBar/SearchBar"
import HeaderInfo from "../HeaderInfo/HeaderInfo"
import CompanyGrid from "../CompanyGrid/CompanyGrid"
import StockInfo from "../StockInfo/StockInfo"
import "./App.scss"


import { BrowserRouter, Route, Routes } from 'react-router-dom'
window.sessionCompanyName = "";

const App = () => {

   return (
      <div>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={
                  //Homepage
                  <div>
                     <HeaderInfo />
                     <SearchBar />
                  </div>
               } />
               <Route path="/companies" element={
                  //Grid view
                  <div>
                     <HeaderInfo />
                     <SearchBar />
                     <CompanyGrid />
                  </div>
               } />
               <Route path="/stockCompany" element={
                  //StockInfo
                  <div>
                     <HeaderInfo />
                     <SearchBar />
                     <StockInfo />
                  </div>
               } />
            </Routes>
         </BrowserRouter>

      </div>
   );
}

export default App;