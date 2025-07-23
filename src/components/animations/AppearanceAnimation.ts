import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type AppearanceAnimationOptions = {
	elements: HTMLElement[] | null | undefined
	container?: HTMLElement | null
	duration?: number
	stagger?: number
	immediate?: boolean
	direction?: 'up' | 'right'
}

export function appearanceAnimation({
	elements,
	container,
	duration = 1,
	stagger = 0.3,
	immediate = false,
	direction = 'up',
}: AppearanceAnimationOptions) {
	if (!elements || elements.length === 0) return
	let fromVars: { x: number; y: number } = { x: 0, y: 0 }

	switch (direction) {
		case 'up':
			fromVars = { y: 50, x: 0 }
			break
		case 'right':
			fromVars = { x: -50, y: 0 }
			break
	}

	if (immediate) {
		gsap.fromTo(
			elements,
			{ ...fromVars, opacity: 0 },
			{
				x: 0,
				y: 0,
				opacity: 1,
				duration,
				ease: 'power2.out',
				stagger,
			}
		)

		return
	}

	if (!container) return

	gsap.from(elements, {
		...fromVars,
		opacity: 0,
		duration,
		ease: 'power2.out',
		stagger,
		scrollTrigger: {
			trigger: container,
			start: 'top 80%',
			toggleActions: 'play none none none',
		},
	})
}
