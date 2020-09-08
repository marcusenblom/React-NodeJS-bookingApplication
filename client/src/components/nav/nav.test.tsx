import React from 'react';
import { render } from '@testing-library/react';
import Nav from './nav';

test('should contain the text "FML Restaurant" in a h1 element', () => {
    const { getByText } = render(<Nav />);
    const letH1Element = getByText('FML Restaurant');
    expect(letH1Element).toBeInTheDocument();
});