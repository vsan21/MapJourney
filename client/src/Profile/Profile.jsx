import React, { Component } from 'react';
import { NavBar } from '../components/NavBar';
import './Profile.css';

class Profile extends Component {
    state = {
        profile: {}
    }

    componentWillMount() {
        const { userProfile, getProfile } = this.props.auth;
        //if there is already not a userProfile, then getProfile
            //pass that profile info to saveUserData so it can send it to the backend
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
        console.log(this.props.location.state);
        return (
            <div>
                <NavBar auth={this.props.auth} history={this.props.history} id={this.props.location.state.id}/>

                <div className="profile-area">
                    <h1>Welcome, {profile.given_name}!</h1>   
                    <div className='info-container'>
                        <div className='user-pic'>
                            <img src={profile.picture} alt="profile" />
                        </div>
                        <div className='user-info'>
                            <h5><strong>First Name</strong>:</h5>
                            <p>{profile.given_name}</p>
                            <hr />
                            <h5><strong>Last Name</strong>:</h5>
                            <p>{profile.family_name}</p>
                            <hr />
                            <h5><strong>Email</strong>:</h5>
                            <p>{profile.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
