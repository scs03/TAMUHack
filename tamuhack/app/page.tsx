'use client'
import { Card } from "@mui/material";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    //Mobile Sign in Page
    <div className="flex flex-col h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <Card className="w-80 p-4">
          <h1 className="text-2xl font-bold">Sign in</h1>
          <input
            className="w-full mt-4 p-2 border border-gray-300 rounded"
            placeholder="Email"
          />
          <input
            className="w-full mt-4 p-2 border border-gray-300 rounded"
            placeholder="Password"
          />
          <button className="w-full mt-4 p-2 border border-gray-300 rounded"
            onClick = {() => {router.push('/dashboard')}}
          >
            Sign in
          </button>
        </Card>
      </div>
    </div>
  );
}
