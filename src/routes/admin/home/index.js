import { h } from 'preact';
import { Container, Header, Card, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Helmet from 'preact-helmet';
import { HasScope } from '../../../components/has-scope';

export default function Home() {
	return (
		<Container>
			<Helmet title="Admin"/>
			<Header as="h1">Admin</Header>
			<p>
				View and edit administrative settings for this XMC instance, its users
				and its content in a centralized location.
			</p>
			<Divider hidden section/>
			<Card.Group centered>
				<HasScope scope="xmc.core/manage/page">
					<Card
						link
						as={Link}
						to="/admin/pages"
						header="Pages"
						description="Add, edit and remove pages written in XMCML."
					/>
				</HasScope>
				<Card
					link
					header="Users &amp; Roles"
					description="Manage users and assign roles."
				/>
				<Card
					link
					header="Contests &amp; Task Lists"
					description="Manage contests and task lists."
				/>
			</Card.Group>
		</Container>
	);
}
