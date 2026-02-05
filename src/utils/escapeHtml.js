/**
 * Échappe les caractères HTML spéciaux pour prévenir les attaques XSS
 * @param {string} text - Le texte à échapper
 * @returns {string} Le texte échappé
 */
export function escapeHtml(text) {
  if (text === null || text === undefined) {
    return '';
  }
  
  const str = String(text);
  const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
  };
  
  return str.replace(/[&<>"']/g, (char) => htmlEscapes[char]);
}

/**
 * Échappe le HTML tout en préservant les sauts de ligne (convertis en <br>)
 * @param {string} text - Le texte à échapper
 * @returns {string} Le texte échappé avec <br> pour les sauts de ligne
 */
export function escapeHtmlWithBreaks(text) {
  return escapeHtml(text).replace(/\n/g, '<br>');
}
