import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button, Image, Container } from 'react-bootstrap'

export default function LandingTemplate({ title, children }) {

    const GetYear = () => {
        const date = new Date()
        const start_date = '2019'
        const current_date = date.getFullYear()
        if (start_date === current_date) return current_date
        return `${start_date} - ${date.getFullYear()}`
    }

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
            <Navbar expand="lg" bg="ligth">
                <Container>
                    <Link to="">
                        <Navbar.Brand className="cursor-pointer">
                            <Image src="/images/logo_clean.png"
                                height="30"
                                alt="Pixer" />
                        </Navbar.Brand>
                    </Link>
                    <Nav className="ml-auto">
                        <Link to="/auth/login">
                            <Button variant="outline-success rounded-pill">Entrar</Button>
                        </Link>
                    </Nav>
                </Container>
            </Navbar>
            <main>
                {children}
            </main>
            <footer className="footer container text-muted mt-4">
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <Image src="/images/logo_clean.png"
                        height="25"
                        alt="Pixer" />
                    <GetYear />
                </div>
            </footer>
        </>
    )
}