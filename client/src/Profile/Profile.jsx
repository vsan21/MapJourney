import React, { Component } from 'react';
import { NavBar } from '../components/NavBar';
import './Profile.css';

class Profile extends Component {




    componentWillMount() {
        this.setState({ profile: {} });
        const { userProfile, getProfile } = this.props.auth;
        if (!userProfile) {
            getProfile((err, profile) => {
                this.setState({ profile });
            });
        } else {
            this.setState({ profile: userProfile });
        }
    }

    render() {
        const { profile } = this.state;
        return (
            <div>
                <NavBar auth={this.props.auth} history={this.props.history} />

                <div className="profile-area">
                    <h1>Welcome, {profile.given_name}!</h1>   
                    <div className='info-container'>
                        <div className='user-pic'>
                            <img src={profile.picture} alt="profile" />
                        </div>
                        <div className='user-info'>
                            <h4><strong>First Name</strong>: <span id='user'>{profile.given_name}</span></h4>
                            <h4><strong>Last Name</strong>: <span id='user'>{profile.family_name}</span></h4>
                            <h4><strong>Email</strong>: <span id='user'>{profile.nickname}</span></h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
