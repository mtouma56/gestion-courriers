import { SOGETRA, LOGO_PATH } from '../constants/sogetra';

/**
 * Aperçu du courrier au format A4
 */
export default function LetterPreview({ formData }) {
  const formatDate = (dateStr) => {
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

  return (
    <div className="bg-white border-2 border-gray-300 p-8 font-serif" style={{ minHeight: '800px' }}>
      <img src={LOGO_PATH} alt="SOGETRA" className="h-20 mb-2" />
      <div className="h-1 bg-green-700 mb-6"></div>
      
      <p className="text-right mb-6">Abidjan, le {formatDate(formData.date)}</p>
      
      <p className="font-bold whitespace-pre-line mb-4">
        {formData.destinataire || '[Destinataire]'}
      </p>
      
      <p className="mb-1">
        <strong>N/Réf :</strong> {formData.reference || '[Référence]'}
      </p>
      <p className="mb-4">
        <strong>Objet :</strong> {formData.objet || '[Objet]'}
      </p>
      
      <hr className="border-black mb-4" />
      
      <div className="whitespace-pre-line text-justify mb-8" style={{ minHeight: '300px' }}>
        {formData.corps || '[Corps du courrier]'}
      </div>
      
      <div className="text-right mt-12">
        <p>Pour {SOGETRA.fullName}</p>
        <p className="font-bold mt-12">{SOGETRA.signataire}</p>
        <p className="italic">{SOGETRA.fonction}</p>
      </div>
      
      {formData.pj && (
        <p className="mt-8">
          <strong>P.J :</strong> {formData.pj}
        </p>
      )}
      {formData.copies && (
        <p>
          <strong>Copies :</strong> {formData.copies}
        </p>
      )}
      
      <div className="mt-12 pt-4 border-t-2 border-green-700 text-center text-xs">
        <p>
          <strong>{SOGETRA.fullName}</strong> au Capital de {SOGETRA.capital}
        </p>
        <p>{SOGETRA.address}</p>
        <p>C.C {SOGETRA.cc} - RCCM {SOGETRA.rccm}</p>
        <p>Tél: {SOGETRA.tel.join(' / ')}</p>
      </div>
    </div>
  );
}
