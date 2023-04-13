import React, { useReducer, useState } from 'react'

const month = new Date().getMonth()

const year = new Date().getFullYear()

const months = [ 'January', 'February', 'March', 'April', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December']

const types = {
    addMonth: 'addMonth',
    susMonth: 'susMonth',
    addYear: 'addYear',
    susYear: 'susYear',
}

const initialValue = { month: month, year: year }

const reducer = (state, action) => {
    let currentMonth = state.month
    let currentYear = state.year
    console.log(action.payload)

    switch(action.type){
        case types.addMonth:
            currentMonth = currentMonth === 11 ? 0 : currentMonth + 1
            currentMonth === 0 && ++currentYear
            break
        case types.susMonth:
            currentMonth = currentMonth === 0 ? 11 : currentMonth - 1
            currentMonth === 11 && --currentYear
            break
        case types.addYear:
            currentYear += action.payload
            break
        case types.susYear:
            currentYear -= action.payload
            break
    }
    return {month: currentMonth, year: currentYear}
}

function Calendar() {
    const [date, dispatch] = useReducer(reducer, initialValue )
    const [units, setUnits] = useState(1)
  return (
    <>
        <div style={ 
            ( date.year < year ) 
            ? { color:'red' } 
            : ( date.year > year ) 
            ? { color:'grey' }
            : { color:'green' }
            }>
            { months[date.month] } { date.year }
        </div>
      
      <div>
        Months: 
        <button onClick={() => dispatch({ type: types.susMonth })}>-</button>
        <button onClick={() => dispatch({ type: types.addMonth })}>+</button>
      </div>
      <div>
        Years: 
        <input type='number' value={ units } onChange={ (e) => setUnits(e.target.value)}/>
        <button onClick={() => dispatch({ type: types.susYear, payload:Number(units) })}>-</button>
        <button onClick={() => dispatch({ type: types.addYear,payload:Number(units) })}>+</button>
      </div>
    </>
  )
}

export default Calendar
