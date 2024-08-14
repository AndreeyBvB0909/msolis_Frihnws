import axios from 'axios';

export const TranslateText = async (text, targetLang = 'es') => {
  const url = `https://apertium.org/apy/translate?langpair=en|${targetLang}&q=${encodeURIComponent(text)}`;

  try {
    const response = await axios.get(url);
    return response.data.responseData.translatedText;
  } catch (error) {
    console.error('Error translating text:', error);
    return text; // Devuelve el texto original en caso de error
  }
};

export default TranslateText;


