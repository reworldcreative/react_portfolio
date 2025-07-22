import { useRef } from 'react'
import { gsap } from 'gsap'
import './AnimatedText.scss'

type AnimatedTextProps = {
	readonly text: string
	readonly hoverColor?: string
}

export default function AnimatedText({ text, hoverColor }: AnimatedTextProps) {
	const overlayRef = useRef<HTMLSpanElement | null>(null)

	const handleMouseEnter = () => {
		if (overlayRef.current) {
			gsap.to(overlayRef.current, {
				width: '100%',
				duration: 0.7,
				ease: 'power2.out',
			})
		}
	}

	const handleMouseLeave = () => {
		if (overlayRef.current) {
			gsap.to(overlayRef.current, {
				width: '0%',
				duration: 0.7,
				ease: 'power2.out',
			})
		}
	}

	return (
		<span
			className='animated-text'
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onFocus={handleMouseEnter}
			onBlur={handleMouseLeave}
		>
			{text}

			<span
				ref={overlayRef}
				className='animated-text__overlay'
				aria-hidden='true'
				style={{
					color: hoverColor,
				}}
			>
				{text}
			</span>
		</span>
	)
}
