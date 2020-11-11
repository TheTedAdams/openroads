import * as React from 'react';
import logo from '../images/logo.svg';

import { IHeader } from "../types/types"

class Header extends React.Component<IHeader> {
  render(){
    const { unReadCount } = this.props;
    return(
      <header className='Header'>
        <img src={logo} alt='logo'/>
        <h1>Notes Viewer Test App</h1>
        <div>
          Unread:
          <span className='Header-title-unread-count'>
            {/* Fixed: this is a count of only the unread messages */}
            {unReadCount}
          </span>
        </div>
      </header>
    );
  }
}

  export default Header