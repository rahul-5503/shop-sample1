import React,{useState} from 'react'
import {loadStripe} from '@stripe/stripe-js';
import {BrowserRouter , Route,Routes} from 'react-router-dom';
import Home from './container/Home.js';
import Success from './container/Success.js';
import Fail from './container/Fail.js';
const App = () => {
  const [product, setProduct] = useState({
    name: 'react',
    price:100*2,
    productBy:"rk",
    desc:"it is good",
    quantity: 5
  });

const moneyto =async()=>{
  const stripe =await loadStripe('pk_test_51OWI9ASGskRZRKP1rE04BAPKFZaO3UNYxEJA2meN0nScNZi6WE2NCNktdztj2i1tT5Iitt68TuaEsUorFgXwp3Ga00OELN4zDO');

  const body={
    products:[product]
  }
  
  const headers ={
    "Content-Type":"application/json",
    };
  const response=await fetch(`${apiURL}/create-checkout-session`,{
      method:'POST',
      headers,
      body:JSON.stringify(body)
    })
    const session=await response.json();
    const result =stripe.redirectToCheckout({
      sessionId:session.id
    });
    if(result.error){
      console.log(result.error);
    }
}

  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element ={<Home/>}/>
      <Route path="/Success" element={<Success/>}/>
      <Route path="/Cancelled" element={<Fail/>} />
     </Routes>
    </BrowserRouter>
  
  )
}

export default App