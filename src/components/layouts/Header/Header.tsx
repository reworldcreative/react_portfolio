import { Link } from '@tanstack/react-router'
import Logo from '@/components/widgets/Logo'
import './Header.scss'
import AnimatedText from '@/components/animations/AnimatedText'

export default function Header() {
	return (
		<header className='header'>
			<Link to='/'>
				<Logo />
			</Link>

			<nav className='header__navigation'>
				<Link to='/'> Home </Link>
				<Link to='/'> About </Link>
				<Link to='/'> Skills </Link>
				<Link to='/' className='no-animated'> Projects </Link>
				<Link to='/'>
					<AnimatedText text='Hover Me' hoverColor='var(--accent)' />
				</Link>
			</nav>
		</header>
	)
}
