export const validateLitterImage = async (base64Image) => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Random severity for demo effect
  const severities = ["LOW", "MEDIUM", "HIGH"];
  const randomSeverity =
    severities[Math.floor(Math.random() * severities.length)];

  return {
    isValid: true,
    severity: randomSeverity,
    confidence: 0.85 + Math.random() * 0.14
  };
};