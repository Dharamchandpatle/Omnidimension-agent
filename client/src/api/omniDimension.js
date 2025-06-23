// OmniDimension API wrapper
import axios from 'axios';

const API_URL = 'https://api.omnidimension.com/agent';

const omniDimension = {
  sendMessage: async (text, emotion = 'neutral', image = null) => {
    const apiKey = process.env.REACT_APP_OMNIDIMENSION_API_KEY;
    const payload = { text, emotion };
    if (image) payload.image = image;
    const res = await axios.post(API_URL, payload, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    return res.data;
  }
};

export default omniDimension;