const validator = require('validator');

const validate = fields => {
  let errors = {};
  const { password, username } = fields;
  const { isEmail, isEmpty, isLength } = validator;

  const isShorterThanSix = str => isLength(str, undefined, 6);
  const isNotEmail = str => !isEmail(str);
  const isEmptyHash = hash => Object.keys(hash).length === 0;

  const validationPriority = {
    password: [
      { callback: isEmpty, errorMsg: 'Password is empty' },
      {
        callback: isShorterThanSix,
        errorMsg: 'Password format is shoter than 6'
      }
    ],
    username: [
      { callback: isEmpty, errorMsg: 'Username is empty' },
      { callback: isNotEmail, errorMsg: 'Username format has wrong format' }
    ]
  };

  Object.entries(fields).forEach(([key, value]) => {
    validationPriority[key].find(validation => {
      if (validation.callback(value)) errors[key] = validation.errorMsg;
      return validation.callback(value);
    });
  });

  if (isEmptyHash(errors)) {
    return { status: true };
  }
  return { status: false, errors };
};

module.exports = validate;
