const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema} = require('graphql');
const axios=require('axios')

const LaunchType = new GraphQLObjectType({
  name: 'Launch',
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    launch_year: { type: GraphQLString },
    rocket: { type: RocketType }
  })
})
const RocketType = new GraphQLObjectType({
  name: 'rocket',
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    Launches: {
      type: new GraphQLList(LaunchType),
      resolve (parent, args) {
        return axios.get('https://api.spacexdata.com/v3/launches').then(res=>res.data)
      }
    },
    Rockets: {
      type: new GraphQLList(RocketType),
      resolve (parent, args) {
        return axios.get('https://api.spacexdata.com/v3/rockets').then(res=>res.data)
      }
    },
    Launch: {
      type: LaunchType,
      args:{
        flight_number: { type: GraphQLInt}
      },
      resolve (parent, args) {
        return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`).then(res => res.data)
      }
    },
    Rocket: {
      type: RocketType,
      args:{
        rocket_id: { type: GraphQLString}
      },
      resolve (parent, args) {
        return axios.get(`https://api.spacexdata.com/v3/rockets/${args.rocket_id}`).then(res => res.data)
      }
    }
  }
})
module.exports = new GraphQLSchema({
  query: RootQuery,
});
