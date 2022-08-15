import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import Company from "./Company/Company"
import getCompanies from "../../Services/getCompanies"
import { Loading } from "carbon-components-react";
import "./CompanyGrid.scss"



const CompanyGrid = () => {

   const [searchParams, setSearchParams] = useSearchParams();
   const [companies, setCompanies] = useState();

   const validateSearchInput = str => {
      return /^[A-Za-z\s]*$/.test(str);
   }

   //when search params change in URL
   useEffect(() => {
      setCompanies(undefined);
      if (validateSearchInput(searchParams.get("symbol"))) {
         getCompanies(searchParams.get("symbol")).then(response => {
            setCompanies(response);
         });
      }

   }, [searchParams])

   return (
      <div>
         {companies
            ? (companies.length > 0
               ? (companies.map(
                  (company) => (

                     <Company
                        key={company.name}
                        company={company}
                     />
                  )
               )
               )
               : <div className="scale-text">No results found </div>)
            : (validateSearchInput(searchParams.get("symbol"))
               ? <Loading />
               : <div className="scale-text">Invalid input </div>
            )
         }
      </div>
   )

}
export default CompanyGrid;