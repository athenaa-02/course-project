import geo from '../assets/Flag_of_Georgia.svg';
import eng from '../assets/flag_of_the_United_Kingdom.svg.webp';


function Languages() {
  return (
    <>
    <div className='languages'>
        <img src={geo} alt="georgian flag" />
        <img src={eng} alt="english flag" />
    </div>
   
    </>
  )
}

export default Languages