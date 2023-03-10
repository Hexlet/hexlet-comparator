import React from 'react';
import { useRouter } from 'next/router';
import { Container, Breadcrumb } from 'react-bootstrap';
import { upperFirst, strReplace } from 'lib/utils.js';

const NextBreadcrumb = () => {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const { pathname } = new URL(router.asPath, baseUrl);
  const getBreadcrumbs = (pathName) => {
    const partsPath = pathName.split('/').filter((part) => part.length);
    const crumbs = partsPath.map((part, idx) => {
      const href = `/${partsPath.slice(0, idx + 1).join('/')}`;
      const text = part;
      const id = idx + 1;
      return { text, href, id };
    });
    return [{ text: 'Home', href: '/', id: 0 }, ...crumbs];
  };
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <Container>
      <Breadcrumb>
        {
          (breadcrumbs.length > 1)
            ? breadcrumbs.map((crumb, idx) => {
              const { href, id } = crumb;
              let { text } = crumb;
              text = strReplace(text, '%20', ' ');
              return (
                <Breadcrumb.Item href={href} key={id} active={idx === breadcrumbs.length - 1}>
                  { upperFirst(text) }
                </Breadcrumb.Item>
              );
            })
            : ''
          }

      </Breadcrumb>
    </Container>
  );
};

export default NextBreadcrumb;
