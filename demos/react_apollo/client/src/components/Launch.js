import React from 'react'
import { useQuery } from '@apollo/react-hooks';
// import { gql } from 'apollo-boost';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom'


const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number:Int!){
    Launch(flight_number:$flight_number) {
      flight_number
      mission_name
      launch_date_local
      launch_success
      launch_year
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

const Launch = (props) => {
  const { loading, error, data } = useQuery(LAUNCH_QUERY, { variables: { flight_number: Number(props.match.params.flight_number) } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const { flight_number,
    mission_name,
    launch_date_local,
    launch_success,
    launch_year,
    rocket: {
      rocket_id,
      rocket_name,
      rocket_type
    } } = data.Launch
  console.log(data)
  return (
    <div>
      <h1 className="display-4">
        <span className="text-dark">Mission：</span>{mission_name}
      </h1>
      <h4 className="mb-3">
        Launch Details
      </h4>
      <ul className="list-group">
        <li className="list-group-item">Flight Number：{flight_number}</li>
        <li className="list-group-item">Flight Year：{launch_date_local}</li>
        <li className="list-group-item">Flight Success：{launch_success ? 'Yes' : 'NO'}</li>
      </ul>
      <h4 className="mb-3">
        Rocket Details
      </h4>
      <ul className="list-group">
        <li className="list-group-item">Rocket Id：{rocket_id}</li>
        <li className="list-group-item">Rocket Name：{rocket_name}</li>
        <li className="list-group-item">Rocket Type：{rocket_type}</li>
      </ul>
      <hr/>
      <Link to='/' className="btn btn-secondary">Index</Link>
    </div>
  )
}

export default Launch

