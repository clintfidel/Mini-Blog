
const checkUserInput = (firstInput, secondInput, thirdInput) => {
  if (firstInput.trim() === '' || secondInput.trim() === ''
  || thirdInput.trim() === '') {
    return true;
  }
  return false;
};

export default checkUserInput;
