import React, { Component } from 'react';
import { ListPlaces } from './ListPlaces';
import { NavBar } from './NavBar';
import './Results.css';
import { Table } from 'react-bootstrap';

export class Results extends Component {
	render() {
		console.log(`Results id: ${this.props.location.state.id}`)
		return (
			<div className='wrapper'>
				<NavBar auth={this.props.auth} history={this.props.history} id={this.props.location.state.id} />
				<Table responsive>
					<thead>
						<tr>
							<th></th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{this.props.location.state.results.map((place, index) => {
							return <ListPlaces key={place.id} place={place} index={index} results={this.props.location.state.results} city={this.props.location.state.city} id={this.props.location.state.id}/>
						})}
					</tbody>
				</Table>
			</div>
		);
	}
}