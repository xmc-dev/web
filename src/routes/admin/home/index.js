import { h } from 'preact';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Title } from '../../../components/title';
import { Text, Localizer } from 'preact-i18n';
import { HasScope } from '../../../components/has-scope';
import { Header } from '../../../components/page/components/header';

export default function Home() {
	return (
		<main>
			<Title id="admin.title"/>
			<Header
				title={<Text id="admin.title"/>}
				subtitle={<Text id="admin.subtitle"/>}
			/>

			<Card.Group centered>
				<HasScope scope="xmc.core/manage/page">
					<Localizer>
						<Card
							link
							className="luchian press-animation gray-description"
							as={Link}
							to="/admin/pages"
							header={<Text id="admin.pages.title"/>}
							description={<Text id="admin.pages.subtitle"/>}
						/>
					</Localizer>
				</HasScope>
				<Localizer>
					<Card
						link
						className="luchian press-animation gray-description"
						header={<Text id="admin.users.title"/>}
						description={<Text id="admin.users.subtitle"/>}
					/>
				</Localizer>
				<Localizer>
					<Card
						link
						className="luchian press-animation gray-description"
						header={<Text id="admin.task-lists.title"/>}
						description={<Text id="admin.task-lists.subtitle"/>}
					/>
				</Localizer>
			</Card.Group>
		</main>
	);
}
