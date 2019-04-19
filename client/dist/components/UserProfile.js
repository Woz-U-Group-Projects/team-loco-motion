import React, {Component} from 'react'

class UserProfile extends Component {
    render() {
        const { user } = this.props;
        return (
            <div>
          <h2> User profile </h2>
          <span>{ user.name }</span>
          </div>
        );
    }
}

export default UserProfile;