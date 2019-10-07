import React, { Component } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
// import gql  from 'graphql-tag';
import LaunchItem from './LaunchItem'
import MissionKey from './MissionKey'

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
      <>
        <h1 className="dispaly-4 my-3">Launches</h1>
        <MissionKey/>
        <Query query={LAUNCHES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) {
              return <h4>loading...</h4>
            } else if (error) {
              return <h4>error</h4>
            }
            console.log(data);
            return <>
              {
                data.Launches.map(launch => <LaunchItem key={launch.flight_number} launch={launch} />)
              }
            </>
          }}
        </Query>
      </>
    )
  }
}

export default Launches

