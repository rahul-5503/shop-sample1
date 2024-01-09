import React,{useState} from 'react'
//import pic from 'D:\New folder (3)\payment_gateway\client\public\logo192.png';
//https://amazon-server-r05j.onrender.com/
const Home = () => {
    const itemName="watch";
    const itemprice =400;
    const [Quantity,setQuantity]=useState(1);
    const [finalPrice, setFinalprice]=useState(itemprice);

    const increment=()=>{
        setQuantity(Quantity+1)
            setFinalprice(finalPrice+itemprice);
    }
    const Handledecrement=()=>{
        if(Quantity <= 1){
            setQuantity(1);
            setFinalprice(itemprice);
        }else{
            setQuantity(Quantity-1);
        setFinalprice(Quantity*itemprice)}   
    }
    const HandlePayment =()=>{
        fetch("https://amazon-server-r05j.onrender.com/create-checkout-session",{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
                },
            mode:"cors",
                body:JSON.stringify({
                    items:[
                        {id:1,quantity:Quantity,price:itemprice,name:itemName}
                    ]
        })
    })
    .then((res)=> {
        if(res.ok) return res.json()
        return res.json().then(json=> Promise.reject(json))
    })
    .then(({url})=>{
        window.location= url ;
    })
    .catch(e=>{
        console.log(e.error)
    })
       
}
  return (
    <div className='w-full mx-auto'>
        <div className='text-center font-raleway w-full max-w-5xl mx-auto my-6'>
            <div className='font-extrabold text-transparent text-6xl my-10 bg-clip-text
            bg-gradient-to-r from-yellow-400 to-yellow-800'>
                Chocolte corner
            </div>
            <div className='flex flex-col lg:flex-row justify-center items-center mx-autow-fully my-16 border-2 bg-[#fcf6f6] border-slate-100 shadow-md py-4'>
                    <div className='flex lg:justify-end justify-center items-center
                    mx-auto my-24 w-full lg:w-6/12'>
                        <img src={"C:\Users\J.A.R.V.I.S\OneDrive\Pictures\ART.jpg"} alt=" hear is a image"/>
                    </div>
                    <div className='flex flex-col lg:w-6/12 w-full py-8'>
                        <div className='text-4xl font-bont text-yellow-700'>
                            itemname
                        </div>
                        <div className='text-3xl font-semibold my-6 text-slate-600'>
                            price :&nbsp;&nbsp;{itemprice}
                        </div>
                        <small className='mt-10 mb-3 font-semibold'>Add Quantity</small>
                        <div className='flex text-slate-900 justify-center items-center mb-10'>
                        <span className='select-none w-auto px-4 py-2 text-5xl bg-red-100 cursor-pointer' onClick={Handledecrement}>-</span>
                        <span className='w-auto px-4 py-2 text-3xl font-semibold'>{Quantity}</span>
                        <spam className='select-none w-auto px-4 py-2 text-5xl bg-green-100 cursor-pointer' onClick={increment}>+</spam>
                    </div>
                    <div className='my-6 text-xl'>Amount to be paid:
                    <span className='text-green-500 text-3xl font-bold pl-3'>{finalPrice}</span></div>
                    <div className='my-6'>
                        <button className='bg-green-400 text-white px-8 py-4 rounded-md text-2xl font-semibold' onClick={HandlePayment}>
                            Chekout
                        </button>
                    </div>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Home