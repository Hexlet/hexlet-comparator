// @ts-check

import React from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import routes from 'lib/routes.js';

import Head from 'next/head';
// import Image from 'next/image';

const Navbar = () => {
  const vdom = (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">Сравниватель</a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href={routes.schoolsPath()}>
                <a className="nav-link active" aria-current="page">Школы</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
  return vdom;
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
      <Navbar />
      <main className="container mt-5">
        {children}
      </main>
    </>
  );
};

// export const getStaticProps = async ({ locale }) => {
//   const result = {
//     props: {
//       ...(await serverSideTranslations(locale, ['common'])),
//     },
//   };
//   return result;
// };

export default BaseLayout;
