// @ts-check
import routes from 'lib/routes.js';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Link from 'next/link';
import { Container, Navbar, Nav } from 'react-bootstrap';
// import Image from 'next/image';

const CustomNavbar = () => {
  const { t } = useTranslation('common');
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">{t('navbar.brand')}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href={routes.professionsPath()} passHref>
              <Nav.Link>{t('navbar.professions')}</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const BaseLayout = (props) => {
  const { children } = props;
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{ t('title') }</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CustomNavbar />
      <main className="container mt-5">
        {children}
      </main>
      <footer className="container pt-4 my-md-5 pt-md-5 border-top">
        <ul className="list-unstyled text-small">
          <li><a target="_blank" rel="noreferrer" href="https://github.com/Hexlet/hexlet-comparator">Исходный код</a></li>
        </ul>
      </footer>
    </>
  );
};

export default BaseLayout;
