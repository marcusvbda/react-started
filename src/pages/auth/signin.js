import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthTemplate from '@components/templates/auth'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import SocialBtn from '@components/auth/social-btn'
import { Formik } from "formik"
import * as yup from "yup"
import Loading from '@components/loading'

export default function Signin() {
    const { REACT_APP_FACEBOOK_APP_KEY, REACT_APP_GOOGLE_APP_KEY } = process.env
    const [loading, setLoading] = useState({
        form: false,
        facebook: false,
        google: false
    })

    const handleSigninForm = values => {
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

    const SigninForm = () => {
        const schema = yup.object({
            email: yup.string().email("Digite um email válido").required("Email é campo obrigatório"),
            confirm_email: yup.string().required("Confirme o email").oneOf([yup.ref('email'), null], 'Os emails não coincidem'),
            password: yup.string().required("Senha é campo obrigatório").min(8, 'Senha deve conter pelo menos 8 caracteres'),
            confirm_password: yup.string().required("Confirme a senha").oneOf([yup.ref('password'), null], 'Os senhas não coincidem')
        })
        return (
            <Formik
                validationSchema={schema}
                onSubmit={handleSigninForm}
                initialValues={{
                    email: '',
                    password: '',
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
                        <Form noValidate onSubmit={handleSubmit}>
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
                                <Form.Group as={Col} md="12" controlId="confirm_email">
                                    <Form.Label className="text-muted">Confirme o Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="confirm_email"
                                        value={values.confirm_email}
                                        onChange={handleChange}
                                        isValid={values.confirm_email && !errors.confirm_email}
                                        isInvalid={!!errors.confirm_email}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.confirm_email}</Form.Control.Feedback>
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
                                <Form.Group as={Col} md="12" controlId="confirm_password">
                                    <Form.Label className="text-muted">Confirme a Senha</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirm_password"
                                        value={values.confirm_password}
                                        onChange={handleChange}
                                        isValid={values.confirm_password && !errors.confirm_password}
                                        isInvalid={!!errors.confirm_password}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.confirm_password}</Form.Control.Feedback>
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
                                    <Button disabled={!isValid} type="submit" variant="outline-primary" block className="rounded-pill">
                                        {
                                            !loading.form ? 'Login' : (
                                                <>
                                                    <span className="spinner-grow spinner-grow-sm mr-2" />
                                                    <span>Entrando...</span>
                                                </>
                                            )
                                        }
                                    </Button>
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
                <h1 className="text-center">Registre-se</h1>
                <div className="text-center font-weight-light mb-5">
                    Já tem uma conta Pixer ? <Link to="/auth/login">login</Link> 😎
                </div>
                <Row className="d-flex flex-row justify-content-center mb-5">
                    <Col sm={12} lg={9} className="mt-5">
                        <Row>
                            <Col sm={12} lg={6} style={{ borderRight: `1px solid #e7e7e7` }} className="px-4">
                                <Loading isLoading={loading.form} points>
                                    <SigninForm />
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