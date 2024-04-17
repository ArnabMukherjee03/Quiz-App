import React, { useEffect } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


export const Timer = ({maxValue=10,setCountDown,countDown,setIndex,optionArray }:{
  maxValue: number
  setCountDown : React.Dispatch<React.SetStateAction<number>>,
  countDown: number,
  setIndex: React.Dispatch<React.SetStateAction<number>>,
  optionArray: React.MutableRefObject<HTMLElement | null>[]
}) => {
  
  useEffect(() => {
    if (countDown < maxValue) {
      const interval = setInterval(() => {
        setCountDown(countDown + 1);
      }, 1000);
      return () => clearInterval(interval);
    }else if(countDown === maxValue){
      setIndex(prev=> prev+1)
      optionArray.map((option) => {
        option.current?.classList.remove("bg-green-300");
        option.current?.classList.remove("bg-red-300");
      });
    }
  }, [setCountDown,countDown,maxValue,setIndex,optionArray]);

  


  return (
    <div className="w-8 h-8">
      <CircularProgressbar
        value={countDown}
        maxValue={maxValue}
        text={countDown.toString()}
        styles={buildStyles({
          pathColor: "#90EE90"
        })}
      />
    </div>
  );
};
