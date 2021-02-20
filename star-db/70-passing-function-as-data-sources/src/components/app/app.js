import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page';

import './app.css';
import ItemList from "../item-list/item-list";
import PersonDetails from "../item-details/item-details";
import SwapiService from "../../services/swapi-service";
import ItemDetails from '../item-details/item-details';
import Row from '../Row/Row';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    const { getPerson, getPlanet, getPersonImage, getPlanetImage } = this.swapiService;

    const personDetails = (
      <ItemDetails
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage}
      />
    ) 
    const starShipDetails = (
      <ItemDetails
        itemId={5}
        getData={getPlanet}
        getImageUrl={getPlanetImage}
      />
    ) 

    return (
      <div className="stardb-app">
        <Header />
        { planet}
        

        <div className="row mb2 button-row">
          <button
            className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}>
            Toggle Random Planet
          </button>
          <ErrorButton />
        </div>

        <Row left={personDetails} right={starShipDetails} />

        <PeoplePage />

        {/* <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllPlanets}
              renderItem={(item)=>`${item.name} (diameter: ${item.diameter})`}
              />
          </div>
          <div className="col-md-6">
            <PersonDetails itemId={this.state.selectedPerson} />
          </div>
        </div>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllStarships}
              renderItem={(item)=>(<span>{item.name} (passengers: {item.passengers})  <button>!</button></span>)}
            />
          </div>
          <div className="col-md-6">
            <PersonDetails itemId={this.state.selectedPerson} />
          </div>
        </div> */}

      </div>
    );
  }
}
