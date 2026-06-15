import { NavLink } from 'react-router-dom'

function Error({
	title = '404',
	subtitle = "Oops! La page que vous demandez",
	subtitle2 = "n'existe pas.",
}) {
	return (
		<section className="error">
			<span className="error__title">{title}</span>
			<span className="error__subtitle">
				{subtitle} {subtitle2}

			</span>
			<NavLink className="error__link" to="/">
				Retourner sur la page d'accueil
			</NavLink>
		</section>
	)
}

export default Error