import React from 'react';
import { Container, Breadcrumb } from 'react-bootstrap';

const NextBreadcrumb = ({ breadcrumbs }) => (
  <Container>
    <Breadcrumb>
      {
        breadcrumbs.map(({ text, href, id }, idx) => (
          <Breadcrumb.Item href={href} key={id} active={idx === breadcrumbs.length - 1}>
            { text }
          </Breadcrumb.Item>
        ))
      }
    </Breadcrumb>
  </Container>
);

export default NextBreadcrumb;
