/**
 * Simulates a user registration API call.
 * @param {object} payload
 * @param {string} payload.name The user's full name.
 * @param {string} payload.email The user's email address.
 * @param {string} payload.password The user's chosen password.
 * @returns {Promise<object>} A promise that resolves with the new user data, including a new ID.
 */
export const register = async (payload) => {
  console.log('Attempting to register user with payload:', payload);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log('User registered successfully (simulated).');
  return { id: Date.now(), name: payload.name, email: payload.email };
};
