import '@testing-library/jest-dom';
import { getPage } from 'next-page-tester';
import { screen } from '@testing-library/react';

describe('Home Page', () => {
  it('renders homepage', async () => {
    const { render } = await getPage({
      route: '/',
    });

    render();

    expect(
      screen.getByRole('heading', { name: /школ/ }),
    ).toBeInTheDocument();
  });
});
