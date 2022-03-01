// @ts-check

import React from 'react';
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
    <Navbar className="flex-shrink-0" bg="light" expand="lg">
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

const CustomFooter = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-light border-top mt-auto py-5 flex-shrink-0">
      <div className="container-xl">
        <div className="row justify-content-lg-around">
          <div className="col-sm-6 col-md-4 col-lg-auto">
            <div className="fs-4 mb-2">{t('footer.logo')}</div>
            <ul className="list-unstyled">
              <li>
                <Link href={routes.aboutPath()}>
                  <a className="link-dark">
                    {t('footer.about')}
                  </a>
                </Link>
              </li>
              <li>
                <a className="link-dark" target="_blank" rel="noreferrer" href="https://github.com/Hexlet/hexlet-comparator">{t('footer.source_code')}</a>
              </li>
              <li>
                <a className="link-dark" target="_blank" rel="noopener noreferrer" href="https://slack-ru.hexlet.io/">{t('footer.slack')}</a>
              </li>
            </ul>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-auto">
            <div className="fs-4 mb-2">{t('footer.help')}</div>
            <ul className="list-unstyled">
              <li>
                <a target="_blank" rel="noopener noreferrer" className="link-dark" href="https://ru.hexlet.io/blog/categories/success">{t('footer.success_story')}</a>
              </li>
              <li>
                <a className="link-dark" target="_blank" rel="noopener noreferrer" href="https://github.com/Hexlet/ru-test-assignments">{t('footer.test_tasks')}</a>
              </li>
              <li>
                <a className="link-dark" target="_blank" rel="noopener noreferrer" href="https://ru.hexlet.io/courses/employment">{t('footer.employment_course')}</a>
              </li>
            </ul>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-auto">
            <div className="fs-4 mb-2">{t('footer.additional')}</div>
            <ul className="list-unstyled">
              <li>
                <a target="_blank" rel="noopener noreferrer" className="link-dark" href="https://ru.code-basics.com/">{t('footer.basics')}</a>
              </li>
              <li>
                <a target="_blank" rel="noopener noreferrer" className="link-dark" href="https://codebattle.hexlet.io/">{t('footer.code_battle')}</a>
              </li>
              <li>
                <a target="_blank" rel="noopener noreferrer" className="link-dark" href="https://guides.hexlet.io/">{t('footer.guides')}</a>
              </li>
              <li>
                <a target="_blank" rel="noopener noreferrer" className="link-dark" href="https://ru.hexlet.io/pages/recommended-books">{t('footer.recommended_books')}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

const BaseLayout = (props) => {
  const { children } = props;
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-vh-100 d-flex flex-column">
        <CustomNavbar />
        <main className="container my-5 flex-grow-1">
          {children}
        </main>
        <CustomFooter />
      </div>
    </>
  );
};

export default BaseLayout;
