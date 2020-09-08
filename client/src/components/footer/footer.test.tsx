import React from 'react';
import { render } from '@testing-library/react';
import Footer from './footer';

test('should find three links inside the footer component', () => {
    const { container } = render(<Footer />);
    const numberOfLinks = container.querySelectorAll('a').length;
    expect(numberOfLinks).toBe(3);
});

test('should find the text "FML - Enjoy tasty food".', () => {
    const { getByText } = render(<Footer />);
    const pElement = getByText(/FML - Enjoy tasty food/i);
    expect(pElement).toBeInTheDocument();
});