import React, {useEffect, useState} from 'react'
import {Viewer} from './Viewer';
import { Observable, zip, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

const MIN_DELAY = 200;
const MAX_DELAY = 1800;

function getRandomNumber() {
	return ~~(Math.random() * 200)
}

function randomDelay(bottom, top) {
	return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
}

const createCustomStream = () => {
	return new Observable(observer => {
		let timeout = null;
		(function push() {
			timeout = setTimeout(
				() => {
					observer.next(getRandomNumber());
					push();
				},
				randomDelay(MIN_DELAY, MAX_DELAY)
			);
		})();
		
		return () => clearTimeout(timeout);
		}).pipe(
			timeout(1500),
			catchError(() => of('no data'))
		)
}

const ViewerContainer = () => {
	const [state, setState] = useState([]);

	useEffect(() => {
		const main$ = zip(
			createCustomStream(),
			createCustomStream(),
			createCustomStream(),
			createCustomStream()
		)
		const subscribe = main$.subscribe(val => setState(val))
		
		return () => subscribe.unsubscribe()
	}, [state])

	return (
		<Viewer state={state} sensorsNames={['A', 'B', 'C', 'D']}/>
	)
}

export { ViewerContainer };