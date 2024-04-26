import { useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_HOST

function App() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setMessage(e.target.value)
    setResult("");
    setError("");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setResult("");
      setLoading(true)
      // const response = await axios.post(`${BASE_URL}/api/predict`, {
      //   message: message
      // });

      if (message.trim() == "") {
        setError("Message cannot be empty")
        setLoading(false)
        return
      }

      const headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
      }

      const bodyContent = JSON.stringify({
        message
      });

      let reqOptions = {
        url: `${BASE_URL}/api/predict`,
        method: "POST",
        headers: headersList,
        data: bodyContent,
      }
      console.log(reqOptions.url);
      const response = await axios.request(reqOptions);
      console.log(response.data.result);
      setResult(response.data.result);
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
          <form onSubmit={handleSubmit}>
            <div>

            <textarea
              disabled={loading}
              className='w-full min-h-[10rem] h-auto bg-gray-900 rounded-xl text-gray-200  placeholder:text-gray-500 py-5 px-3 font-semibold outline outline-[3px] outline-gray-500 focus:border-0 focus:outline-[3px] focus:outline-[#A435F0] disabled:opacity-80'
              value={message}
              onChange={handleChange}
              placeholder='Enter Your Message'
            />
            <p className='text-sm font-medium text-red-500 h-5 -mt-1 ml-3'>{error}</p>
            </div>
            <button
              disabled={loading || message.trim()==""}
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
      {result && <p className={`${result.toLowerCase() == "spam" ? "text-red-500" : "text-green-500"} font-semibold text-xl sm:text-2xl text-left my-4`}>{result}</p>}
    </>
  )
}

export default App

DisplayResult.propTypes = {
  result: String,
};