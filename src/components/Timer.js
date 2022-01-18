import React, { useEffect, useState } from "react";

const Timer=()=>{
	const [time, setTime] = useState(90);
	const [second, setSecond] = useState(parseInt(time / 60));
	const [minute, setMinute] = useState(parseInt(time % 60));

	useEffect(()=>{
		if(time > 0) {
			const Counter = setInterval(() => {
				setTime(time-1);
				setSecond(parseInt(time / 60));
				if(minute <= 10){
					setMinute("0" + parseInt(time % 60));
				}else{
					setMinute(parseInt(time % 60));
				}
			}, 1000);
			return ()=>clearInterval(Counter);
		}
	})

	return(
		<div className={time > 10?"timer":"timer error"}>
			{second} : {minute}
		</div>
	)
}

export default Timer;