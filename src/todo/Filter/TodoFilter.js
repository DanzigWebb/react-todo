import React, { useState } from 'react'
import './TodoFilter.css';
import { Search$ } from './FilterStreams'


export default function TodoFilter() {
  const [value, setValue] = useState('')

  function onChange(value) {
    Search$.next(value)
    setValue(value)
  }

  return (
    <input className="filter__input" type="text" placeholder="search..." value={value} onChange={({target}) => onChange(target.value)}/>
  )
}