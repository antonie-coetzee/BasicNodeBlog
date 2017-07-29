import * as React from 'react';

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal',
};

export default class Link extends React.Component {

  constructor(props) {
    super(props);

    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);

    this.state = {
      class: STATUS.NORMAL,
    };
  }

  _onMouseEnter() {
    this.setState({class: STATUS.HOVERED});
  }

  _onMouseLeave() {
    this.setState({class: STATUS.NORMAL});
  }

  render() {
    return (
      <a
        href={'#'}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}>
        {this.props.children}
        <div></div>
      </a>
    );
  }

}

import * as renderer from 'react-test-renderer';

describe('Link changes the class when hovered', () => {
    it('trial', () => {
        const component = renderer.create(
          <Link>Facebook</Link>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        // manually trigger the callback
        tree.props.onMouseEnter();
        // re-rendering
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        
        // manually trigger the callback
        tree.props.onMouseLeave();
        // re-rendering
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
        }); 
});   
