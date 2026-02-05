import { useState, useRef, useCallback } from 'react';
import LetterForm from './components/LetterForm';
import LetterPreview from './components/LetterPreview';
import { SOGETRA, LOGO_PATH, generateReference } from './constants/sogetra';
import { escapeHtml, escapeHtmlWithBreaks } from './utils/escapeHtml';

/**
 * Générateur de courriers officiels SOGETRA SARL
 */
export default function App() {
  const today = new Date();
  const iframeRef = useRef(null);
  
  // État du formulaire
  const [formData, setFormData] = useState({
    date: today.toISOString().split('T')[0], // Format YYYY-MM-DD pour input type="date"
    destinataire: '',
    reference: generateReference(today),
    objet: '',
    corps: '',
    pj: '',
    copies: ''
  });
  
  // État de la vue (formulaire ou aperçu)
  const [view, setView] = useState('form');
  
  // État des erreurs de validation
  const [errors, setErrors] = useState({});

  // Gestion des changements de champs
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }, [errors]);

  // Validation du formulaire
  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!formData.date) {
      newErrors.date = 'La date est requise';
    }
    if (!formData.reference.trim()) {
      newErrors.reference = 'La référence est requise';
    }
    if (!formData.destinataire.trim()) {
      newErrors.destinataire = 'Le destinataire est requis';
    }
    if (!formData.objet.trim()) {
      newErrors.objet = "L'objet est requis";
    }
    if (!formData.corps.trim()) {
      newErrors.corps = 'Le corps du courrier est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Formater la date pour l'affichage
  const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return '[Date]';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  // Génération du HTML pour l'impression (avec échappement XSS)
  const getPrintHTML = useCallback(() => {
    // Échapper toutes les entrées utilisateur pour prévenir XSS
    const safeData = {
      date: escapeHtml(formatDateForDisplay(formData.date)),
      destinataire: escapeHtmlWithBreaks(formData.destinataire) || '[Destinataire]',
      reference: escapeHtml(formData.reference),
      objet: escapeHtml(formData.objet) || '[Objet]',
      corps: escapeHtmlWithBreaks(formData.corps) || '[Corps du courrier]',
      pj: escapeHtml(formData.pj),
      copies: escapeHtml(formData.copies)
    };

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Courrier SOGETRA</title>
  <style>
    @page { size: A4; margin: 15mm 20mm 25mm 20mm; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5; color: #000; padding: 20px; }
    .header { margin-bottom: 5px; }
    .logo { height: 80px; }
    .green-line { height: 3px; background: #228B22; margin: 10px 0 20px 0; }
    .date { text-align: right; margin-bottom: 20px; }
    .destinataire { margin-bottom: 15px; font-weight: bold; }
    .ref-objet { margin-bottom: 15px; }
    .ref-objet p { margin-bottom: 5px; }
    .separator { border-top: 1px solid #000; margin: 15px 0; }
    .corps { text-align: justify; margin-bottom: 30px; }
    .signature { text-align: right; margin-top: 40px; }
    .signature p { margin-bottom: 3px; }
    .signature .name { font-weight: bold; margin-top: 50px; }
    .pj-copies { margin-top: 30px; font-size: 11pt; }
    .pj-copies p { margin-bottom: 5px; }
    .footer { position: fixed; bottom: 10mm; left: 20mm; right: 20mm; text-align: center; font-size: 9pt; }
    .footer-line { height: 2px; background: #228B22; margin-bottom: 8px; }
    .footer p { margin-bottom: 2px; color: #333; }
  </style>
</head>
<body>
  <div class="header">
    <img src="${LOGO_PATH}" class="logo" alt="SOGETRA">
  </div>
  <div class="green-line"></div>
  <div class="date">Abidjan, le ${safeData.date}</div>
  <div class="destinataire">${safeData.destinataire}</div>
  <div class="ref-objet">
    <p><strong>N/Réf :</strong> ${safeData.reference}</p>
    <p><strong>Objet :</strong> ${safeData.objet}</p>
  </div>
  <div class="separator"></div>
  <div class="corps">${safeData.corps}</div>
  <div class="signature">
    <p>Pour ${escapeHtml(SOGETRA.fullName)}</p>
    <p class="name">${escapeHtml(SOGETRA.signataire)}</p>
    <p><em>${escapeHtml(SOGETRA.fonction)}</em></p>
    <p style="font-size:10pt; margin-top:10px;">${SOGETRA.contacts.map(escapeHtml).join(' / ')}</p>
  </div>
  ${safeData.pj ? `<div class="pj-copies"><p><strong>P.J :</strong> ${safeData.pj}</p></div>` : ''}
  ${safeData.copies ? `<div class="pj-copies"><p><strong>Copies :</strong> ${safeData.copies}</p></div>` : ''}
  <div class="footer">
    <div class="footer-line"></div>
    <p><strong>${escapeHtml(SOGETRA.fullName)}</strong> au Capital de ${escapeHtml(SOGETRA.capital)}</p>
    <p>${escapeHtml(SOGETRA.address)}</p>
    <p>C.C ${escapeHtml(SOGETRA.cc)} - RCCM ${escapeHtml(SOGETRA.rccm)}</p>
    <p>Tél: ${SOGETRA.tel.map(escapeHtml).join(' / ')}</p>
  </div>
</body>
</html>`;
  }, [formData]);

  // Gestionnaire d'impression
  const handlePrint = useCallback(() => {
    // Valider avant impression
    if (!validateForm()) {
      setView('form');
      return;
    }

    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(getPrintHTML());
    doc.close();
    
    // Attendre que le contenu soit chargé puis imprimer
    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    }, 500);
  }, [getPrintHTML, validateForm]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <iframe 
        ref={iframeRef} 
        style={{ position: 'absolute', width: 0, height: 0, border: 'none' }} 
        title="print" 
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
          {/* En-tête avec logo et boutons */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <img src={LOGO_PATH} alt="SOGETRA" className="h-16" />
            <div className="flex gap-2 flex-wrap">
              <button 
                onClick={() => setView('form')} 
                className={`px-4 py-2 rounded ${view === 'form' ? 'bg-green-700 text-white' : 'bg-gray-200'}`}
              >
                Formulaire
              </button>
              <button 
                onClick={() => setView('preview')} 
                className={`px-4 py-2 rounded ${view === 'preview' ? 'bg-green-700 text-white' : 'bg-gray-200'}`}
              >
                Aperçu
              </button>
              <button 
                onClick={handlePrint} 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
              >
                Imprimer / PDF
              </button>
            </div>
          </div>

          {/* Affichage des erreurs globales */}
          {Object.keys(errors).length > 0 && view === 'form' && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              Veuillez corriger les erreurs dans le formulaire avant de continuer.
            </div>
          )}

          {/* Contenu principal */}
          {view === 'form' ? (
            <LetterForm 
              formData={formData} 
              onChange={handleChange} 
              errors={errors}
            />
          ) : (
            <LetterPreview formData={formData} />
          )}
        </div>
      </div>
    </div>
  );
}
