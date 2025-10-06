import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from 'react-router';
import api from '@/libs/axios.js';
import { useState } from "react"

export function SignupForm({
  className,
  ...props
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const res = await api.post("/auth/register", {
          name,
          email,
          password,
        });
        localStorage.setItem("token", res.data.token);
        navigate("/"); // go to homepage after login
      } catch (err) {
        console.log(err.message);
        alert(err.response?.data?.message || "Registration failed");
      }
    };
  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Register</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="John Doe" required value={name} onChange={(e) => setName(e.target.value)}/>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required value={password} onChange={(e)=> setPassword(e.target.value)}/>
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already Have an Account?{" "}
              <Link to={"/login"}>
                <span className="underline underline-offset-4 cursor-pointer">Login</span>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
