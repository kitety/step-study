import React, { Component } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
// import gql  from 'graphql-tag';

const LAUNCHES_QUERY = gql`
  {
    Launches{
      flight_number
      mission_name
      launch_date_local
      launch_success
      launch_year
    }
  }
`;
class Launches extends Component {
  render () {
    return (
      <div>
        <Query query={LAUNCHES_QUERY}>
          {({ loading, error, data }) => {
            console.log(loading, error, data)
            if (loading) {
              return <h4>loading...</h4>
            } else if (error) {
              return <h4>error</h4>
            } else {
              console.log(data);
              return <h4>66</h4>
            }
          }}
        </Query>
      </div>
    )
  }
}

export default Launches

