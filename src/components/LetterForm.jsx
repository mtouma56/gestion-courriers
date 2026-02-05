
/**
 * Formulaire de saisie du courrier
 */
export default function LetterForm({ formData, onChange, errors }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={onChange}
            className={`w-full p-2 border rounded ${errors?.date ? 'border-red-500' : ''}`}
          />
          {errors?.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date}</p>
          )}
        </div>
        <div>
          <label htmlFor="reference" className="block text-sm font-medium mb-1">
            Référence <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="reference"
            name="reference"
            value={formData.reference}
            onChange={onChange}
            placeholder="SGT/DG/2026/02-001"
            className={`w-full p-2 border rounded ${errors?.reference ? 'border-red-500' : ''}`}
          />
          {errors?.reference && (
            <p className="text-red-500 text-sm mt-1">{errors.reference}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="destinataire" className="block text-sm font-medium mb-1">
          Destinataire <span className="text-red-500">*</span>
        </label>
        <textarea
          id="destinataire"
          name="destinataire"
          value={formData.destinataire}
          onChange={onChange}
          placeholder={"Monsieur le Directeur Général\nENTREPRISE XYZ\nAbidjan"}
          className={`w-full p-2 border rounded h-24 ${errors?.destinataire ? 'border-red-500' : ''}`}
        />
        {errors?.destinataire && (
          <p className="text-red-500 text-sm mt-1">{errors.destinataire}</p>
        )}
      </div>

      <div>
        <label htmlFor="objet" className="block text-sm font-medium mb-1">
          Objet <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="objet"
          name="objet"
          value={formData.objet}
          onChange={onChange}
          className={`w-full p-2 border rounded ${errors?.objet ? 'border-red-500' : ''}`}
        />
        {errors?.objet && (
          <p className="text-red-500 text-sm mt-1">{errors.objet}</p>
        )}
      </div>

      <div>
        <label htmlFor="corps" className="block text-sm font-medium mb-1">
          Corps du courrier <span className="text-red-500">*</span>
        </label>
        <textarea
          id="corps"
          name="corps"
          value={formData.corps}
          onChange={onChange}
          placeholder={"Monsieur le Directeur Général,\n\nNous avons l'honneur de..."}
          className={`w-full p-2 border rounded h-64 font-serif ${errors?.corps ? 'border-red-500' : ''}`}
        />
        {errors?.corps && (
          <p className="text-red-500 text-sm mt-1">{errors.corps}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="pj" className="block text-sm font-medium mb-1">
            Pièces jointes
          </label>
          <input
            type="text"
            id="pj"
            name="pj"
            value={formData.pj}
            onChange={onChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="copies" className="block text-sm font-medium mb-1">
            Copies
          </label>
          <input
            type="text"
            id="copies"
            name="copies"
            value={formData.copies}
            onChange={onChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
}
