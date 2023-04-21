import React from 'react';
import { useRouter } from 'next/router';
import { Container, Breadcrumb } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import { strReplace } from 'lib/utils.js';

const BREADCRUMBS_PATH_LENGTHS = {
  home: 0,
  options: 1,
  choose: 2,
  competitors: 3,
  comparing: 4,
};

const translateCrumbByType = (type, extra) => {
  if (type === 'professions') {
    return extra.profession.name;
  }

  return extra.school.name.ru;
};

const translateBreadcrumb = (href, text, extra, t) => {
  const path = href.split('/').filter((part) => part.length);

  let translatedText;

  switch (path.length) {
    case BREADCRUMBS_PATH_LENGTHS.home:
      translatedText = t('title');
      break;
    case BREADCRUMBS_PATH_LENGTHS.options:
      translatedText = t(`${text}_page.title`);
      break;
    case BREADCRUMBS_PATH_LENGTHS.choose: {
      const type = path[0];
      translatedText = translateCrumbByType(type, extra, t);
      break;
    }
    case BREADCRUMBS_PATH_LENGTHS.competitors:
      translatedText = t('home.competitors');
      break;
    case BREADCRUMBS_PATH_LENGTHS.comparing: {
      const [firstSchool, secondSchool] = extra.selectedSchools;
      translatedText = `${firstSchool.name.ru} ${t('comparing.and')} ${secondSchool.name.ru}`;
      break;
    }
    default:
      break;
  }

  return translatedText || text;
};

const NextBreadcrumb = ({ extra }) => {
  const { t } = useTranslation('common');
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
  const { isErrorPage } = extra;

  return isErrorPage ? null : (
    <Container>
      <Breadcrumb>
        {
          (breadcrumbs.length > 1)
            ? breadcrumbs.map((crumb, idx) => {
              const { href, id } = crumb;
              let { text } = crumb;
              text = strReplace(text, '%20', ' ');
              const translatedText = translateBreadcrumb(href, text, extra, t);

              return (
                <Breadcrumb.Item href={href} key={id} active={idx === breadcrumbs.length - 1}>
                  { translatedText }
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
