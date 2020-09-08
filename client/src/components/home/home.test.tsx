import React from 'react';
import { render } from '@testing-library/react';
import Home from './home';

test('the link element "a" should contain "href=/booking".', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Reserve a table').closest('a')).toHaveAttribute('href', '/booking');
});

test('should contain an image with alt="pizza".', () => {
    const { getByAltText } = render(<Home />);
    const imgElement = getByAltText('pizza');
    expect(imgElement).toBeInTheDocument();
});