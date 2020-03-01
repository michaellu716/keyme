import React, { Component } from "react";
import {
  Button,
  Row,
  Col,
  Card,
  CardBody,
  Input,
  Container,
  Form,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import "./myStyles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      address: "",
      email: "",
      apartment: "",
      city: "",
      state: "",
      zip: "",
      errorFlag: false,
      blankFlag: false,
      submitted: false,
      modal: false,
      isClicked: false,
      whiteSpace: "Multiple spaces are not allowed"
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  toggle() {
    if (
      this.state.name &&
      this.state.address &&
      this.state.email &&
      this.state.apartment &&
      this.state.city &&
      this.state.state &&
      this.state.zip
    ) {
      this.setState({
        modal: true
      });
    } else {
      this.setState({
        modal: false,
        submitted: true
      });
    }
  }
  emailValidation(email) {
    let atSymbol = email.indexOf("@");
    if (atSymbol < 1) return false;
    let dot = email.indexOf(".");
    if (dot <= atSymbol + 2) return false;
    if (dot === email.length - 1) return false;
    else return true;
  }

  handleInputChange = event => {
    const value = event.target.value;
    this.setState({ ...this.state, [event.target.name]: value });
  };

  onClickHandler = () => {
    this.setState({ submitted: true });
    if (
      !this.state.name ||
      !this.state.address ||
      !this.state.email ||
      !this.state.apartment ||
      !this.state.city ||
      !this.state.state ||
      !this.state.zip
    ) {
      this.setState({
        blankFlag: true,
        errorFlag: true
      });
    } else if (
      this.state.name.indexOf(" ") > 1 ||
      this.state.email.indexOf(" ") > 0 ||
      this.state.apartment.indexOf(" ") > 0 ||
      this.state.city.indexOf(" ") > 0 ||
      this.state.state.indexOf(" ") > 0 ||
      this.state.zip.indexOf(" ") > 0
    ) {
      this.setState({ errorFlag: true });
    } else if (this.emailValidation(this.state.email) === false) {
      this.setState({
        errorFlag: true
      });
      toast.error("Invalid Email");
    } else {
      this.setState({ isClicked: true, modal: false });
      toast.success("Address captured successfully");
    }
  };

  render() {
    return (
      <Container className="animated fadeIn mainform">
        <ToastContainer autoClose={1500} />
        <Card>
          <CardBody>
            <Row>
              <Col className="head-home">
                <h1>
                  Part of your order needs to be made at KeyMe Headquarter
                </h1>
                <h4>
                  <span>And will ship FREE with discreet packaging</span>
                </h4>
              </Col>
            </Row>
          </CardBody>
          <CardBody>
            <Form onSubmit={this.onSubmitHandler}>
              <Row>
                <Container className="themed-container" fluid="sm">
                  <Col>
                    <Input
                      type="text"
                      name="name"
                      onChange={this.handleInputChange}
                      value={this.state.name}
                      placeholder="FULL NAME"
                    />
                  </Col>
                  {this.state.submitted && !this.state.name && (
                    <Col className="validation-box">
                      <div className="validationError">{"Name Required"}</div>
                    </Col>
                  )}
                </Container>
              </Row>
              <Container className="themed-container form-cust mt-3" fluid="sm">
                <Row>
                  <Col className="col-md-9">
                    <Input
                      type="text"
                      name="address"
                      onChange={this.handleInputChange}
                      value={this.state.address}
                      placeholder="STREET ADDRESS"
                    />
                    {this.state.submitted && !this.state.address && (
                      <div className="validation-box">
                        <div className="validationError">
                          {"Address Required"}
                        </div>
                      </div>
                    )}
                  </Col>

                  <Col className="col-md-3">
                    <Input
                      type="text"
                      name="apartment"
                      onChange={this.handleInputChange}
                      value={this.state.apartment}
                      placeholder="APT #"
                    />
                    {this.state.submitted && !this.state.apartment && (
                      <div className="validation-box">
                        <div className="validationError">
                          {"Apartment Number Required"}
                        </div>
                      </div>
                    )}
                  </Col>
                </Row>
              </Container>
              <Container
                className="themed-container  form-cust mt-3"
                fluid="sm"
              >
                <Row>
                  <Col className="col-md-6">
                    <Input
                      type="text"
                      name="city"
                      onChange={this.handleInputChange}
                      value={this.state.city}
                      placeholder="CITY"
                    />
                    {this.state.submitted && !this.state.city && (
                      <div className="validation-box">
                        <div className="validationError">{"City Required"}</div>
                      </div>
                    )}
                  </Col>
                  <Col className="col-md-3">
                    <Input
                      type="text"
                      name="state"
                      onChange={this.handleInputChange}
                      value={this.state.state}
                      placeholder="STATE"
                    />
                    {this.state.submitted && !this.state.state && (
                      <div className="validation-box">
                        <div className="validationError">
                          {"State Required"}
                        </div>
                      </div>
                    )}
                  </Col>
                  <Col className="col-md-3">
                    <Input
                      type="text"
                      name="zip"
                      onChange={this.handleInputChange}
                      value={this.state.zip}
                      placeholder="ZIP"
                    />
                    {this.state.submitted && !this.state.zip && (
                      <div className="validation-box">
                        <div className="validationError">
                          {"Zip Code Required"}
                        </div>
                      </div>
                    )}
                  </Col>
                </Row>
              </Container>

              <Container
                className="themed-container form-cust mt-3"
                fluid={true}
              >
                <Row>
                  <Col>
                    <Input
                      type="email"
                      name="email"
                      onChange={this.handleInputChange}
                      value={this.state.email}
                      placeholder="EMAIL ADDRESS"
                    />
                    {this.state.submitted && !this.state.email && (
                      <div className="validation-box">
                        <div className="validationError">
                          {"Email ID Required"}
                        </div>
                      </div>
                    )}
                    {this.state.submitted && this.state.email.indexOf(" ") > 0 && (
                      <div className="validation-box">
                        <div className="validationError">
                          {"Email Is not Valid"}
                        </div>
                      </div>
                    )}
                  </Col>
                </Row>
                <Container className="themed-container mt-3" fluid={true}>
                  <Col>
                    <Label
                      style={{
                        color: "grey",
                        fontSize: "16px",
                        lineHeight: "20px",
                        fontStyle: " italic"
                      }}
                    >
                      We will only send you information regarding your order and
                      KeyMe services and promotions. We will never share your
                      information with a third party.
                    </Label>
                  </Col>
                </Container>
                <Container className="themed-container mt-3" fluid={true}>
                  <Row>
                    <Col>
                      <Button color="danger" onClick={this.toggle}>
                        Continue
                      </Button>
                      {this.state.modal && (
                        <Modal
                          isOpen={this.state.modal}
                          toggle={this.toggle}
                          className={this.props.className}
                        >
                          <ModalHeader
                            toggle={() => {
                              this.setState({ modal: false });
                            }}
                          >
                            Confirmation!
                          </ModalHeader>
                          <ModalBody>
                            Are you sure you want to continue?
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              color="primary"
                              onClick={() => {
                                this.onClickHandler();
                              }}
                            >
                              Yes
                            </Button>
                            <Button
                              color="secondary"
                              onClick={() => {
                                this.setState({ modal: false });
                              }}
                            >
                              No
                            </Button>
                          </ModalFooter>
                        </Modal>
                      )}
                    </Col>
                  </Row>
                </Container>
              </Container>
            </Form>
          </CardBody>
          <div class="button-bottom">
            <Button
              color="link"
              style={{
                textDecoration: "none",
                fontWeight: "bolder",
                color: "seagreen"
              }}
              onClick={() => this.props.history.push("/")}
            >
              EDIT ORDER
            </Button>
          </div>
        </Card>
      </Container>
    );
  }
}

export default Register;
