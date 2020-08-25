import React, { useEffect, useState, useRef } from 'react'
import { Form } from 'react-bootstrap'
import './styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'

export default function FloatingLabelInput({ id, type, label, description, placeholder, error, value, onChange, onBlur, className }) {
    const [focused, setFocused] = useState(false)
    const container = useRef('container')

    useEffect(() => {
        if (focused) container.current.classList.add("focused")
        else container.current.classList.remove("focused")

        if (value) container.current.classList.add("with-content")
        else container.current.classList.remove("with-content")

        if (error) container.current.classList.add("has-error")
        else container.current.classList.remove("has-error")
    })

    const GetLabel = () => {
        if (!label) return ""
        return (
            <Form.Label>{label}</Form.Label>
        )
    }

    const GetDescription = () => {
        if (!description) return ""
        return (
            <Form.Text className="text-muted mt-0">
                <small>{description}</small>
            </Form.Text>
        )
    }

    const GetErrorDescription = () => {
        if (focused) return ""
        if (!error) return ""
        if (typeof error != "string") return ""
        return (
            <Form.Text className="text-danger error-description mt-0">
                <small>{error}</small>
            </Form.Text>
        )
    }

    const getId = () => {
        if (id) return id
        return ""
    }

    const getType = () => {
        if (type) return type
        return "text"
    }

    const handleOnBlur = () => {
        setFocused(false)
        if (onBlur) onBlur()
    }

    const GetErrorIcon = () => {
        if (!error) return ""
        return (
            <FontAwesomeIcon icon={faExclamation} className="text-danger error-icon" />
        )
    }

    return (
        <Form.Group controlId={getId()} className={`floating-label-input ${className}`} ref={container}>
            <GetLabel />
            <Form.Control
                placeholder={placeholder}
                type={getType()}
                onFocus={() => setFocused(true)}
                onBlur={handleOnBlur}
                onChange={onChange}
                value={value}
            />
            <div className="form-line">
                <div className="colored" />
            </div>
            <GetErrorDescription />
            <GetDescription />
            <GetErrorIcon />
        </Form.Group>
    )
}