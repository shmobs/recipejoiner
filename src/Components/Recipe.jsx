import React, { Component } from 'react';

class Recipe extends Component {
  constructor(props) {
    super(props);

    const { match } = props;
    const { params } = match || {};
    const { id } = params || {};

    this.state = {
      id,
      data: {},
    };
  }

  componentDidMount() {
    const { match, activeUser: user } = this.props;
    const { params } = match || {};
    const { id } = params || {};

    fetch(`/api/recipes/${id}?user=${user}`)
      .then(r => r.json())
      .then((data) => {
        this.setState({ data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <h1>{data.title}</h1>
        <img
          src={data.image_url}
          alt={data.title}
        />
        <p>{data.description}</p>
        <button type='button'>Edit</button>
      </div>
    );
  }
}

export default Recipe;
