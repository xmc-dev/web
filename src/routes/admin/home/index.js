import { h } from 'preact';
import {
	Container,
	Header as SHeader,
	Card,
	Divider,
	Button
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Helmet from 'preact-helmet';
import { HasScope } from '../../../components/has-scope';
import { Header } from '../../../components/page/components/header';

export default function Home() {
	return (
		<main>
			<Helmet title="Admin"/>
			<Header
				title="Admin"
				subtitle="View and edit administrative settings for this XMC instance."
				right={<Button primary>Bottom text</Button>}
			/>

			<Card.Group centered>
				<HasScope scope="xmc.core/manage/page">
					<Card
						link
						className="luchian press-animation gray-description"
						as={Link}
						to="/admin/pages"
						header="Pages"
						description="Add, edit and remove pages written in XMCML."
					/>
				</HasScope>
				<Card
					link
					className="luchian press-animation gray-description"
					header="Users &amp; Roles"
					description="Manage users and assign roles."
				/>
				<Card
					link
					className="luchian press-animation gray-description"
					header="Contests &amp; Task Lists"
					description="Manage contests and task lists."
				/>
			</Card.Group>
		</main>
	);
}
