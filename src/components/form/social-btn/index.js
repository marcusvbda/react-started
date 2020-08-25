import React from 'react'
import { Image } from 'react-bootstrap'
import './styles.scss'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'

export default function SocialBtn({ variant, className, onClick, facebookKey, googleKey }) {
    const BtnContent = () => {
        switch (variant) {
            case 'facebook': return "Continuar com o Facebook"
            case 'google': return "Continuar com o Google"
            default: return `Continuar com ${variant}`
        }
    }

    if (variant === 'facebook' && facebookKey) return (
        <FacebookLogin
            appId={facebookKey}
            callback={onClick}
            cssClass={`social-btn ${variant} ${className} w-100`}
            textButton={<div className="w-100">{BtnContent()}</div>}
            icon={<div className="buttonIcon"><Image src={`/images/social/${variant}-logo.svg`} /></div>}
        />
    )

    if (variant === 'google' && googleKey) return (
        <GoogleLogin
            clientId={googleKey}
            render={renderProps => (
                <button className={`social-btn ${variant} ${className}`} onClick={renderProps.onClick} >
                    <div className="buttonIcon">
                        <Image src={`/images/social/${variant}-logo.svg`} />
                    </div>
                    <div className="text-center w-100">
                        <BtnContent />
                    </div>
                </button >
            )}
        />
    )

    return (<></>)
}
