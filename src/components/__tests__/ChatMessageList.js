/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ChatMessagesList from '../ChatMessagesList';

describe('<Avatar />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChatMessagesList colorfrom="12345">Name Surname</ChatMessagesList>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<ChatMessagesList colorfrom="12345">Name Surname</ChatMessagesList>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
