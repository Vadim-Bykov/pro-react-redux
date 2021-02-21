import React, { Component } from 'react';

import ItemList from '../item-list/item-list';
import ItemDetails, { Record } from '../item-details/item-details';

import './people-page.css';
import SwapiService from "../../services/swapi-service";
import Row from '../Row/Row';
import ErrorBoundry from '../error-boundry/error-boundry';

// class ErrorBoundry extends Component{

//   state = {
//     hasError: false
//   };

//   componentDidCatch(error, info) {

//     this.setState({
//       hasError: true
//     });
//   }

//   render() {
    
//     if (this.state.hasError) {
//       return <ErrorIndicator />;
//     }

//     return this.props.children;
//   }
// }
export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: 3,
  };

  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson });
  };

  render() {

    const { getAllPeople, getPerson, getPersonImage } = this.swapiService;

    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={getAllPeople}
        // renderItem={(item) => `${item.name} (gender: ${item.gender})`}
      >
        {(item) => `${item.name} (gender: ${item.gender})`}
      </ItemList>
    );

    const itemDetails = (
      <ErrorBoundry>
        <ItemDetails itemId={this.state.selectedPerson} getImageUrl={getPersonImage} getData={getPerson} >

          <Record field='gender' label='Gender' />
          <Record field='birthYear' label='Birth Year' />
          <Record field='eyeColor' label='Eye color' />

        </ItemDetails>
      </ErrorBoundry>
    );

    return (
      // <ErrorBoundry>
        <Row left={itemList} right={itemDetails} />
      // </ErrorBoundry>
    );
  }
}
