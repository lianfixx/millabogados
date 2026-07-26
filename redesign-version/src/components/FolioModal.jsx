// MILLA ABOGADOS — Modal de confirmación con folio único.
import { useState } from 'react';

export function FolioModal({ folio, name, topic, onClose }) {
  const [copied, setCopied] = useState(false);
  const now = new Date().toLocaleString('es-MX', { dateStyle: 'full', timeStyle: 'short' });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(folio);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
    }
  };

  return (
    <div className="folio-overlay" role="dialog" aria-modal="true" aria-label="Confirmación de consulta">
      <div className="folio-modal">
        <div className="folio-badge">✓ Registro exitoso</div>
        <h2>Tu consulta ha sido registrada</h2>
        <div className="folio-code">
          <span>Folio</span>
          <strong>{folio}</strong>
          <button onClick={handleCopy} aria-label="Copiar folio">{copied ? '✓ Copiado' : '📋 Copiar'}</button>
        </div>
        <div className="folio-details">
          <p><strong>{name}</strong> · {topic}</p>
          <p className="folio-timestamp">{now}</p>
        </div>
        <p className="folio-message">Te responderemos en máximo 48 horas hábiles al correo proporcionado. Guarda este folio para dar seguimiento.</p>
        <button className="btn btn-primary" onClick={onClose}>Entendido</button>
      </div>
    </div>
  );
}
