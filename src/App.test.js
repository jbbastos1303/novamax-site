import { render } from '@testing-library/react';
import App from './App';

test('renders Nova Max app without errors', () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});
