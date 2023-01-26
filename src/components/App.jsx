import { fetchImages } from './fetch';
import { Component } from 'react';
export class App extends Component {
  state = {
    inputValue: '',
  };
  handleChange = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  render() {
    return (
      <div>
        <input
          type="text"
          name="inputValue"
          value={this.state.inputValue}
          onChange={this.handleChange}
        />
        <button
          type="submit"
          onClick={() => {
            fetchImages(this.state.inputValue);
          }}
        >
          Send request
        </button>
      </div>
    );
  }
}
