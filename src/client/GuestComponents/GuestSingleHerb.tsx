import React, { useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { api } from '../Services/apiServices';
import { Card, ListGroup, ListGroupItem, Container, Row, Col, Button, Jumbotron, Form, Spinner, Accordion } from 'react-bootstrap';
import { IVeggieState, IResObj } from '../Services/interfaces';

interface IVeggieProps extends RouteComponentProps<{ id: string }> { }
const GSingleHerb: React.FC<IVeggieProps> = (props) => {
    const [vgObj, setVgObj] = useState<any>()

    const [pageState, setPageState] = useState<boolean>(true);

    let herbsId = props.match.params.id;

    useEffect(() => {
        fetchAPI();
    }, []);
    let fetchAPI = async () => {
        let [response]: any = await api(`/api/herbs/${herbsId}`);
        makeVeggie(response);
    }

    let makeVeggie = (resObj: any) => {
        console.log(resObj)
        setVgObj(
            {
                herbsId: resObj.id,
                herbsName: resObj.name,
                herbsSciName: resObj.sci_name,
                herbsImg: resObj.url,
                herbsSoil: resObj.soil,
                herbsCompanions: resObj.companions,
                herbsHM: resObj.harvest_months,
            }
        )
        setPageState(false);
    }

    if (pageState === true) {
        return (
            <Container className="d-flex">
                <div className="mx-auto d-flex" style={{ "height": "85vh" }}>
                    <Spinner className="my-auto" animation="grow" variant="dark"
                        style={{ "height": "15vh", "width": "15vh" }} />
                    <h1 className="my-auto text-dark" style={{ "fontSize": "15vh" }}>Loading...</h1>
                    <Spinner className="my-auto" animation="grow" variant="dark"
                        style={{ "height": "15vh", "width": "15vh" }} />
                </div>
            </Container>
        )
    } else {

        return (
            <Container>
                <Jumbotron fluid>
                    <h1></h1>
                    <p >Must be signed in to view all plant details.<Button className="text-white" href="/guestlogin" variant="link" type="submit">Go to login page.</Button></p>
                    <p className="text-muted">Don't have an account yet? Click<Button className="text-white" href="/guestsignup" variant="link" type="submit">here</Button>to join Victory Gardens!</p>
                </Jumbotron>
                <div className="d-flex">
                    <Card className="mx-auto my-4 bg-white shadow-lg p-3 mb-5 border- mb-3 text-success" style={{ width: '50rem' }}>
                        <div className="shadow-lg rounded-pill text-white text-center bg-success">
                            <Card.Title className="mx-auto">
                                <br></br>
                                <h1>{vgObj.herbsName}</h1>
                                <p>{vgObj.herbsSciName}</p>
                            </Card.Title>
                        </div>
                        <br></br>
                        <Card.Img className="mx-auto  border-success mb-3 rounded-pill shadow-lg"
                            style={{ "width": '20em' }} src={vgObj.herbsImg} />


                        <Card.Body className="mx-auto">
                            <Button variant="light" type="submit" disabled>Add to My Garden!</Button>
                            <Form.Text className="text-muted">Must be signed in to add a veggie.</Form.Text>
                        </Card.Body>

                        <Container>
                            <br></br>
                            <Row className="justify-content-center">
                                <Col md="4" xs="12">
                                    <br></br>
                                    <Accordion >
                                        <Card className="rounded-lg">
                                            <Card.Header className="bg-success text-white d-flex">
                                                <Accordion.Toggle as={Button} variant="link"
                                                    className="mx-auto text-white" eventKey="0">
                                                    Soil
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>
                                                    <ListGroup className="list-group-flush">
                                                        {vgObj.herbsSoil}
                                                    </ListGroup>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                        <br></br>
                                        <Card className="rounded-lg">
                                            <Card.Header className="bg-success text-white d-flex">
                                                <Card.Title as="p" className="my-0 mx-auto">
                                                    Position
                                                </Card.Title>
                                            </Card.Header>
                                        </Card>
                                        <br></br>
                                        <Card className="rounded-lg">
                                            <Card.Header className="bg-success text-white d-flex">
                                                <Card.Title as="p" className="my-0 mx-auto">
                                                    Frost Tolerance
                                                </Card.Title>
                                            </Card.Header>

                                        </Card>
                                        <br></br>
                                        <Card className="rounded-lg">
                                            <Card.Header className="bg-success text-white d-flex">
                                                <Card.Title as="p" className="my-0 mx-auto">
                                                    Feeding
                                                </Card.Title>
                                            </Card.Header>


                                        </Card>

                                        <br></br>
                                    </Accordion>
                                </Col>

                                <Col md="4" xs="12">
                                    <Accordion>
                                        <br></br>
                                        <Card className="rounded-lg">
                                            <Card.Header className="bg-success text-white d-flex">
                                                <Accordion.Toggle as={Button} variant="link"
                                                    className="mx-auto text-white" eventKey="2">
                                                    Companions
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="2">
                                                <Card.Body>{vgObj.herbsCompanions}</Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                        <br></br>
                                        <Card className="rounded-lg">
                                            <Card.Header className="bg-success text-white d-flex">
                                                <Card.Title as="p" className="my-0 mx-auto">
                                                    Bad Companions
                                                </Card.Title>
                                            </Card.Header>

                                        </Card>
                                        <br></br>
                                        <Card className="rounded-lg">
                                            <Card.Header className="bg-success text-white d-flex">
                                                <Card.Title as="p" className="my-0 mx-auto">
                                                    Spacing
                                                </Card.Title>
                                            </Card.Header>
                                        </Card>
                                        <br></br>
                                        <Card className="rounded-lg">
                                            <Card.Header className="bg-success text-white d-flex">
                                                <Card.Title as="p" className="my-0 mx-auto">
                                                    Sow and Plant
                                                </Card.Title>
                                            </Card.Header>
                                        </Card>
                                        <br></br>
                                        <Card className="rounded-lg">
                                            <Card.Header className="bg-success text-white d-flex">
                                                <Card.Title as="p" className="my-0 mx-auto">
                                                    Planting Months
                                                </Card.Title>
                                            </Card.Header>
                                        </Card>
                                        <br></br>
                                    </Accordion>
                                </Col>

                                <Col md="4" xs="12">
                                    <Accordion>
                                        <br></br>
                                        <Card className="rounded-lg">
                                            <Card.Header className="bg-success text-white d-flex">
                                                <Accordion.Toggle as={Button} variant="link"
                                                    className="mx-auto text-white" eventKey="3">
                                                    Harvesting Months
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="3">
                                                <Card.Body>{vgObj.herbsHM}</Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                        <br></br>
                                        <Card className="rounded-lg">
                                            <Card.Header className="bg-success text-white d-flex">
                                                <Card.Title as="p" className="my-0 mx-auto">
                                                    Notes
                                                </Card.Title>
                                            </Card.Header>
                                        </Card>
                                        <br></br>
                                        <Card className="rounded-lg">
                                            <Card.Header className="bg-success text-white d-flex">
                                                <Card.Title as="p" className="my-0 mx-auto">
                                                    Harvesting
                                                </Card.Title>
                                            </Card.Header>
                                        </Card>
                                        <br></br>
                                        <Card className="rounded-lg">
                                            <Card.Header className="bg-success text-white d-flex">
                                                <Card.Title as="p" className="my-0 mx-auto">
                                                    Troubleshooting
                                                </Card.Title>
                                            </Card.Header>
                                        </Card>
                                        <br></br>
                                    </Accordion>
                                </Col>
                            </Row>
                            <Row>
                                <Button className="text-success" as={Link} to="/herbs" variant="link">
                                    Go Back To List
                            </Button>
                            </Row> </Container>
                    </Card>
                </div>
            </Container>

        )
    }
}
export default GSingleHerb;