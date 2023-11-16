'use client'
import React, { useState } from 'react'

export default function Home() {

  const [gender, setGender] = useState<string>("");
  const [birthDate, setBirthdate] = useState<string>("")
  const [month, setMonth] = useState<string>("1");
  const [time, setTime] = useState<string>("")
  const [resultData, setResultData] = useState(null);
  const [dayData, setDayData] = useState([])
  const [monthData, setMonthData] = useState(null)
  
  const birthChange = ((e: React.ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value;
    if(value.length < 9 && /^[0-9]*$/.test(value)){
      setBirthdate(value)
    }
  })

  const fetchData = async ()=> {
    const res = await fetch(`/api?gender=${gender}&birthdate=${birthDate}&month=${month}&time=${time}`);
    const data = await res.json();
    setResultData(data.result)
    const day = data.result.day
    setDayData(day)
  }

  return (
    <>
    <div className="w-full flex bg-blue-500 h-80">
      <div className="mx-auto px-20">
        <div className='text-center my-5 text-white'>
          <button onClick={()=>setGender('m')}>남자</button>
          <button className='ml-5' onClick={()=>setGender('f')}>여자</button>
        </div>
        <div className="text-center my-5">
          <span className='mr-5 text-white'>생년월일</span>
          <input type="text" onChange={birthChange} placeholder='생년월일(8자리)' value={birthDate}/>
        </div>
        <div className="text-center my-5">
          <span className='mr-16 text-white'>달</span>
          <select value={month} onChange={(e)=>setMonth(e.target.value)}>
            <option value="1">양력</option>
            <option value="2">음력 평달</option>
            <option value="3">음력 윤달</option>
          </select>
        </div>  
        <div className="text-center my-5">
          <span className='mr-12 text-white'>시간</span>  
          <select value={time} onChange={(e)=>setTime(e.target.value)}>
            <option value="">모름</option>
            <option value="0">23:30 - 01:29</option>
            <option value="1">1:30 - 03:29</option>
            <option value="2">3:30 - 05:29</option>
            <option value="3">5:30 - 07:29</option>
            <option value="4">7:30 - 09:29</option>
            <option value="5">9:30 - 11:29</option>
            <option value="6">11:30 - 13:29</option>
            <option value="7">13:30 - 15:29</option>
            <option value="8">15:30 - 17:29</option>
            <option value="9">17:30 - 19:29</option>
            <option value="10">19:30 - 21:29</option>
            <option value="11">21:30 - 23:29</option>
          </select>
        </div>
        <button className='mt-2 w-full h-12 border rounded-lg bg-yellow-300 hover:bg-yellow-400 transition-all duration-300' onClick={fetchData}>입력</button>
      </div>
      <div className="w-full text-center">
      </div>
    </div>
    </>
  )
}
