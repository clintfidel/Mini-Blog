
export const checkUserInput = (firstInput, secondInput, thirdInput) => {
  if (firstInput.trim() === '' || secondInput.trim() === ''
  || thirdInput.trim() === '') {
    return true;
  }
  return false;
};


export const isInValidField = (fieldData) => {
  if (typeof (fieldData) !== 'string' || fieldData.length === 0) {
    return true;
  }
  let hasValue = false;
  fieldData.split().forEach((value) => {
    if (value !== ' ') {
      hasValue = true;
    }
  });
  if (!hasValue) {
    return true;
  }
  return false;
};
