// Simulated OmniDimension API service for making phone calls
const OmniDimensionAPI = {
  makeCall: async (provider, userDetails) => {
    // Replace this with real API call logic
    return new Promise((resolve) =>
      setTimeout(() => resolve({ status: "success", provider, called: true }), 1000)
    );
  }
};

export const makeCall = OmniDimensionAPI.makeCall;
export default OmniDimensionAPI;