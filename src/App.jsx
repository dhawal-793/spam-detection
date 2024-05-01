import { useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_HOST

function App() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [typeError, setTypeError] = useState("")
  const [spamType, setSpamType] = useState("choose what to predict")

  const handleChange = (e) => {
    setMessage(e.target.value)
    setResult("");
    setError("");
  }

  const handleTypeChange = (e) => {
    setSpamType(e.target.value)
    setMessage("")
    setResult("")
    setError("")
    setTypeError("")
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setResult("");
      setLoading(true)
      // const response = await axios.post(`${BASE_URL}/api/predict`, {
      //   message: message
      // });

      if (spamType == "choose what to predict") {
        setTypeError("Please choose the type of content you want to predict")
        setLoading(false)
        return
      }

      if (message.trim() == "") {
        setError("Message cannot be empty")
        setLoading(false)
        return
      }

      const headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
      }

      const emailbodyContent = JSON.stringify({
        email: message
      });
      const messagebodyContent = JSON.stringify({
        message
      });

      let reqOptions = {
        url: spamType == "email" ? `${BASE_URL}/api/predict-email` : `${BASE_URL}/api/predict-message`,
        method: "POST",
        headers: headersList,
        data: spamType == "message" ? messagebodyContent : emailbodyContent,
      }

      // console.log(reqOptions);

      const response = await axios.request(reqOptions);
      const prefix = spamType == "email" ? `Above Email is` : "Above Message is"
      // modifiedResult = prefix +response.data.result 
      setResult(`${prefix} ${response.data.result} ${spamType}`);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className='min-h-screen hauto w-full bg-black'>
      <div className='max-w-screen-xl mx-auto px-5 py-8'>
        <h1 className='text-3xl sm:text-5xl text-[#A435F0] font-bold text-center mb-20'>Spam Detector</h1>
        <div className='w-full max-w-[30rem] mx-auto sm:max-w-screen-md sm:px-16 md:px-20'>
          <form onSubmit={handleSubmit} className='space-y-5'>

            <div className='relative'>
              <div className='relative w-full h-auto'>
                <div className='absolute right-3 inset-y-0 z-30 flex items-center justify-center'>
                  <spam className={`fa-solid fa-angle-down text-white font-bold text-xl`} />
                </div>
                <select
                  name="type"
                  value={spamType}
                  onChange={handleTypeChange}
                  className='peer w-full h-auto bg-gray-900 rounded-xl text-gray-200  placeholder:text-gray-500 p-3 font-semibold outline outline-[3px] outline-gray-500 focus:border-0 focus:outline-[3px] focus:outline-[#A435F0] disabled:opacity-80  appearance-none relative'
                >
                  <option value="choose what to predict" className='py-2 h-12'>Choose What to Predict</option>
                  <option value="message" className='py-2 h-12'>Message</option>
                  <option value="email" className='py-2 h-12'>Email</option>
                </select>
              </div>
              <p className='text-sm font-medium text-red-500 h-5 mt-1 ml-3'>{typeError}</p>

            </div>
            <div>
              <textarea
                disabled={loading}
                className='w-full min-h-[10rem] h-auto bg-gray-900 rounded-xl text-gray-200  placeholder:text-gray-500 py-5 px-3 font-semibold outline outline-[3px] outline-gray-500 focus:border-0 focus:outline-[3px] focus:outline-[#A435F0] disabled:opacity-80 capitalize'
                value={message}
                onChange={handleChange}
                placeholder={spamType == "choose what to predict" ? spamType : `Enter Your ${spamType}`}
              />
              <p className='text-sm font-medium text-red-500 h-5 -mt-1 ml-3'>{error}</p>
            </div>
            <button
              disabled={loading || message.trim() == "" || spamType == "choose what to predict"}
              className='rounded-lg text-[#901ACA] px-8 sm:px-12 py-2 sm:py-3 my-2 bg-black border-2 border-[#901ACA] hover:text-[#A435F0] hover:border-[#A435F0]  disabled:hover:text-[#901ACA] disabled:hover:border-[#901ACA] disabled:opacity-60'
              type="submit"
            >Predict</button>
          </form>
          <DisplayResult result={result} />
        </div>
      </div>
    </div>
  )
}


const DisplayResult = (props) => {
  const { result } = props
  return (
    <>
      {result && <p className={`${result.toLowerCase() == "Spam" ? "text-red-500" : "text-green-500"} font-semibold text-xl sm:text-2xl text-left my-4`}>{result}</p>}
    </>
  )
}

export default App

DisplayResult.propTypes = {
  result: String,
};