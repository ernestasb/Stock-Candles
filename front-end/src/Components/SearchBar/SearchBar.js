import { useNavigate, useSearchParams, createSearchParams } from "react-router-dom"
import { Search } from "carbon-components-react"
import { useEffect, useState } from "react";
import './SearchBar.scss'
import postUserData from "../../Services/saveUserData"

const SearchBar = () => {

   let navigate = useNavigate();

   //query params
   const [searchParams, setSearchParams] = useSearchParams();
   const [error, setError] = useState();
   const [path,setpath] = useState()


   //validate string (letters and spaces only)
   const validateSearchInput = str => {
      return /^[A-Za-z\s]*$/.test(str);
   }

   //check if enter is pressed
   const handleKeyDown = args => {

      if (args.key === "Enter") {
         if (validateSearchInput(args.target.value)) {
            routeToGrid(args)
            setError(false);

         } else {
            setError(true);
            console.log("erroras ENTER validate");
         }
      }
   }
   //change to "Grid" view after search
   const routeToGrid = args => {
      navigate({
         pathname: "/companies",
         search: `?${createSearchParams({ symbol: args.target.value })}`
      });
   }

   //When params change in URL
   useEffect(() => {
      if (!validateSearchInput(searchParams.get("symbol"))) {
         console.log("erroras URL validate");
         setError(true);
      } else {
         postUserData({ action: "search", value: searchParams.get("symbol") })
      }

   }, [searchParams,path])

   //loads searchbar
   return (
      <>
         <div className="semi-transparent search-wrapper">
            {error
               ? <p className="error">Only characters and spaces allowed for search input.</p>
               : <p/>}
            <Search
               className="magnifier"
               closeButtonLabelText="Clear search input"
               defaultValue={path==="/"
               ? "" 
               : searchParams.get("symbol")}
               id="search-1"
               labelText="Searchas"
               maxLength={35}
               onKeyDown={handleKeyDown}
               size="lg"
            />
         </div>
      </>
   );

}

export default SearchBar;