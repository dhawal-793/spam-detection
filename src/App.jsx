import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL=import.meta.env.VITE_HOST

function App() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  const classifyMessage = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/predict`, {
        message: message
      });
      console.log(response.data.result);
      setResult(response.data.result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {

  }, [result])

  return (
    <div className='min-h-screen hauto w-full bg-black'>
      <div className='max-w-screen-xl mx-auto px-5 py-8'>

        <h1 className='text-3xl sm:text-5xl text-[#A435F0] font-bold text-center mb-20'>Spam Classifier</h1>
        <div className='w-full max-w-[30rem] mx-auto sm:max-w-screen-md sm:px-16 md:px-20'>

          <textarea
            className='w-full min-h-32 bg-gray-900 rounded-xl text-gray-200 placeholder:text-gray-500 py-1 px-3 font-semibold outline outline-2 outline-gray-500 focus:border-0 focus:outline-none focus:outline-[#A435F0]'
            value={message}
            onChange={handleInputChange}
            placeholder='Enter Your Message'
          />
          <button
            className='rounded-lg text-[#901ACA] px-8 sm:px-12 py-2 sm:py-3 my-4 bg-black border-2 border-[#901ACA] hover:text-[#A435F0] hover:border-[#A435F0] '
            onClick={classifyMessage}
          >Classify</button>
        </div>
        {result && <p className={`${result.toLowerCase() == "spam" ? "text-red-400" : "text-green-500"} font-semibold text-xl sm:text-2xl text-left my-4`}>Result: {result}</p>}
      </div>
    </div>
  )
}

export default App
