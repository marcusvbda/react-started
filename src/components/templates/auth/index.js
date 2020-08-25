import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Container, Image, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function AuthTemplate({ title, children }) {

    useEffect(() => {
        const GetTitle = () => {
            const defaultTitle = "Pixer"
            if (!title) return defaultTitle
            return `${title} | ${defaultTitle}`
        }
        document.title = GetTitle()
    }, [title])

    return (
        <>
            <Navbar expand="lg" bg="ligth" className="d-flex align-items-center">
                <Container >
                    <Image src="/images/logo_clean.png"
                        height="50"
                        alt="Pixer" />
                    <Nav className="ml-auto">
                        <Link to="/" className="text-dark">
                            <FontAwesomeIcon icon={faTimes} style={{ fontSize: 50 }} className="cursor-pointer" />
                        </Link>
                    </Nav>
                </Container>
            </Navbar>
            <main>
                {children}
            </main>
            <footer className="footer text-muted mt-4">
                <Container>
                    <Row className="d-flex justify-content-center align-items-center">
                        <Col sm={12} lg={6} className="d-flex flex-column">
                            <small className="text-center">* Ao se inscrever, você concorda com os nossos <Link to="/about/terms-of-use">Termos de Uso</Link> e</small>
                            <small className="text-center">a receber emails e atualizações Pixer e</small>
                            <small className="text-center">reconhece que você leu nossa <Link to="/about/privacy">Política de Privacidade</Link>.</small>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    )
}