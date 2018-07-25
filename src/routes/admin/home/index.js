import { h } from 'preact';
import { Container, Header as SHeader, Card, Divider, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Helmet from 'preact-helmet';
import { HasScope } from '../../../components/has-scope';
import { Header } from '../../../components/page/components/header'

export default function Home() {
	return (
		<main>
			<Helmet title="Admin"/>
			<Header
				title="Admin"
				subtitle="View and edit administrative settings for this XMC instance."
				right={<Button primary>Bottom text</Button>}
			>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris euismod dui tortor. Aenean at sagittis urna, placerat suscipit nulla. Donec tempus suscipit lorem id efficitur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer aliquet diam mattis, semper justo ut, tincidunt risus. Pellentesque cursus id neque sit amet malesuada.</p>
				<p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin sodales nisl a lectus lobortis, nec porta est congue. Donec convallis dui non massa egestas, a suscipit mi bibendum. Pellentesque luctus, enim eu convallis facilisis, est velit condimentum quam, id venenatis quam ipsum vitae lorem. Donec magna felis, tincidunt sed dui id, malesuada elementum dolor. Nullam non turpis urna. Aliquam pretium eros turpis, ac tristique metus vestibulum id. Proin ut mi vel odio auctor feugiat id at ipsum. Vestibulum non nisi ut ligula efficitur dapibus. Suspendisse vitae pharetra velit. Curabitur aliquam tristique dignissim. Nullam vitae est ac tortor viverra ultrices at vitae risus. Donec vitae nunc velit.</p>
			</Header>
			
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
		</main>
	);
}
