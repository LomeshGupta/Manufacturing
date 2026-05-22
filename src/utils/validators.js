export const isRequired = (value) =>
  value !== null && value !== undefined && String(value).trim() !== '';

export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const isMinLength = (value, min) => String(value).length >= min;

export const isMaxLength = (value, max) => String(value).length <= max;

export const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);

export const isPositive = (value) => parseFloat(value) > 0;

export const isNonNegative = (value) => parseFloat(value) >= 0;

export const isPhone = (value) => /^[6-9]\d{9}$/.test(String(value).replace(/\s/g, ''));

export const isGSTIN = (value) =>
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value);

export const isPAN = (value) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value);

export const isPincode = (value) => /^[1-9][0-9]{5}$/.test(String(value));

/**
 * Validate a form object against a rules map.
 * rules: { fieldName: [{ fn: validator, message: 'Error msg' }] }
 * Returns: { errors: {}, isValid: bool }
 */
export const validateForm = (values, rules) => {
  const errors = {};
  for (const [field, fieldRules] of Object.entries(rules)) {
    for (const rule of fieldRules) {
      if (!rule.fn(values[field], values)) {
        errors[field] = rule.message;
        break;
      }
    }
  }
  return { errors, isValid: Object.keys(errors).length === 0 };
};
