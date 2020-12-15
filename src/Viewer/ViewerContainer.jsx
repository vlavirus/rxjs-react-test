import React, {useEffect, useState} from 'react'
import {Viewer} from './Viewer';
import { Observable, zip, of } from 'rxjs';
import { catchError, mapTo, pipe, timeout } from 'rxjs/operators'
const minIntervalOfRenderObject = 600;
const minDelay = 100;
const maxDelay = 2000;

function getRandomNumber() {
	return ~~(Math.random() * 200)
}

function randomDelay(bottom, top) {
	return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
}

const createSensor = () => {
	const stream$ =  new Observable(observer => {
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

	return stream$.pipe(
		timeout(1500),
		catchError(() => of(undefined).pipe(mapTo('no data')))
	)
}


const sens1$ = createSensor();

const ViewerContainer = () => {
	const [state, setState] = useState([]);

	useEffect(() => {
		const main$ = createSensor()
		const subscribe = main$.subscribe(val => console.log(val))
		
		return () => subscribe.unsubscribe()
	})

	return (
		<Viewer state={state}/>
	)
}

export { ViewerContainer };