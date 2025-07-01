import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyinfo from './hooks/useCurrencyInfo'

function App() {

   const [amount, setAmount] = useState(0);
   const [from, setFrom]= useState("USD");
    const [to, setTo] = useState("INR");
    const [convertedAmount, setconvertedAmount] = useState(0);

    const currencyInfo = useCurrencyinfo(from);

    const options=Object.keys(currencyInfo);

    const swap =()=> {
        setFrom(to);
        setTo(from);
        setconvertedAmount(amount);
        setAmount(convertedAmount);

    }

    const convert =()=>{
       setconvertedAmount(amount* currencyInfo[to])
    }


  return (
    <div 
      className="w-full h-screen flex flex-wrap 
      justify-center items-center bg-cover bg-nno-repeat"
      style={{
        backgroundImage: ` url('https://images.pexels.com/photos/32660267/pexels-photo-32660267.jpeg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
        <div className="w-full">
          <div className=" w-full max-w-md mx-auto
          border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
              <form 
                onSubmit={(e) => {
                    e.preventDefault();
                    convert();
                }}
              >
                <div className="w-full mb-1">

                  <InputBox
                    label="From"
                    amount={amount}
                    currencyOptions={options}
                    onCurrencyChange={(currency) => setFrom(currency)}  
                    selectCurrency={from}
                    onAmountChange={(amount) => setAmount(amount)}
                  />
                </div>
                <div className="relative w-full h-0.5">
                  <button
                    type="button"
                    className="absolute top-0 left-1/2 -translate-x-1/2 
                    -translate-y-1/2 border-2 
                    border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                    onClick={swap}
                  >
                    swap 
                  </button>
                </div>
                <div className="w-full mt-1 mb-4">
                    <InputBox
                    label="To"
                    amount={convertedAmount}
                    currencyOptions={options}
                    onCurrencyChange={(currency) => setTo(currency)}
                    amountDisabled={true}  
                    selectCurrency={to}
                    />
                </div>

                <div className="w-full flex items-center justify-between space-x-0 ">

                <button type="submit" className="w-full bg-blue-600 text-white pl-8  py-3 rounded-lg rounded-r-none">
                  Convert {from.toUpperCase()} to {to.toUpperCase()}
                </button>

                <button type="button" className="  bg-red-400  text-white rounded-l-none px-4 py-3 rounded-lg" 
                    onClick={()=>{
                      setAmount(0);
                      setFrom("USD");
                      setTo("INR");
                      setconvertedAmount(0);
                    }}
                  > Reset</button>
                </div>
                
              </form>

          </div>

        </div>
      
    </div>
  )
}

export default App
