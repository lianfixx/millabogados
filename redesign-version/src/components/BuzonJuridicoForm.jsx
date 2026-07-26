// MILLA ABOGADOS — Buzón Jurídico: formulario seguro con validación, honeypot, sanitización XSS y generación de folio.
// Este componente es la interfaz que conecta con el backend (POST /api/consultas).

import { useState, useEffect, useRef } from 'react';
import { generateFolio } from '../utils/folioGenerator';
import { sanitizeInput } from '../utils/sanitize';
import { FolioModal } from './FolioModal';

const topics = [
  'Selecciona una materia',
  'Corporativo',
  'Civil y Familiar',
  'Laboral y Mercantil',
  'Fiscal',
  'Amparo',
  'Otra / Por identificar'
];

export function BuzonJuridicoForm({ preSelectedTopic = '' }) {
  const [topic, setTopic] = useState(preSelectedTopic || topics[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [websiteHp, setWebsiteHp] = useState(''); // honeypot invisible
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [folio, setFolio] = useState('');
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (preSelectedTopic && topics.includes(preSelectedTopic)) {
      setTopic(preSelectedTopic);
    }
  }, [preSelectedTopic]);

  const validate = () => {
    const errs = {};
    if (!name.trim() || name.trim().length < 2) errs.name = 'Nombre completo requerido';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) errs.email = 'Correo electrónico válido requerido';
    if (topic === topics[0]) errs.topic = 'Selecciona una materia';
    if (!message.trim() || message.trim().length < 80) errs.message = 'Mínimo 80 caracteres. Describe los hechos con fechas.';
    if (websiteHp.trim()) errs.spam = 'Actividad automatizada detectada';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const sanitized = {
      topic: sanitizeInput(topic),
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: sanitizeInput(phone),
      message: sanitizeInput(message)
    };

    // Generar folio único
    const ticketFolio = generateFolio();
    setFolio(ticketFolio);

    // TODO: Conectar con endpoint real
    // await fetch('/api/consultas', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ ...sanitized, folio: ticketFolio })
    // });

    setSubmitted(true);
    setShowModal(true);
  };

  return (
    <>
      <form ref={formRef} className="legal-inbox" onSubmit={handleSubmit} noValidate>
        <div className="field-group">
          <label htmlFor="inbox-matter">Materia del asunto</label>
          <select id="inbox-matter" value={topic} onChange={e => setTopic(e.target.value)}>
            {topics.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.topic && <span className="form-error">{errors.topic}</span>}
        </div>
        <div className="inbox-inline-fields">
          <div className="field-group">
            <label htmlFor="inbox-name">Nombre completo</label>
            <input id="inbox-name" type="text" autoComplete="name" value={name} onChange={e => setName(e.target.value)} />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>
          <div className="field-group">
            <label htmlFor="inbox-email">Correo de respuesta</label>
            <input id="inbox-email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
        </div>
        <div className="field-group">
          <label htmlFor="inbox-phone">Teléfono / WhatsApp</label>
          <input id="inbox-phone" type="tel" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        {/* Honeypot — invisible para humanos, trampa para bots */}
        <div className="honeypot-field" aria-hidden="true">
          <label htmlFor="website_hp">Website</label>
          <input id="website_hp" type="text" tabIndex={-1} autoComplete="off" value={websiteHp} onChange={e => setWebsiteHp(e.target.value)} />
        </div>
        <div className="field-group">
          <label htmlFor="inbox-message">Mensaje</label>
          <textarea id="inbox-message" rows={7} minLength={80} maxLength={7000} required value={message} onChange={e => setMessage(e.target.value)} placeholder="Describe los hechos de forma clara, extensa y cronológica. Incluye fechas exactas, personas o autoridades involucradas, notificaciones, plazos, documentos disponibles y el resultado que buscas." />
          {errors.message && <span className="form-error">{errors.message}</span>}
        </div>
        {errors.spam && <div className="form-error-banner">{errors.spam}</div>}
        <button className="inbox-submit" type="submit">Enviar al Socio Director ↗</button>
      </form>
      {showModal && <FolioModal folio={folio} name={name} topic={topic} onClose={() => setShowModal(false)} />}
    </>
  );
}
