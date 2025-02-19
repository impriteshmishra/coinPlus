import { useState } from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { Input } from './ui/input'
import { Label } from "@radix-ui/react-label";
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { toast } from "sonner"
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/authSlice';

import axios from 'axios';

function Signin() {
  interface InputState {
    email: string;
    password: string;
  }

  interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  }

  interface ResponseData {
    success: boolean;
    message: string;
    user: User;
  }

  const [input, setInput] = useState<InputState>({
    email: "",
    password: "",
  });


  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const signinHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.email || !input.password) {
      toast.error("Please enter both email and password.")
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post<ResponseData>("https://coinplus.onrender.com/api/v1/user/login", input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      console.log(res.data);
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
        setInput({
          email: "",
          password: ""
        })
      }
    } catch (err: unknown) {
      console.log(err);
  
      let errorMessage = "Something went wrong!";
      
      
      if ((err as any)?.response) {
        const errorResponse = (err as any).response?.data?.message;
        
        if ((err as any).response?.status === 401) {
          errorMessage = "Invalid email or password.";
        } else if ((err as any).response?.status === 400) {
          errorMessage = errorResponse || "Bad request!";
        } else {
          errorMessage = errorResponse || "Server error!";
        }
      }
  
      toast.error(errorMessage);
    } 
    
    finally {
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
          <p className="text-sm text-center">Sign in to explore coin.</p>
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
          <Link to="/signup" className="text-purple-700 font-bold">
            Join now
          </Link>
        </span>
      </form>
    </div>
  )
}

export default Signin