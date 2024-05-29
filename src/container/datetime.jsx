import React from 'react';
import {localTime} from "../container/logic"

function Datetime({ weather: {dt,timezone} }) {
  return (
    <div>
        <div className="flex flex-row items-center justify-center space-x-2 text-red-200 text-5m ">
                            <div className="flex flex-row space-x-1">
                                <p className="font-light">{localTime(dt,timezone)}</p>
                               
                            </div>

                        </div>
    </div>
  )
}

export default Datetime

