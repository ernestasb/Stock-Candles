import { useNavigate, createSearchParams } from 'react-router-dom'
import './Company.scss';


const Company = ({ company }) => {

   let navigate = useNavigate();

   const routeToStock = () => {
      localStorage.setItem("compName", company.name)
      navigate({
         pathname: "/stockCompany",
         search: `?${createSearchParams({ symbol: company.ticker })}`
      })
   }

   return (

      <div onClick={routeToStock} className="tile-design semi-transparent">
         <div>
            <div className='text-spacing'>
               <span className="text-bold company-data" >Company name:</span>
               <span className="company-data" >{company.name}</span>

            </div>
            <div className='text-spacing'>
               <span className="text-bold company-data" >Country: </span>
               <span className="company-data" >{company.country}</span>

            </div>
            <div className='text-spacing'>
               <span className="text-bold company-data" >Currency: </span>
               <span className="company-data" >{company.currency}</span>
            </div>
            <a href={company.weburl} className="company-data">Visit company webpage</a>
         </div>
      </div>

   )
}
export default Company;