import { h } from 'preact';
import { Container, Header, Card, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function Home() {
	return (
		<Container>
			<Header as="h1">Admin page</Header>
			<p>
				View and edit administrative settings for this XMC instance, its users
				and its content in a centralized location.
			</p>
			<Divider hidden section/>
			<Card.Group centered>
				<Card
					link
					as={Link}
					to="/admin/pages"
					header="Pages"
					description="Add, edit and remove pages written in XMCML."
				/>
				<Card
					link
					header="Users & Roles"
					description="Manage users and assign roles."
				/>
				<Card
					link
					header="Contests & Problems"
					description="Manage contests and add problems."
				/>
			</Card.Group>
		</Container>
	);
}
