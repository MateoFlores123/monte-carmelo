'use client'

import CookieConsent from 'react-cookie-consent'

export default function CookieBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Aceptar"
      declineButtonText="Rechazar"
      enableDeclineButton
      cookieName="montecarmelo_cookie_consent"
      style={{ background: '#1f2937', fontSize: '14px', alignItems: 'center' }}
      buttonStyle={{ background: '#059669', color: '#fff', borderRadius: '6px', padding: '8px 16px' }}
      declineButtonStyle={{ background: 'transparent', color: '#fff', border: '1px solid #fff', borderRadius: '6px', padding: '8px 16px' }}
      expires={365}
      onAccept={() => {
        // Aquí activas Google Analytics u otros scripts de tracking
        console.log('Cookies aceptadas')
      }}
      onDecline={() => {
        console.log('Cookies rechazadas')
      }}
    >
      Usamos cookies para mejorar tu experiencia en nuestro sitio. Al continuar navegando, aceptas nuestra{' '}
      <a href="/politica-de-privacidad" style={{ color: '#34d399', textDecoration: 'underline' }}>
        política de cookies
      </a>.
    </CookieConsent>
  )
}