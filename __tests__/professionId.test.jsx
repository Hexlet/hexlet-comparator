import '@testing-library/jest-dom';
import { getPage } from 'next-page-tester';
import { fireEvent, screen } from '@testing-library/react';

describe('Profession Page', () => {
  it('frontend developer page buttons access', async () => {
    const { render } = await getPage({
      route: '/professions/frontend-developer',
    });

    render();

    fireEvent.click(screen.getByTestId('geekbrains'));
    expect(screen.getByTestId('html-academy')).not.toBeDisabled();
    expect(screen.getByTestId('geekbrains')).not.toBeDisabled();

    fireEvent.click(screen.getByTestId('hexlet'));
    expect(screen.getByTestId('html-academy')).toBeDisabled();
  });
});
