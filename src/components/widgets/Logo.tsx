export default function SVGLogo({ isAnimated = false }: { readonly isAnimated?: boolean }) {
	return (
		<svg width={35} height={50} viewBox='0 0 35 50' xmlns='http://www.w3.org/2000/svg'>
			<defs>
				<linearGradient id='grad-sigma' x1='0%' y1='0%' x2='100%' y2='100%'>
					<stop offset='0%' stopColor='#5B0082' stopOpacity='1'>
						{Boolean(isAnimated) && (
							<animate attributeName='offset' values='0;0.3;0' dur='7s' repeatCount='indefinite' />
						)}
					</stop>

					<stop offset='30%' stopColor='#7F00FF' stopOpacity='1'>
						{Boolean(isAnimated) && (
							<animate attributeName='offset' values='0.2;1;0.2' dur='7s' repeatCount='indefinite' />
						)}
					</stop>

					<stop offset='100%' stopColor='#00CED1' stopOpacity='1'>
						{Boolean(isAnimated) && <animate attributeName='offset' values='1;2;1' dur='7s' repeatCount='indefinite' />}
					</stop>
				</linearGradient>

				<linearGradient id='grad-r' x1='0%' y1='0%' x2='100%' y2='100%'>
					<stop offset='0%' stopColor='#DAA520' stopOpacity='1'>
						{Boolean(isAnimated) && <animate attributeName='offset' values='0;1;0' dur='7s' repeatCount='indefinite' />}
					</stop>

					<stop offset='50%' stopColor='#FFDB58' stopOpacity='1'>
						{Boolean(isAnimated) && (
							<animate attributeName='offset' values='0.2;1;0.2' dur='7s' repeatCount='indefinite' />
						)}
					</stop>

					<stop offset='100%' stopColor='#FBEC5D' stopOpacity='1'>
						{Boolean(isAnimated) && <animate attributeName='offset' values='1;2;1' dur='7s' repeatCount='indefinite' />}
					</stop>
				</linearGradient>
			</defs>

			<text x={0} y={50} fontFamily="'Audiowide', monospace" fontSize={60} fill='url(#grad-sigma)'>
				{'\u03A3'}
			</text>

			<text x={20} y={52} fontFamily="'Electrolize', monospace" fontSize={38} fill='url(#grad-r)'>
				r
			</text>
		</svg>
	)
}
