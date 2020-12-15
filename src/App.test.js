import { render, screen } from '@testing-library/react';
import App from './App';
import ReactDOM from 'react-dom';
import { ViewerContainer } from './Viewer/ViewerContainer';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/dashboard/i);
  expect(linkElement).toBeInTheDocument();
});

it('render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ViewerContainer/>, div)
})

it('sensors working', () => {
  render(<App />);
  setTimeout(() => {
    expect(document.querySelectorAll('Viewer_sensor')).toBeTruthy()
  }, 3000)
  
  setTimeout()
})
