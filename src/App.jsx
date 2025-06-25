
import './App.css'
import { Route,Routes } from 'react-router-dom'

import Signinpage from './authentication/signin/Signin'
import Productpage from './production/Productpage'
import Addtocart from './addtocard/Addtocart'
import Signup from './authentication/signup/Signup'
import Address from './address/Address'
import Orderplace from './orderpage/Orderplace'
import Thanku from './thank/Thanku'
import Orderfulldetail from './orderfulldetail/Orderfulldetail'
function App() {
 

  return (
  
    <Routes>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/' element={<Signinpage/>}></Route>
      <Route path='/product' element={<Productpage/>}/>
      <Route path="/list" element={<Addtocart/>}/>
      <Route path='/address' element={<Address/>}/>
      <Route path='/order' element={<Orderplace/>}/>
      <Route path="/thank" element={<Thanku/>}/>
      <Route path='/orderdetails' element={<Orderfulldetail/>}/>
    </Routes>


  )
}

export default App
