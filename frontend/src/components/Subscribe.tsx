
import { Input } from "./ui/input"
import { Button } from "./ui/button";

function Subscribe() {
  return (
    <div className="bg-gray-100 px-4 py-7">
      <div className="flex flex-col gap-3 px-5 w-2/3">
      <h1 className="text-purple-600 font-bold text-3xl">Stay on top of crypto. All the time, any time.</h1>
      <p className="text-gray-500 font-semibold text-lg">Please keep me updated by email with the latest crypto news, research findings, reward programs, event updates, coin listings and more information from CoinPlus.</p>
      </div>
        <div className='flex items-center gap-3 w-2/3 p-5'>
        <Input 
        placeholder="Enter your email address"
        type="email"
        className="p-3 placeholder:font-semibold placeholder:text-xl"
         />
       <Button className='bg-purple-600 hover:bg-purple-400 font-semibold text-xl p-2'>Subscribe</Button>
        </div>
       
    </div>
  )
}

export default Subscribe