import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import CSVReader from 'react-csv-reader'
import ApolloClient from 'apollo-boost'
import { ApolloProvider, graphql } from 'react-apollo'
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo'

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
});

const getSaleList = gql`
{
  sales {
    product
    customer
  }
}
`

const sales = () => (
  <Query query={getSaleList}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      console.log(data);
      return (
        <div>
          {data.sales.map(s => (
            <p> {s.product} </p>
          ))}
        </div>
      );
    }}
  </Query>
);

class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [], /* Array of Arrays e.g. [["a","b"],[1,2]] */
      cols: []  /* Array of column objects e.g. { name: "C", K: 2 } */
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleDarkSideForce = this.handleDarkSideForce.bind(this);
  };


  handleFile(data) {
    if (!data) {
      return;
    }

    const result = data.slice(1, data.length).map((d, index) => {
      return {
        total: 10,
        customer: d.Email, // storing only email for time being
        product: d.Item // storing only product name for time being
      }
    });

    const requestBody = {
      query: `
        mutation CreateSale($productName: String!, $customerName: String!) {
          createSale(saleInput: {
            product: $productName
            customer: $customerName,
            total: 20
          })
          {
            product
            customer 
            total
          }
        }
      `,
      variables: {
        productName: "product",
        customerName: "Customer"
      }
    }

    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          console.log(res);
          throw new Error('Failed');

        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
      })
      .catch(error => {
        throw error;
      })
  }

  handleDarkSideForce() {

  }

  render() {
    return (
      <Layout>
        <SEO title="Home" />
        {sales()}

        <CSVReader
          cssClass="csv-reader-input"
          label="Select Sales CSV "
          onFileLoaded={this.handleFile}
          onError={this.handleDarkSideForce}
          inputId="ObiWan"
          inputStyle={{ color: 'red' }}
          parserOptions={{ header: true }}
        />
      </Layout>
    )
  }
};

export default IndexPage;