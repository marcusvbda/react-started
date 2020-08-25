import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthTemplate from '@components/templates/auth'
import { isValidEmail, isValidPassword } from '@utils/helpers'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import SocialBtn from '@components/form/social-btn'
import FloatingLabelInput from '@components/form/floating-label-input'

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "", remember: true })
    const [error, setError] = useState({ email: null, password: null })
    const [loading, setLoading] = useState(false)

    const submitLogin = e => {
        e.preventDefault()
        if (!form.email || !form.password) return setError({
            email: (form.email ? null : "Campo senha é obrigatório"),
            password: (form.password ? null : "Campo email é obrigatório")
        })
        if (error.email || error.password) return console.log("Formulario inválido")
        setLoading(true)
        console.log("formulario válido")
    }

    const SignBtnContent = () => {
        if (!loading) return <span>Entrar</span>
        return (<>
            <span className="spinner-grow spinner-grow-sm mr-2" />
            <span>Entrando...</span>
        </>)
    }

    const handleBlurEmail = () => {
        if (!form.email) return setError({ ...error, email: null })
        const valid = isValidEmail(form.email)
        if (!valid) return setError({ ...error, email: "Digite um email válido" })
        return setError({ ...error, email: null })
    }

    const handleBlurPassword = () => {
        if (!form.password) return setError({ ...error, password: null })
        const valid = isValidPassword(form.password, false)
        if (!valid) return setError({ ...error, password: "A senha precisa conter no mínimo 6 e no maximo 20 caracteres" })
        return setError({ ...error, password: null })
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
                                <Form onSubmit={e => submitLogin(e)}>
                                    <FloatingLabelInput
                                        className="mb-4"
                                        id="email"
                                        label="Email"
                                        placeholder="Digite aqui o Email ..."
                                        value={form.email}
                                        onChange={el => setForm({ ...form, email: el.target.value })}
                                        onBlur={handleBlurEmail}
                                        error={error.email}
                                    />
                                    <FloatingLabelInput
                                        className="mb-2"
                                        id="password"
                                        label="Senha"
                                        type="password"
                                        placeholder="Digite aqui a Senha ..."
                                        value={form.password}
                                        onChange={el => setForm({ ...form, password: el.target.value })}
                                        onBlur={handleBlurPassword}
                                        error={error.password}
                                    />
                                    <Row>
                                        <Col className="d-flex flex-row justify-content-between">
                                            <small>
                                                <Form.Group controlId="remeberMe">
                                                    <Form.Check type="checkbox" label="Lembrar de mim" checked={form.remember} onChange={() => setForm({ ...form, remember: !form.remember })} />
                                                </Form.Group>
                                            </small>
                                            <small>
                                                <Link to="/auth/account-recovery">
                                                    Esqueceu sua senha?
                                                </Link>
                                            </small>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={12} lg={6}>
                                            <Button
                                                type="submit"
                                                variant={`${loading ? 'primary' : 'outline-primary'} rounded-pill 
                                                mt-4 d-flex flex-row align-items-center justify-content-center`}
                                                block
                                                disabled={loading}
                                            >
                                                <SignBtnContent />
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                            <Col sm={12} lg={6} className="px-5 d-flex flex-column justify-content-center align-content-center py-5">
                                <SocialBtn variant="facebook" />
                                <SocialBtn variant="google" className="mt-3" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </AuthTemplate>
    )
}