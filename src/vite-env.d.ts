/// <reference types="vite/client" />

declare module '*.svg' {
	import { FC, SVGProps, FunctionComponent, SVGAttributes } from 'react'

	const content: FC<SVGProps<SVGSVGElement>> | FunctionComponent<SVGAttributes<SVGElement>>
	export default content
}
