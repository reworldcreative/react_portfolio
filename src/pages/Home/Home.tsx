import reactLogo from '@/assets/react.svg'
import { useState } from 'react'
import viteLogo from '/vite.svg'
import Logo from '@/components/widgets/Logo'
import './Home.scss'

export default function Home() {
	const [count, setCount] = useState(0)

	return (
		<>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<a href='https://vite.dev' target='_blank' rel='noreferrer'>
					<img src={viteLogo} className='logo' alt='Vite logo' />
				</a>

				<a href='https://react.dev' target='_blank' rel='noreferrer'>
					<img src={reactLogo} className='logo react' alt='React logo' />
				</a>
			</div>

			<h1>Portfolio</h1>
			<Logo />

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
