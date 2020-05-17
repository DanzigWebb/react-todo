import React, { useState } from 'react'
import './TodoFilter.css';
import { Search$ } from './FilterStreams'


export default function TodoFilter() {
  const [value, setValue] = useState('')

  function onChange(value) {
    Search$.next(value)
    setValue(value)
  }
  function reset() {
    Search$.next('')
    setValue('')
  }

  return (
    <div className="filter">
      <input className="filter__input" type="text" placeholder="search..." value={value} onChange={({target}) => onChange(target.value)}/>
      <button className="filter__btn" onClick={() => reset()}>Reset</button>
    </div>
  )
}