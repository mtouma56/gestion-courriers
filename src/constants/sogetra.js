/**
 * Informations de l'entreprise SOGETRA SARL
 */
export const SOGETRA = {
  name: "SOGETRA",
  fullName: "SOGETRA SARL",
  capital: "200.000.000f CFA",
  address: "Abidjan-Treichville Rue des pêcheurs - 18 BP 601 Abidjan 18",
  cc: "1723703 G",
  rccm: "CI-ABJ-03-2017-B12-11882",
  tel: ["00225 27.21.25.72.75", "00225 27.21.22.22.70", "00225 01.03.22.22.69"],
  signataire: "Michael TOUMA",
  fonction: "Le Gérant",
  contacts: ["+1 202 604 4402 (WhatsApp)", "+225 01 03 33 33 31 (cel)"]
};

/**
 * Chemin du logo SOGETRA
 */
export const LOGO_PATH = "/logo.jpg";

/**
 * Génère une référence de courrier avec format SGT/DG/ANNÉE/MOIS-XXX
 * @param {Date} date - La date du courrier
 * @param {number} sequenceNumber - Le numéro séquentiel (optionnel)
 * @returns {string} La référence formatée
 */
export function generateReference(date = new Date(), sequenceNumber = null) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const seq = sequenceNumber !== null ? String(sequenceNumber).padStart(3, '0') : '';
  return `SGT/DG/${year}/${month}-${seq}`;
}
