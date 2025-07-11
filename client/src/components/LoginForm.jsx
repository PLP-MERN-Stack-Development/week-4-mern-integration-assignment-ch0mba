import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"

export default function LoginForm({ onLogin }) {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state

        if (!email.trim() || !password.trim()) {
            alert("Please fill in both fields");
            return;
        }

        try {
            await onLogin({ email, password });
            // reset form fields only on successful login
            setEmail("");
            setPassword("");

        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
            console.error('Login error:', err);
        }
        if (!email.trim() || !password.trim()){
            alert("Please fill in both fields");
            return;
        }
    };

    return (
        <Card className="w-full max-w-sm mx-auto mt-10">
         <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
          Enter your email and password below to login to your account
         </CardDescription>
        <CardAction>
          <a href="/register" className="text-white-600 hover:underline"> Sign up</a>
        </CardAction>
      </CardHeader>
      <CardContent></CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <div className="error-message">{error}</div>}
            <Button type="submit" className="btn btn-primary">Login</Button>
        </form>
        </Card>
    );
}