import { Link } from 'react-router-dom';
import logo from '../../Assets/logo_transparent.png'
import "./HeaderInfo.scss"

const HeaderInfo = () => {
   return (
      <div className='header-container'>
         <Link to={"/"}>
            <img alt='Logo' className='img-logo' src={logo} />
            <p className='header-title'>StoCand</p>
         </Link>
      </div>
   )
}
export default HeaderInfo;