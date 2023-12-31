import { Accounts } from 'meteor/accounts-base';
import { check, Match } from 'meteor/check';

export const registerNewUser = function (options) {
  check(
    options,
    Match.ObjectIncluding({
      email: String,
      password: String,
      firstName: String,
      lastName: String,
      loginImmediately: Match.Maybe(Boolean),
    })
  );

  const { email, password, firstName, lastName, loginImmediately } = options;

  if (Accounts.findUserByEmail(email)) {
    throw new Meteor.Error('permissionDenied', 'userExists', { email });
  }

  const userId = Accounts.createUser({ email, password });

  // we add the firstName and lastName as toplevel fields
  // which allows for better handling in publications
  Meteor.users.update(userId, { $set: { firstName, lastName } });

  // let them verify their new account, so
  // they can use the full app functionality
  Accounts.sendVerificationEmail(userId, email);

  if (loginImmediately) {
    // signature: { id, token, tokenExpires }
    return Accounts._loginUser(this, userId);
  }

  // keep the same return signature here to let clients
  // better handle the response
  return { id: userId, token: undefined, tokenExpires: undefined };
};

export const updateUserProfile = function ({ firstName, lastName }) {
  check(firstName, Match.Maybe(String));
  check(lastName, Match.Maybe(String));

  // in a meteor Method we can access the current user
  // via this.userId which is only present when an
  // authenticated user calls a Method
  const { userId } = this;

  if (!userId) {
    throw new Meteor.Error('permissionDenied', 'notAuthenticated', { userId });
  }

  const updateDoc = { $set: {} };

  if (firstName) {
    updateDoc.$set.firstName = firstName;
  }

  if (lastName) {
    updateDoc.$set.lastName = lastName;
  }

  return !!Meteor.users.update(userId, updateDoc);
};

export const deleteAccount = function () {
  const { userId } = this;

  if (!userId) {
    throw new Meteor.Error('permissionDenied', 'notAuthenticated', { userId });
  }

  return !!Meteor.users.remove(userId);
};
