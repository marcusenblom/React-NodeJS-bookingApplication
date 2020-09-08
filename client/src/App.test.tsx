import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('should get 6 div elements', () => {
    const { container } = render(<App />);
    const numberOfElements = container.querySelectorAll('div').length;
    expect(numberOfElements).toBe(6);
});
