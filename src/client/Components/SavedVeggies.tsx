import React, { useState, useEffect } from 'react';
import {
    Card, Container, Jumbotron, Row, Col, Button,
    Collapse, Alert, Modal, ProgressBar
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IAppProps } from '../App';
import { api, Token } from '../Services/apiServices';
import { FaTrashAlt } from 'react-icons/fa'

const SavedVeggies: React.FC<IAppProps> = props => {

    const [apiArray, setApiArray] = useState([]);
    const [deleted, setDeleted] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<JSX.Element>()

    let fetchAPI = async () => {
        let vegResponse = await api(`/api/savedvegetables/${Token}`);
        let herbResponse = await api(`/api/savedherbs/${Token}`)
        makeCards(vegResponse, herbResponse)
        setDeleted(false)
        setDeleting(<div></div>)
    }

    let handleClickVeggie = async (e: React.MouseEvent<HTMLButtonElement>, vegId: number, veggieName: string) => {
        setDeleting(
            <Modal show={true} animation={true} size="sm"
                autoFocus={true} restoreFocus={true}>
                <Modal.Header>
                    <Modal.Title>Deleting {veggieName}...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProgressBar animated now={100} variant="danger" />
                </Modal.Body>
            </Modal>
        )
        let response = await api(`/api/savedvegetables/${vegId}`, "DELETE", { Token })
        setDeleted(true)
    }
    let handleClickHerb = async (e: React.MouseEvent<HTMLButtonElement>, herbId: number, herbName: string) => {
        setDeleting(
            <Modal show={true} animation={true} size="sm"
                autoFocus={true} restoreFocus={true}>
                <Modal.Header>
                    <Modal.Title>Deleting {herbName}...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProgressBar animated now={100} variant="danger" />
                </Modal.Body>
            </Modal>
        )
        let response = await api(`/api/savedherbs/${herbId}`, "DELETE", { Token })
        setDeleted(true)
    }

    let makeCards = (vegObj: any, herbObj: any) => {
        if (vegObj.length === 0 && herbObj.length === 0) {
            setApiArray([(
                <Row key="0">
                    <Alert variant="warning" className="mx-auto col-sm-8 d-flex flex-column">
                        <h6 className="mx-auto">Looks like no vegetables have been added yet...</h6>
                        <p className="mx-auto mb-1">Click For{" "}
                            <Alert.Link as={Link} to="/choose">Help</Alert.Link>
                            {" "}on How To Choose!</p>
                        <p className="mx-auto mb-0">
                            Click To{" "}
                            <Alert.Link className="mx-auto" as={Link} to="/veggies">View</Alert.Link>
                            {" "}All Vegetables
                        </p>

                    </Alert>
                </Row>
            )])
        } else {
            let vegCards = vegObj.map((element: any, index: any) => {
                let veggieImg = element.url;
                let veggieName = element.name;
                let veggieId = element.id;
                let veggieSciName = element.sci_name

                return (
                    <Container className=" p-3 mb-0 rounded border-0 " key={`veggie ${veggieId}`}>
                        <Row className="d-flex ">
                            <Card className="mx-auto col-sm-8 py-4 bg-success shadow mb-2">
                                <Row className="px-3">
                                    <Col lg="3" xs="12" className="pr-0 py-2">
                                        <Card.Img className="rounded border border-light " variant="top"
                                            src={veggieImg} />

                                        <Card.ImgOverlay className="px-0 py-0">
                                            <Button className="px-1 py-1 text-center" variant="danger"
                                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => { handleClickVeggie(e, veggieId, veggieName) }}>
                                                <FaTrashAlt size="1.5em"/>
                                            </Button>
                                        </Card.ImgOverlay>
                                    </Col>
                                    <Col lg="5" xs="8" className="pl-1 py-2">
                                        <Card.Body className="p-3 mb-2 bg-success text-light">
                                            <Card.Title>{veggieName}</Card.Title>
                                            <Card.Text className="text-white">
                                                {veggieSciName}
                                            </Card.Text>
                                        </Card.Body>
                                    </Col>
                                    <Col lg="3" xs="4" className="ml-auto py-2 d-flex">
                                        <Button className="shadow p-3 mb-5 ml-auto text-center text-white border-white bg-success"
                                            as={Link} to={`/veggies/${veggieId}`}>Read More</Button>
                                    </Col>
                                </Row>
                            </Card>
                        </Row>
                    </Container>
                )
            })

            let herbCards = herbObj.map((element: any, index: any) => {
                let herbImg = element.url;
                let herbName = element.name;
                let herbId = element.id;
                let herbSciName = element.sci_name

                return (
                    <Container className=" p-3 mb-0 rounded border-0 " key={`herb #${herbId}`}>
                        <Row className="d-flex ">
                            <Card className="mx-auto col-sm-8 py-4 bg-success shadow mb-2">
                                <Row className="px-3">
                                    <Col lg="3" xs="12" className="pr-0 py-2">
                                        <Card.Img className="rounded border border-light " variant="top"
                                            src={herbImg} />

                                        <Card.ImgOverlay className="px-0 py-0">
                                            <Button className="px-1 py-1  text-center" variant="danger"
                                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => { handleClickHerb(e, herbId, herbName) }}>
                                                <FaTrashAlt size="1.5em" />
                                            </Button>
                                        </Card.ImgOverlay>

                                    </Col>
                                    <Col lg="5" xs="8" className="pl-1 py-2">
                                        <Card.Body className="p-3 mb-2 bg-success text-light">
                                            <Card.Title>{herbName}</Card.Title>
                                            <Card.Text className="text-white">
                                                {herbSciName}
                                            </Card.Text>
                                        </Card.Body>
                                    </Col>
                                    <Col lg="3" xs="4" className="ml-auto py-2 d-flex">
                                        <Button className="shadow p-3 mb-5 ml-auto text-center text-white border-white bg-success"
                                            as={Link} to={`/userherbs/${herbId}`}>Read More</Button>
                                    </Col>
                                </Row>
                            </Card>
                        </Row>
                    </Container>
                )
            })
            let plantCards = [...vegCards, ...herbCards]
            setApiArray(plantCards)
        }
    }
    // useEffect [] same as componentDidMount()
    useEffect(() => {
        fetchAPI()
    }, [deleted])


    return (
        <React.Fragment>
            <Jumbotron fluid className="shadow rounded text-secondary bg-success text-light">
                <h1>My Garden</h1>
            </Jumbotron>
            <Container fluid className="bg-succss">
                {deleting}
                {apiArray}
            </Container>

        </React.Fragment>
    )
}




export default SavedVeggies;