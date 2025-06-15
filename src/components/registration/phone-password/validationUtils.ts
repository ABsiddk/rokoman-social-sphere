
export const validatePhone = (phone: string, t: (key: string) => string) => {
  // Bangladesh ONLY: must start with 01, 11 digits, all numbers.
  if (!phone.startsWith('01')) {
    return t('registration.phone.error.bangladesh');
  }
  if (phone.length !== 11) {
    return t('registration.phone.error.length');
  }
  if (!/^\d+$/.test(phone)) {
    return t('registration.phone.error.numbers');
  }
  return '';
};

export const validatePassword = (password: string, t: (key: string) => string) => {
  const errors = [];
  if (password.length < 8) errors.push(t('registration.password.error.length'));
  if (!/[A-Z]/.test(password)) errors.push(t('registration.password.error.uppercase'));
  if (!/[a-z]/.test(password)) errors.push(t('registration.password.error.lowercase'));
  if (!/\d/.test(password)) errors.push(t('registration.password.error.number'));
  if (!/[!@#$%^&*]/.test(password)) errors.push(t('registration.password.error.special'));
  return errors;
};
