import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type ScaleAppearanceAnimationOptions = {
	elements: HTMLElement[] | null | undefined
	container?: HTMLElement | null
	duration?: number
	stagger?: number
	immediate?: boolean
	fromScale?: number
}

export function scaleAppearanceAnimation({
	elements,
	container,
	duration = 1,
	stagger = 0.3,
	immediate = false,
	fromScale = 0.5,
}: ScaleAppearanceAnimationOptions) {
	if (!elements || elements.length === 0) return

	if (immediate) {
		gsap.fromTo(
			elements,
			{ scale: fromScale, opacity: 0 },
			{
				x: 0,
				y: 0,
				scale: 1,
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
		opacity: 0,
		scale: fromScale,
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
