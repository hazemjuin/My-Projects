import React from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsFillBellFill } from 'react-icons/bs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

function Home() {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <div className='home-container'>
      <header className='home-header'>
        <h1 className='home-title'>Dashboard</h1>
      </header>

      <div className='home-cards'>
        <div className='home-card'>
          <div className='card-inner'>
            <BsFillArchiveFill className='card-icon' />
            <h3 className='card-title'>Admins</h3>
          </div>
          <p className='card-value'>300</p>
        </div>
        <div className='home-card'>
          <div className='card-inner'>
            <BsFillGrid3X3GapFill className='card-icon' />
            <h3 className='card-title'>Categories</h3>
          </div>
          <p className='card-value'>12</p>
        </div>
        <div className='home-card'>
          <div className='card-inner'>
            <BsFillBellFill className='card-icon' />
            <h3 className='card-title'>Alerts</h3>
          </div>
          <p className='card-value'>42</p>
        </div>
      </div>

      <div className='home-charts'>
        <div className='chart'>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='pv' fill='#007bff' />
              <Bar dataKey='uv' fill='#28a745' />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className='chart'>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type='monotone' dataKey='pv' stroke='#007bff' activeDot={{ r: 8 }} />
              <Line type='monotone' dataKey='uv' stroke='#28a745' />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Home;