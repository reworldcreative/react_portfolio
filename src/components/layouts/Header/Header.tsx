import { Link } from '@tanstack/react-router'
import Logo from '@/components/widgets/Logo'
import HeaderNavigation from './HeaderNavigation/HeaderNavigation'
import './Header.scss'
import { scaleAppearanceAnimation } from '@/components/animations/ScaleAnimation'
import { useEffect, useRef } from 'react'

export default function Header() {
	const logoRef = useRef<HTMLAnchorElement | null>(null)

	useEffect(() => {
		const element = logoRef.current
		if (!element) return

		const scrollHeight = document.documentElement.scrollHeight
		const clientHeight = document.documentElement.clientHeight

		if (scrollHeight <= clientHeight) {
			scaleAppearanceAnimation({
				elements: [element],
				container: element,
				immediate: true,
				fromScale: 0.2,
			})

			return
		}

		requestAnimationFrame(() => {
			scaleAppearanceAnimation({
				elements: [element],
				container: element,
				fromScale: 0.2,
			})
		})
	}, [])

	return (
		<header className='header'>
			<div className='header__wrapper'>
				<Link to='/' ref={logoRef}>
					<Logo isAnimated />
				</Link>

				<HeaderNavigation />
			</div>
		</header>
	)
}
