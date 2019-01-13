import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'

export const ADD_COMPANY = gql`
  mutation ($name: String!, $stage: String!, $sector: String!,$color: String!, $investmentSize: Int!) {
    addCompany(name: $name, stage: $stage, sector: $sector, color: $color, investmentSize: $investmentSize) {
      name
      stage
      sector
      color
      investmentSize
    }
  }`

export const GET_COMPANIES = gql`
  query getCompanies {
    company {
      name
      stage
      sector
      color
      investmentSize
    }
  }`

export default compose(
  graphql(GET_COMPANIES, {
    props: ({ ownProps, data }) => data,
  }),
  graphql(ADD_COMPANY, { name: 'addCompany' }),
)
