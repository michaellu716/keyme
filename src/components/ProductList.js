import React, { Component } from "react";
import { Card, CardBody, Col, Row, Button } from "reactstrap";
import products from "../data/data.json";
let addToArr = [];
export class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      lastPage: Math.ceil(products.length / 9),
      disableNext: false,
      disableFirst: false,
      orderNo: 0,
      numOfProducts: 1,
      numberOfData: 9,
      skip: 0,
      productToDisplay: []
    };
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.selectProduct = this.selectProduct.bind(this);
    this.addProducts = this.addProducts.bind(this);
    this.removeProducts = this.removeProducts.bind(this);
  }

  componentWillMount() {
    let productDis = [];
    products.map((data, i) => {
      if (i < 9) {
        productDis.push(data);
      }
    });
    this.setState({ productToDisplay: productDis });
  }

  previousPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1,
        numberOfData: this.state.numberOfData - 9,
        skip: this.state.skip - 9
      });
      let productDis = [];
      products.map((data, index) => {
        if (
          index >= this.state.skip - 9 &&
          index < this.state.numberOfData - 9
        ) {
          productDis.push(data);
        }
      });
      this.setState({ productToDisplay: productDis });
    }
  };

  nextPage = e => {
    e.preventDefault();

    if (this.state.currentPage <= this.state.lastPage) {
      this.setState({
        currentPage: this.state.currentPage + 1,
        numberOfData: this.state.numberOfData + 9,
        skip: this.state.skip + 9
      });
      let productDis = [];
      products.map((data, index) => {
        if (
          index >= this.state.skip + 9 &&
          index < this.state.numberOfData + 9
        ) {
          productDis.push(data);
        }
      });
      this.setState({ productToDisplay: productDis });
    }
  };

  selectProduct = e => {
    this.setState({
      orderNo: 1,
      numOfProducts: 1,
      productList: products,
      productNum: e.target.dataset.id
    });
    if (!addToArr[e.target.dataset.id]) {
      addToArr[e.target.dataset.id] = 0;
    }
    addToArr[e.target.dataset.id] += 1;
  };
  removeProducts = e => {
    this.setState({
      numOfProducts: this.state.numOfProducts - 1
    });
    if (this.state.numOfProducts === 1) {
      this.setState({
        orderNo: 0
      });
    }
    if (!addToArr[e.target.dataset.id]) {
      addToArr[e.target.dataset.id] = 0;
    }
    //if(addToArr[e.target.dataset.id]>1){
    addToArr[e.target.dataset.id] -= 1;
    //}
  };

  addProducts = e => {
    this.setState({
      numOfProducts: this.state.numOfProducts + 1,
      ["numOfProducts" + e.target.dataset.id]: this.state.numOfProducts + 1
    });

    if (!addToArr[e.target.dataset.id]) {
      addToArr[e.target.dataset.id] = 0;
    }
    addToArr[e.target.dataset.id] += 1;
    //console.log(products);
  };

  render() {
  
    return (
      <div className="container pro-page">
        <Card>
          <div className="head-tit">
            <h3>Add or Scan Your Free Key</h3>
            <h4>Free Delivery </h4>
          </div>
          <Card className="pro-card">
            <CardBody>
              <Card>
                <CardBody>
                  <Row>
                    {this.state.productToDisplay.length > 0 &&
                      this.state.productToDisplay.map((data, index) => (
                        <Col className="col-md-4" key={index}>
                          <div>
                            <figure>
                              <img src={data.imageURL} alt="product" />
                            </figure>
                            <figcaption>
                              <h4>{data.name}</h4>
                              <span>${data.cost}</span>
                              <p>{data.number}</p>
                              {typeof addToArr[index] == "undefined" ||
                              addToArr[index] === 0 ? (
                                <Button
                                  color="danger"
                                  onClick={this.selectProduct}
                                  data-id={index}
                                >
                                  Add to Cart
                                </Button>
                              ) : (
                                <div className="add-plus">
                                  <Button
                                    onClick={this.removeProducts}
                                    data-id={index}
                                  >
                                    -
                                  </Button>{" "}
                                  {addToArr[index]}{" "}
                                  <Button
                                    onClick={this.addProducts}
                                    data-id={index}
                                  >
                                    +
                                  </Button>
                                </div>
                              )}
                            </figcaption>
                          </div>
                        </Col>
                      ))}
                  </Row>
                </CardBody>
              </Card>
            </CardBody>
            <CardBody className="pagination" style={{ margin: "0 auto" }}>
              <div className="pagination-in">
                <Button
                  onClick={this.previousPage}
                  disabled={this.state.currentPage === 1 ? true : false}
                >
                  {"<"}
                </Button>{" "}
                <span>
                  {this.state.currentPage} of {this.state.lastPage}{" "}
                </span>
                <Button
                  onClick={this.nextPage}
                  disabled={
                    this.state.currentPage === this.state.lastPage
                      ? true
                      : false
                  }
                >
                  {">"}
                </Button>
              </div>
            </CardBody>
            <Card>
              <CardBody>
                <Button
                  color="primary"
                  onClick={() => this.props.history.push("/register")}
                >
                  {"Proceed to Checkout >"}
                </Button>
              </CardBody>
            </Card>
          </Card>
        </Card>
      </div>
    );
  }
}

export default ProductList;
