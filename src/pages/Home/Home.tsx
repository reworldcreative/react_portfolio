import reactLogo from '@/assets/react.svg'
import { useEffect, useRef, useState } from 'react'
import viteLogo from '/vite.svg'
import './Home.scss'
import { boxRevealAnimation } from '@/components/animations/BoxReveal'

export default function Home() {
	const [count, setCount] = useState(0)
	const boxRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (boxRef.current) {
			boxRevealAnimation({
				elements: [boxRef.current],
				container: boxRef.current,
				duration: 3,
				immediate: false,
			})
		}
	}, [])

	return (
		<>
			<div ref={boxRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<a href='https://vite.dev' target='_blank' rel='noreferrer'>
					<img src={viteLogo} className='logo' alt='Vite logo' />
				</a>

				<a href='https://react.dev' target='_blank' rel='noreferrer'>
					<img src={reactLogo} className='logo react' alt='React logo' />
				</a>
			</div>

			<h1>Portfolio</h1>

			<div className='card'>
				<button type='button' onClick={() => setCount(count => count + 1)}>
					count is {count}
				</button>

				<p>
					Edit <code>src/App.jsx</code> and save to test HMR
				</p>
			</div>

			<p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
		</>
	)
}
