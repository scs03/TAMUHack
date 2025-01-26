'use client'

import React from 'react'
import Navbar from '@/components/navbar'
import { useState } from 'react';
import DoughnutChart from '@/components/doughnut';

const Dashboard = () => {

  const [data, setData] = useState([10, 20, 30, 40]);
  const [labels, setLabels] = useState(['Red', 'Blue', 'Yellow', 'Green']);

  return (
    
    <div className='overscroll-x-none'>

        <div className='w-full h-16  flex justify-center items-center text-lg '>
            EcoBack
        </div>
        <div className='bg-sky-900 h-24'>
            <h1 className='text-white text-4xl align-middle font-bold'>Welcome Back, Sriram!</h1>
        </div>

        <div className='w-full '>
            <div className='bg-sky-900 h-36 m-4 rounded-xl shadow-2xl'>
                <h1 className= 'font-light text-xl text-white p-4'>ESG score:   </h1>
                <div className='grid grid-cols-3'>
                    <div className='px-4 text-white front-light text-3xl columns-1 border-r'> 83</div>
                    <div className='col-span-2 px-4'>
                        <p></p> 
                        <p className='text-gray-300 '>Updated: Jan 25, 2025</p>
                    </div>
                </div>

            </div>

            <div className='border border-gray-300 mt-12 h-36 m-4 rounded-xl shadow-xl'>
                <DoughnutChart data={data} labels={labels} />

            </div>
        </div>



        <Navbar></Navbar>
    </div>
  )
}

export default Dashboard
