import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import moment from "moment";

class PetsTable extends Component {
  state = {
    loading: true,
    errors: [],
    successMessage: null,
    newPet: {
      name: "",
      breed: "",
      color: "",
      petOwnerId: "",
    },
  };

  componentDidMount = () => {
    this.fetchData();
  };

  renderTable = () => {
    return (
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Breed</th>
              <th>Color</th>
              <th>Checked In</th>
              <th>Pet Owner</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.pets.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  There are no pets currently in our system.
                </td>
              </tr>
            ) : (
              this.props.pets.map((pet) => (
                <tr key={`pet-row-${pet.id}`}>
                  <td>{pet.name}</td>
                  <td>{pet.breed}</td>
                  <td>{pet.color}</td>
                  <td>
                    {pet.checkedInAt !== "0001-01-01T00:00:00"
                      ? moment.utc(pet.checkedInAt).local().calendar()
                      : "Not Checked In"}
                  </td>
                  <td>{pet.petOwner.name}</td>
                  <td>
                    {pet.checkedInAt ? (
                      <button
                        onClick={() => this.checkOut(pet.id)}
                        className="btn btn-info btn-sm mr-1"
                      >
                        Check Out
                      </button>
                    ) : (
                      <button
                        onClick={() => this.checkIn(pet.id)}
                        className="btn btn-info btn-sm mr-1"
                      >
                        Check In
                      </button>
                    )}
                    <button
                      onClick={() => this.delete(pet.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  };

  addPet = async () => {
    try {
      await axios.post("api/pets/", this.state.newPet);
      this.fetchData();
      this.setState({
        errors: [],
        successMessage: "Successfully added pet!",
      });
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) {
        // validation errors
        this.setState({
          errors: err.response.data.errors,
          successMessage: null,
        });
      }
    }
  };

  renderMessages = () => {
    const { errors, successMessage } = this.state;

    if (errors.length > 0) {
      return (
        <div className="alert alert-danger">
          <p>The following errors prevented a successful save:</p>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      );
    }

    if (successMessage !== null) {
      return <p className="alert alert-success">{successMessage}</p>;
    }

    return null;
     };

  render() {
    const { loading } = this.state;

    let contents = loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderTable()
    );

    return (
      <>
        <h2 id="tableLabel">Pets</h2>
        {this.renderMessages()}
        <div className="form-group row ml-0 mr-0">
          <input
            placeholder="Pet Name"
            className="form-control col-md-2 mr-2"
            value={this.state.newPet.name}
            onChange={(e) =>
              this.setState({
                newPet: { ...this.state.newPet, name: e.target.value },
              })
            }
          />
          <select
            className="form-control col-md-2 mr-2"
            value={this.state.newPet.breed}
            onChange={(e) =>
              this.setState({
                newPet: { ...this.state.newPet, breed: e.target.value },
              })
            }
          >
            <option value="" disabled>
              Pet Breed
            </option>
            <option value="Shepherd">Shepherd</option>
            <option value="Poodle">Poodle</option>
            <option value="Beagle">Beagle</option>
            <option value="Bulldog">Bulldog</option>
            <option value="Terrier">Terrier</option>
            <option value="Boxer">Boxer</option>
            <option value="Labrador">Labrador</option>
            <option value="Retriever">Retriever</option>
          </select>
          <select
            className="form-control col-md-2 mr-2"
            value={this.state.newPet.color}
            onChange={(e) =>
              this.setState({
                newPet: { ...this.state.newPet, color: e.target.value },
              })
            }
          >
            <option value="" disabled>
              Pet Color
            </option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Golden">Golden</option>
            <option value="Tricolor">Tricolor</option>
            <option value="Spotted">Spotted</option>
          </select>
          <select
            className="form-control col-md-2 mr-2"
            value={this.state.newPet.petOwnerId}
            onChange={(e) =>
              this.setState({
                newPet: {
                  ...this.state.newPet,
                  petOwnerId: Number(e.target.value),
                },
              })
            }
          >
            <option>Pet Owner</option>
            {this.props.petOwners.map((petOwner) => (
              <option value={petOwner.id} key={petOwner.id}>
                {petOwner.name}
              </option>
            ))}
          </select>
          <button
            className="form-control btn btn-primary col-md-2"
            onClick={this.addPet}
          >
            Add Pet
          </button>
        </div>
        {contents}
      </>
    );
  }

  delete = async (id) => {
    try {
      await axios.delete(`api/pets/${id}`);
      this.fetchData();
      this.setState({
        errors: [],
        successMessage: "Successfully removed pet",
      });
    } catch (err) {
      this.setState({ errors: [err.message], successMessage: null });
    }
  };

  checkIn = async (id) => {
    try {
      await axios.put(`api/pets/${id}/checkin`);
      this.setState({
        errors: [],
        successMessage: "Successfully checked in",
      });
      this.fetchtheckData();
    } catch (err) {
      this.setState({ errors: [err.message], successMessage: null });
    }
  };

  checkOut = async (id) => {
    try {
      await axios.put(`api/pets/${id}/checkout`);
      this.setState({
        errors: [],
        successMessage: "Successfully checked out",
      });
      this.fetchData();
    } catch (err) {
      this.setState({ errors: [err.message], successMessage: null });
    }
  };

  fetchData = async () => {
    try {
      const response = await axios.get("api/pets/");
      this.props.dispatch({ type: "SET_PETS", payload: response.data });
      this.props.fetchPetOwners();
      this.setState({ loading: false });
    } catch (err) {
      this.setState({ errors: [err.message], successMessage: null });
    }
  };
}

const mapStateToProps = (state) => ({
  pets: state.pets,
  petOwners: state.petOwners,
});

export default connect(mapStateToProps)(PetsTable);
