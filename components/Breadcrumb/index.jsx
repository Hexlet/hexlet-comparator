import React from 'react';
import { Container, Breadcrumb } from 'react-bootstrap';
import { upperFirst, strReplace } from 'lib/utils.js';

const prepareBreadcrumbs = (breadcrumbs) => {
  const crumbs = breadcrumbs.map((crumb, idx) => {
    const href = `/${breadcrumbs.slice(0, idx + 1).join('/')}`;
    const text = upperFirst(strReplace(crumb, '%20', ' '));
    const id = idx + 1;
    return { text, href, id };
  });

  return [{ text: 'Home', href: '/', id: 0 }, ...crumbs];
};

const NextBreadcrumb = ({ breadcrumbs }) => {
  const preparedBreadcrumbs = prepareBreadcrumbs(breadcrumbs);

  return (
    <Container>
      <Breadcrumb>
        {
          preparedBreadcrumbs.map(({ text, href, id }, idx) => (
            <Breadcrumb.Item href={href} key={id} active={idx === breadcrumbs.length - 1}>
              { text }
            </Breadcrumb.Item>
          ))
        }
      </Breadcrumb>
    </Container>
  );
};

export default NextBreadcrumb;
