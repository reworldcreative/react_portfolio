import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type BoxRevealAnimationOptions = {
	elements: HTMLElement[] | null | undefined
	container?: HTMLElement | null
	duration?: number
	stagger?: number
	immediate?: boolean
	fromClip?: string // стартова форма
	toClip?: string // фінальна форма
}

export function boxRevealAnimation({
	elements,
	container,
	duration = 1.5,
	stagger = 0.2,
	immediate = false,
	fromClip = 'inset(0 100% 0 0)',
	toClip = 'inset(0 0% 0 0)',
}: BoxRevealAnimationOptions) {
	if (!elements || elements.length === 0) return

	if (immediate) {
		gsap.fromTo(
			elements,
			{ clipPath: fromClip },
			{
				clipPath: toClip,
				duration,
				ease: 'power2.out',
				stagger,
			}
		)
		return
	}

	if (!container) return

	gsap.fromTo(
		elements,
		{ clipPath: fromClip },
		{
			clipPath: toClip,
			duration,
			ease: 'power2.out',
			stagger,
			scrollTrigger: {
				trigger: container,
				start: 'top 80%',
				toggleActions: 'play none none none',
			},
		}
	)
}
