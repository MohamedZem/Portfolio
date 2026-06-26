import { NavLink } from 'react-router-dom'

function Error({
	title = '404',
	subtitle = "Oops! La page que vous demandez",
	subtitle2 = "n'existe pas.",
}) {
	return (
		<main className="error">
			<h2 className="error__title">{title}</h2>
			<p className="error__subtitle">
				{subtitle} {subtitle2}

			</p>
			<NavLink 
				className="error__link" to="/"
				aria-label="Retourner à la page d'accueil"
			>
				Retourner sur la page d'accueil
			</NavLink>
		</main>
	)
}

export default Error