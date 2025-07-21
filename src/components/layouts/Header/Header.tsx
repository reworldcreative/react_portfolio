import { Link } from '@tanstack/react-router'
import Logo from '@/components/widgets/Logo'
import './Header.scss'

export default function Header() {
	return (
		<header className='header'>
			<Link to='/'>
				<Logo />
			</Link>

			<nav>
				<Link to='/'> Home </Link>
			</nav>
		</header>
	)
}
