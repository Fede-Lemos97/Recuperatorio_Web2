import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function App() {
  const form = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const SERVICE_ID = 'service_f2lnlmb';
    const TEMPLATE_ID = 'template_g1x8668';
    const PUBLIC_KEY = 'lIqDbXKuQsLLpHZww';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
        setLoading(false);
        setSubmitted(true);
        form.current.reset();
      }, (error) => {
        setLoading(false);
        setErrorMsg('Hubo un error al enviar el mensaje. Inténtalo nuevamente.');
        console.error('Error de EmailJS:', error.text);
      });
  };

  return (
    <div>
      <div className="page-header contact">
        <h1>Formulario</h1>
        <p>¿Tienes dudas sobre tus pedidos o necesitas asistencia personalizada? Ponte en contacto con nuestro equipo de atención completando el formulario o visítanos directamente en nuestra sede.</p>
      </div>

      <div className="contact-container">
        
        <div className="contact-card">
          <h2>Envíanos un mensaje</h2>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '20px', color: '#065f46' }}>
              <h3>¡Mensaje Enviado con Éxito!</h3>
              <p style={{ fontSize: '0.85rem', marginTop: '8px' }}>
                Tu consulta ha llegado directamente a nuestra bandeja de entrada.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                style={{ marginTop: '12px', background: 'none', border: 'none', color: '#4f46e5', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form ref={form} onSubmit={handleSubmit}>
              {errorMsg && (
                <p style={{ color: '#dc2626', background: '#fee2e2', padding: '10px', borderRadius: '4px', fontSize: '0.85rem', marginBottom: '15px' }}>
                  {errorMsg}
                </p>
              )}

              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="user_name"
                  required
                  placeholder="Tu nombre"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="user_email"
                  required
                  placeholder="correo@ejemplo.com"
                />
              </div>

              <div className="form-group">
                <label>Asunto</label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Asunto de la consulta"
                />
              </div>

              <div className="form-group">
                <label>Mensaje</label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  placeholder="Escribe tu mensaje..."
                ></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          )}
        </div>

        <div className="contact-card">
          <h2>Ubicación</h2>
          <div className="map-wrapper">
            <iframe
              title="Mapa de ubicación UPATecO Salta"
              src="https://maps.google.com/maps?q=UPATECO+Universidad+Provincial+de+Salta,+Pereyra+Rozas,+Salta&t=&z=16&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              style={{ width: '100%', height: '100%', border: 0 }}
            ></iframe>
          </div>
          <p className="info-text">📍 Av. Constitución Nacional s/n, B° Pereyra Rozas - Salta Capital</p>
        </div>

      </div>
    </div>
  );
}