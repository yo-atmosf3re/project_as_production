import React from 'react';
import classes from './Counter.module.scss';

export const Counter = () => {

   const [count, setCount] = React.useState<number>(0);

   const decrement = () => count !== 0 && setCount(prev => prev - 1)

   return (
      <>
         <div>{count}</div>
         <button className={classes.button} onClick={() => { setCount(prev => prev + 1) }}>+</button>
         <button className={classes.button} onClick={decrement}> -</button >
      </>
   )
}