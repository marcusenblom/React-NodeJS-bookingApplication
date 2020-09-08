import React from 'react';
import { render } from '@testing-library/react';
import Home from './home';

test('the link element "a" should contain "href=/booking".', () => {
    const { getByText } = render(<Home />)
    expect(getByText('Reserve a table').closest('a')).toHaveAttribute('href', '/booking');
});
