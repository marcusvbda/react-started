import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthTemplate from '@components/templates/auth'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import SocialBtn from '@components/auth/social-btn'
import { Formik } from "formik"
import * as yup from "yup"
import Loading from '@components/loading'

export default function Login() {
    const { REACT_APP_FACEBOOK_APP_KEY, REACT_APP_GOOGLE_APP_KEY } = process.env
    const [loading, setLoading] = useState({
        form: false,
        facebook: false,
        google: false
    })

    const handleLoginForm = values => {
        console.log(values)
        setLoading({ ...loading, form: true })
    }

    const handleFacebook = values => {
        console.log(values)
        setLoading({ ...loading, facebook: true })
    }

    const handleGoogle = values => {
        console.log(values)
        setLoading({ ...loading, google: true })
    }

    const LoginForm = () => {
        const schema = yup.object({
            email: yup.string().email("Digite um email válido").required("Email é campo obrigatório"),
            password: yup.string().required("Senha é campo obrigatório")
        })
        return (
            <Formik
                validationSchema={schema}
                onSubmit={handleLoginForm}
                initialValues={{
                    email: 'teste@teste.com',
                    password: 'teste',
                    remember: true
                }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors,
                    isValid
                }) => (
                        <Form noValidate onSubmit={e => { e.preventDefault(); handleSubmit(e) }}>
                            <Form.Row>
                                <Form.Group as={Col} md="12" controlId="email">
                                    <Form.Label className="text-muted">Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        isValid={values.email && !errors.email}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md="12" controlId="password">
                                    <Form.Label className="text-muted">Senha</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        isValid={values.password && !errors.password}
                                        isInvalid={!!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md={6} sm={12} controlId="remember">
                                    <Form.Check
                                        label="Lembrar de mim"
                                        name="remember"
                                        checked={values.remember}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Col md={6} sm={12} className="text-right">
                                    <Link to="#">Esqueceu a senha ?</Link>
                                </Col>
                            </Form.Row>
                            <Row>
                                <Col sm={12} lg={6}>
                                    <Button type="submit" disabled={!isValid} variant="outline-primary" block className="rounded-pill">LOGIN</Button>
                                </Col>
                            </Row>
                        </Form>
                    )}
            </Formik>
        )
    }

    return (
        <AuthTemplate title="Entrar">
            <Container>
                <h1 className="text-center">Login</h1>
                <div className="text-center font-weight-light mb-5">
                    Novo no Pixer ? <Link to="/auth/signin">Registre-se</Link> 💜
                </div>
                <Row className="d-flex flex-row justify-content-center mb-5">
                    <Col sm={12} lg={9} className="mt-5">
                        <Row>
                            <Col sm={12} lg={6} style={{ borderRight: `1px solid #e7e7e7` }} className="px-4">
                                <Loading isLoading={loading.form} points>
                                    <LoginForm />
                                </Loading>
                            </Col>
                            <Col sm={12} lg={6} className="px-5 d-flex flex-column justify-content-center align-content-center py-5">
                                <Loading isLoading={loading.facebook} points>
                                    {REACT_APP_FACEBOOK_APP_KEY && <SocialBtn facebookKey={REACT_APP_FACEBOOK_APP_KEY} variant="facebook" onClick={handleFacebook} />}
                                </Loading>
                                <Loading isLoading={loading.google} points>
                                    {REACT_APP_GOOGLE_APP_KEY && <SocialBtn googleKey={REACT_APP_GOOGLE_APP_KEY} variant="google" className="mt-2" onClick={handleGoogle} />}
                                </Loading>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </AuthTemplate>
    )
}