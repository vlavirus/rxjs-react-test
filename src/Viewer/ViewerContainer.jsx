import React, {useEffect, useState} from 'react'
import Viewer from './Viewer';
import {  Observable } from 'rxjs';

const minIntervalOfRenderObject = 600;
const minDelay = 100;
const maxDelay = 1500;

function getRandomNumber() {
	return ~~(Math.random() * 200)
}

function randomDelay(bottom, top) {
	return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
}

//Sensor Creator
const createSensor = () => {
	return new Observable(observer => {
		let timeout = null;
		(function push() {
			timeout = setTimeout(
				() => {
					observer.next(getRandomNumber());
					push();
				},
				randomDelay(minDelay, maxDelay)
			);
		})();
		return () => clearTimeout(timeout);
	})
}

//firs sensor
const sens1$ = createSensor();

const ViewerContainer = () => {
	const [state, setState] = useState();
	const [lastDataUpdate, setLastDataUpdate] = useState(null);

	useEffect(() => {
		const sub = sens1$.subscribe((res) => {
			if((Date.now() - lastDataUpdate) >= minIntervalOfRenderObject) {
				setState(res)
				setLastDataUpdate(Date.now())
			} else {
				console.log("Miss Update")
			}
		});
		return () => sub.unsubscribe();
	}, [state, lastDataUpdate])

	return (
		<Viewer state={state}/>
	)
}

export default ViewerContainer