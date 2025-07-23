import { appearanceAnimation } from '@/components/animations/AppearanceAnimation'
import { Link } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'

export default function HeaderNavigation() {
	const navRef = useRef<HTMLElement | null>(null)
	const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

	useEffect(() => {
		const elements = linkRefs.current.filter((el): el is HTMLAnchorElement => el !== null)
		if (elements.length === 0 || !navRef.current) return

		const scrollHeight = document.documentElement.scrollHeight
		const clientHeight = document.documentElement.clientHeight

		if (scrollHeight <= clientHeight) {
			requestAnimationFrame(() => {
				appearanceAnimation({
					elements,
					container: navRef.current,
					duration: 1,
					stagger: 0.3,
					immediate: true,
					direction: 'right',
				})
			})
		} else {
			requestAnimationFrame(() => {
				appearanceAnimation({
					elements,
					container: navRef.current,
					duration: 1,
					stagger: 0.3,
					direction: 'right',
				})
			})
		}
	}, [])

	return (
		<nav className='header__navigation' ref={navRef}>
			{['Home', 'About', 'Skills', 'Projects'].map((text, i) => (
				<Link to='/' key={text} ref={el => (linkRefs.current[i] = el)} style={{ opacity: 0 }}>
					{text}
				</Link>
			))}
		</nav>
	)
}
