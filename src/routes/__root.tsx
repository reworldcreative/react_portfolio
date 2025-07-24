import Header from '@/components/layouts/Header/Header'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
	component: () => (
		<>
			<Header />

			<main className='main'>
				<Outlet />
			</main>

			<TanStackRouterDevtools />
		</>
	),
})
