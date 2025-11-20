// ================================
// simple-image-decoder.js
// ================================

class SimpleImageDecoderService {
  constructor() {
    this.BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  }

  /**
   * Décode une chaîne Base32 en Uint8Array
   */
  decodeBase32(input) {
    const cleanInput = input.replace(/[^A-Z2-7]/g, '');
    
    if (cleanInput.length === 0) {
      throw new Error('Chaîne Base32 vide');
    }

    let bits = '';
    for (let i = 0; i < cleanInput.length; i++) {
      const char = cleanInput[i];
      const index = this.BASE32_ALPHABET.indexOf(char);
      if (index === -1) {
        throw new Error(`Caractère invalide: ${char}`);
      }
      bits += index.toString(2).padStart(5, '0');
    }

    // Supprimer les bits de padding
    const paddingBits = bits.length % 8;
    if (paddingBits !== 0) {
      bits = bits.slice(0, -paddingBits);
    }

    const bytes = new Uint8Array(Math.floor(bits.length / 8));
    for (let i = 0; i < bytes.length; i++) {
      const byteBits = bits.substr(i * 8, 8);
      bytes[i] = parseInt(byteBits, 2);
    }

    return bytes;
  }

  /**
   * Convertit Uint8Array en Base64
   */
  uint8ArrayToBase64(bytes) {
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  /**
   * Détecte le type MIME basé sur les premiers octets
   */
  detectMimeType(bytes) {
    if (bytes.length < 4) return 'application/octet-stream';

    const header = Array.from(bytes.slice(0, 12))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // Détection des formats courants
    if (header.includes('66747970617669') || header.includes('61766966')) return 'image/avif';
    if (header.startsWith('ffd8ff')) return 'image/jpeg';
    if (header.startsWith('89504e47')) return 'image/png';
    if (header.startsWith('47494638')) return 'image/gif';
    if (header.startsWith('52494646') && header.includes('57454250')) return 'image/webp';
    if (header.startsWith('424d')) return 'image/bmp';
    if (header.startsWith('49492a') || header.startsWith('4d4d2a')) return 'image/tiff';

    return 'image/avif'; // Par défaut pour votre cas d'usage
  }

  /**
   * Convertit Base32 en image Base64 Data URL
   */
  convertBase32ToImage(base32String) {
    try {
      // 1. Décoder Base32
      const decodedBytes = this.decodeBase32(base32String);
      
      // 2. Détecter le type MIME
      const mimeType = this.detectMimeType(decodedBytes);
      
      // 3. Convertir en Base64
      const base64 = this.uint8ArrayToBase64(decodedBytes);
      
      // 4. Créer la Data URL
      const dataUrl = `data:${mimeType};base64,${base64}`;

      return {
        success: true,
        dataUrl,
        base64,
        fileSize: decodedBytes.length,
        mimeType
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  /**
   * Télécharge l'image depuis une Data URL
   */
  downloadFromDataUrl(dataUrl, filename = 'image') {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Méthode utilitaire pour extraire l'extension depuis le MIME type
   */
  getFileExtension(mimeType) {
    const extensions = {
      'image/avif': 'avif',
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'image/webp': 'webp',
      'image/bmp': 'bmp',
      'image/tiff': 'tiff'
    };
    return extensions[mimeType] || 'img';
  }
}

// Export pour utilisation dans différents environnements
if (typeof module !== 'undefined' && module.exports) {
  // Environnement Node.js
  module.exports = { SimpleImageDecoderService };
} else if (typeof window !== 'undefined') {
  // Environnement navigateur
  window.SimpleImageDecoderService = SimpleImageDecoderService;
}

// Exemple d'utilisation :
/*
// Créer une instance
const decoder = new SimpleImageDecoderService();

// Convertir une chaîne Base32 en image
const result = decoder.convertBase32ToImage('VOTRE_CHAINE_BASE32_ICI');

if (result.success) {
  console.log('Image décodée avec succès:', result.mimeType, result.fileSize + ' bytes');
  
  // Afficher l'image dans une balise img
  const imgElement = document.createElement('img');
  imgElement.src = result.dataUrl;
  document.body.appendChild(imgElement);
  
  // Télécharger l'image
  const extension = decoder.getFileExtension(result.mimeType);
  decoder.downloadFromDataUrl(result.dataUrl, `image.${extension}`);
} else {
  console.error('Erreur:', result.error);
}
*/