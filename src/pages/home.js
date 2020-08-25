import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Jumbotron, Container, Row, Col } from 'react-bootstrap'
import LandingTemplate from '@components/templates/landing'

export default function Home() {

    const RenderItems = () => {
        let items = []
        for (let i = 0;i < 3;i++) {
            items.push(
                <Col sm={12} lg={4} key={i}>
                    <h2>Heading</h2>
                    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                    <p><Link className="btn btn-secondary" to="#" role="button">Fusce dapibus</Link></p>
                </Col>
            )
        }
        return items
    }

    return (
        <LandingTemplate title="Lorem Ipsum">
            <Jumbotron>
                <Container>
                    <h1>Lorem ipsum!</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae sapien finibus, tincidunt justo vel, rhoncus dolor. Etiam tincidunt pulvinar metus ac mattis. Aliquam viverra consectetur libero, pulvinar sagittis ipsum egestas ac. Nunc sit amet blandit mauris. In placerat facilisis lacus sed faucibus. In quis ultrices nisl. Aliquam vestibulum in turpis luctus rutrum. Nam lacinia turpis ac mi vulputate, in interdum dui iaculis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.
                        </p>
                    <p>
                        <Link to="/auth/login">
                            <Button variant="primary">Entrar</Button>
                        </Link>
                    </p>
                </Container>
            </Jumbotron>
            <Container>
                <Row>
                    <RenderItems />
                </Row>
            </Container>
        </LandingTemplate>
    )
}