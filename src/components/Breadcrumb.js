import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

function Breadcrumb() {
	const breadcrumbs = useBreadcrumbs();

	return (
		<Breadcrumbs aria-label='breadcrumb'>
			{breadcrumbs.map(({ breadcrumb, match, location, key }, index) => (
				<Link
					color='inherit'
					to={key}
					key={index}
					style={{
						textDecoration: 'none',
						color: location.pathname === match.pathname ? 'red' : 'default',
					}}
				>
					{breadcrumb.props.children}
				</Link>
			))}
		</Breadcrumbs>
	);
}

export default Breadcrumb;
