import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import CSVReader from 'react-csv-reader'

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
        SystemId: d[0],
        UPC: d[1],
        EAN: d[2],
        CustomSKU: d[3],
        ManufactureSKU: d[4],
        Item: d[5],
        Quantity: d[6],
        Price: d[7],
        Tax: d[8],
        Brand: d[9],
        PublishToECOM: d[10],
        Season: d[11],
        Department: d[12],
        MSRP: d[13],
        TaxClass: d[14],
        DefaultCost: d[15],
        Vendor: d[16],
        Category: d[17],
        Subcategory1: d[18],
        Subcategory2: d[19],
        Subcategory3: d[20],
        Subcategory4: d[21],
        Subcategory5: d[22],
        Subcategory6: d[23],
        Subcategory7: d[24],
        Subcategory8: d[25],
        Subcategory9: d[26]
      }
    });

    console.log(result);
  }

  handleDarkSideForce() {

  }

  render() {
    return (
      <Layout>
        <SEO title="Home" />
        <CSVReader
          cssClass="csv-reader-input"
          label="Select Sales CSV "
          onFileLoaded={this.handleFile}
          onError={this.handleDarkSideForce}
          inputId="ObiWan"
          inputStyle={{ color: 'red' }}
        />
      </Layout>
    )
  }
};

export default IndexPage;