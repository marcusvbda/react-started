import React from 'react'
import { Image } from 'react-bootstrap'
import './styles.scss'

export default function SocialBtn({ variant, className, onClick }) {

    const BtnContent = () => {
        switch (variant) {
            case 'facebook': return "Continuar com o Facebook"
            case 'google': return "Continuar com o Google"
            default: return `Continuar com ${variant}`
        }
    }

    return (
        <button className={`social-btn ${variant} ${className}`} onClick={onClick}>
            <div className="buttonIcon">
                <Image src={`/images/social/${variant}-logo.svg`} />
            </div>
            <div className="text-center w-100">
                <BtnContent />
            </div>
        </button>
    )
}
