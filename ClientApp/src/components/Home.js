import React, { Component } from "react";
import PetsTable from "./PetsTable";
import PetOwnersTable from "./PetOwnersTable";
import Transaction from "./Transaction";
import axios from "axios";
import { connect } from "react-redux";
import { Container } from "reactstrap";

class Home extends Component {
  static displayName = Home.name;

  fetchPetOwners = async () => {
    const response = await axios.get("api/petOwners");
    this.props.dispatch({ type: "SET_PETOWNERS", payload: response.data });
  };

  render() {
    return (
      <>
        <Container tag="main">
          <div class='card' id="hotel-header">
            <h1>Welcome To The Pet Hell!</h1>
            <p>At our Pet Hotel, we take care of your pet while you are away. </p>
          </div>
          <PetsTable fetchPetOwners={this.fetchPetOwners} />
          <br />
          <PetOwnersTable fetchPetOwners={this.fetchPetOwners} />
          <br />
          {/* <Transaction /> */}
        </Container>
      </>
    );
  }
}

export default connect()(Home);
