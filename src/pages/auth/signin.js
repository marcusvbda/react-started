import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthTemplate from '@components/templates/auth'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import FloatingLabelInput from '@components/form/floating-label-input'
import { isValidEmail, isValidPassword } from '@utils/helpers'
import SocialBtn from '@components/form/social-btn'

export default function Signin() {
    const [form, setForm] = useState({ email: "", password: "", compare_email: "", compare_password: "" })
    const [error, setError] = useState({ email: null, password: null, compare_email: null, compare_password: null })
    const [loading, setLoading] = useState(false)

    const submitLogin = e => {
        e.preventDefault()
        if (!form.email || !form.password || !form.compare_email || !form.compare_password) return setError({
            email: (form.email ? null : "Campo senha é obrigatório"),
            password: (form.password ? null : "Campo email é obrigatório"),
            compare_email: (form.compare_email ? null : "Campo de confirmação de email é obrigatório"),
            compare_password: (form.compare_password ? null : "Campo de confirmação de senha é obrigatório"),
        })
        if (error.email || error.password || error.compare_email || error.compare_password) return console.log("Formulario inválido")
        setLoading(true)
        console.log("formulario válido")
    }

    const SignBtnContent = () => {
        if (!loading) return <span>Registre-se</span>
        return (<>
            <span className="spinner-grow spinner-grow-sm mr-2" />
            <span>Registrando...</span>
        </>)
    }

    const handleBlurEmail = () => {
        if (!form.email) return setError({ ...error, email: null })
        const valid = isValidEmail(form.email)
        if (!valid) return setError({ ...error, email: "Digite um email válido" })
        return setError({ ...error, email: null })
    }

    const handleBlurCompareEmail = () => {
        if (!form.compare_email) return setError({ ...error, compare_email: null })
        const valid = form.email === form.compare_email
        if (!valid) return setError({ ...error, compare_email: "Os emails digitados não coincidem" })
        return setError({ ...error, compare_email: null })
    }

    const handleBlurPassword = () => {
        if (!form.password) return setError({ ...error, password: null })
        const valid = isValidPassword(form.password)
        if (!valid) return setError({ ...error, password: "A senha precisa conter no mínimo 6, no maximo 20 caracteres e numéricos" })
        return setError({ ...error, password: null })
    }

    const handleBlurComparePassword = () => {
        if (!form.compare_password) return setError({ ...error, compare_password: null })
        const valid = form.password === form.compare_password
        if (!valid) return setError({ ...error, compare_password: "As senhas digitadas não coincidem" })
        return setError({ ...error, compare_password: null })
    }

    return (
        <AuthTemplate title="Registre-se">
            <Container>
                <h1 className="text-center">Registre-se</h1>
                <div className="text-center font-weight-light mb-5">
                    Já tem uma conta Pixer ? <Link to="/auth/login">login</Link> 😎
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
                                        className="mb-4"
                                        id="compare_email"
                                        label="Digite o email novamente"
                                        placeholder="Digite aqui o seu email novamente..."
                                        value={form.compare_email}
                                        onChange={el => setForm({ ...form, compare_email: el.target.value })}
                                        onBlur={handleBlurCompareEmail}
                                        error={error.compare_email}
                                    />
                                    <FloatingLabelInput
                                        className="mb-4"
                                        id="password"
                                        label="Senha"
                                        type="password"
                                        placeholder="Digite aqui a sua senha ..."
                                        value={form.password}
                                        onChange={el => setForm({ ...form, password: el.target.value })}
                                        onBlur={handleBlurPassword}
                                        error={error.password}
                                    />
                                    <FloatingLabelInput
                                        className="mb-4"
                                        id="compare_password"
                                        label="Digite a sua senha novamente"
                                        type="password"
                                        placeholder="Digite aqui a sua senha novamente ..."
                                        value={form.compare_password}
                                        onChange={el => setForm({ ...form, compare_password: el.target.value })}
                                        onBlur={handleBlurComparePassword}
                                        error={error.compare_password}
                                    />
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