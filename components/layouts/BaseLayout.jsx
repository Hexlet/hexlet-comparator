// @ts-check
import routes from 'lib/routes.js';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Link from 'next/link';
import {
  Container, Navbar, Nav,
} from 'react-bootstrap';
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
            <Link href={routes.schoolsPath()} passHref>
              <Nav.Link>{t('navbar.schools')}</Nav.Link>
            </Link>
            <Link href={routes.professionsPath()} passHref>
              <Nav.Link>{t('navbar.professions')}</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const CustomFooter = () => (
  <footer className="bg-light border-top mt-auto py-5">
    <div className="container-xl">
      <div className="row justify-content-lg-around">
        <div className="col-sm-6 col-md-4 col-lg-auto">
          <div className="fs-4 mb-2">Hexlet ©</div>
          <ul className="list-unstyled">
            <li>
              <Link className="link-dark" href={routes.aboutPath()}>О проекте</Link>
            </li>
            <li>
              <a className="link-dark" target="_blank" rel="noreferrer" href="https://github.com/Hexlet/hexlet-comparator">Исходный код</a>
            </li>
            <li>
              <a className="link-dark" target="_blank" rel="noopener noreferrer" href="https://slack-ru.hexlet.io/">Slack #hexlet-volunteers</a>
            </li>
          </ul>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-auto">
          <div className="fs-4 mb-2">Помощь</div>
          <ul className="list-unstyled">
            <li>
              <a target="_blank" rel="noopener noreferrer" className="link-dark" href="https://ru.hexlet.io/blog/categories/success">Истории успеха</a>
            </li>
            <li>
              <a className="link-dark" target="_blank" rel="noopener noreferrer" href="https://github.com/Hexlet/ru-test-assignments">Тестовые задания</a>
            </li>
            <li>
              <a className="link-dark" target="_blank" rel="noopener noreferrer" href="https://ru.hexlet.io/courses/employment">Курс по трудоустройству</a>
            </li>
          </ul>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-auto">
          <div className="fs-4 mb-2">Дополнительно</div>
          <ul className="list-unstyled">
            <li>
              <a target="_blank" rel="noopener noreferrer" className="link-dark" href="https://ru.code-basics.com/">Основы программирования</a>
            </li>
            <li>
              <a target="_blank" rel="noopener noreferrer" className="link-dark" href="https://codebattle.hexlet.io/">КодБатл (Игра для прокачки)</a>
            </li>
            <li>
              <a target="_blank" rel="noopener noreferrer" className="link-dark" href="https://guides.hexlet.io/">Гайды для программистов</a>
            </li>
            <li>
              <a target="_blank" rel="noopener noreferrer" className="link-dark" href="https://ru.hexlet.io/pages/recommended-books">Рекомендуемые книги</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

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
      <CustomFooter />
    </>
  );
};

export default BaseLayout;
