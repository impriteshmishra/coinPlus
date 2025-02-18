import React, { useState } from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { Input } from './ui/input'
import { Label } from "@radix-ui/react-label";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "sonner"

function Signup() {
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const signinHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3500/api/v1/user/register", input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      console.log(res.data);
      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
        setInput({
          firstname: "",
          lastname: "",
          email: "",
          password: ""
        })
      }


    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form
        onSubmit={signinHandler}
        className="shadow-lg flex flex-col gap-5 p-8 border border-purple-700 rounded-lg"
      >
        <div>
          <h1 className="text-center font-bold text-xl  text-purple-700 italic">coinPlus</h1>
          <p className="text-sm text-center">Join <span className='text-purple-700 italic'>coinPlus</span> to explore coin.</p>
        </div>
        <div>
          <Label className='font-medium'>Firstname</Label>
          <Input
            type="firstname"
            name="firstname"
            value={input.firstname}
            onChange={changeEventHandler}
            className='focus-visible:ring-transparent my-2'
          />
        </div>
        <div>
          <Label className='font-medium'>Lastname</Label>
          <Input
            type="lastname"
            name="lastname"
            value={input.lastname}
            onChange={changeEventHandler}
            className='focus-visible:ring-transparent my-2'
          />
        </div>
        <div>
          <Label className="font-medium">Email</Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        <div>
          <Label className="font-medium">Password</Label>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        {loading ? (
          <Button className="bg-purple-700 hover:bg-white hover:text-purple-700 hover:border border-purple-700">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait.
          </Button>
        ) : (
          <Button type="submit" className="bg-purple-700 hover:bg-white hover:text-purple-700 hover:border border-purple-700">Sign in</Button>
        )}
        <span className="text-center">
          New to coinPlus?{" "}
          <Link to="/login" className="text-purple-700 font-bold">
            Join now
          </Link>
        </span>
      </form>
    </div>
  )
}

export default Signup