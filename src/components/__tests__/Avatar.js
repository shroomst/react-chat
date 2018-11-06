/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Avatar from '../Avatar';

describe('<Avatar />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Avatar colorfrom="12345">Name Surname</Avatar>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<Avatar colorfrom="12345">Name Surname</Avatar>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
