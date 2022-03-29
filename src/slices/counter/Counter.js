import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	toggle,
	selectBackdrop,
} from './backdropSlice';
import styles from './Counter.module.css';

export function Counter() {
	const count = useSelector(selectBackdrop);
	const dispatch = useDispatch();
	const [incrementAmount, setIncrementAmount] = useState('2');

	const incrementValue = Number(incrementAmount) || 0;

	return (
		<div>
			<div className={styles.row}>
				<button
					className={styles.button}
					aria-label="Decrement value"
					onClick={() => dispatch(toggle())}
				>
          -
				</button>
				<span className={styles.value}>{count}</span>
				<button
					className={styles.button}
					aria-label="Increment value"
					onClick={() => dispatch(toggle())}
				>
          +
				</button>
			</div>
			<div className={styles.row}>
				<input
					className={styles.textbox}
					aria-label="Set increment amount"
					value={incrementAmount}
					onChange={(e) => setIncrementAmount(e.target.value)}
				/>
				<button
					className={styles.button}
					onClick={() => dispatch(toggle(incrementValue))}
				>
          Add Amount
				</button>
				<button
					className={styles.asyncButton}
					onClick={() => dispatch(toggle(incrementValue))}
				>
          Add Async
				</button>
				<button
					className={styles.button}
					onClick={() => dispatch(toggle(incrementValue))}
				>
          Add If Odd
				</button>
			</div>
		</div>
	);
}
