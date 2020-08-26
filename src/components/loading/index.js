import React from 'react'
import { Row, Col, Spinner } from 'react-bootstrap'

export default function Loading({ isLoading, children, points, text }) {
    const RenderLoading = () => {
        if (points) return (
            <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex flex-row">
                    <Spinner animation="grow" className="mr-2" size="sm" />
                    <Spinner animation="grow" className="mr-2" size="sm" />
                    <Spinner animation="grow" className="mr-2" size="sm" />
                </div>
                {text && <span class="text-muted">{text}</span>}
            </div>
        )
        return (
            <div className="d-flex flex-column justify-content-center align-items-center">
                <Spinner animation="border" role="status" />
                {text && <span className="text-muted text-center">{text}</span>}
            </div>
        )
    }

    if (isLoading) return (
        <Row className="h-100">
            <Col className="d-flex align-items-center justify-content-center">
                <RenderLoading />
            </Col>
        </Row>
    )
    return (
        <>
            {children}
        </>
    )
}