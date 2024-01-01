import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import { check, Match } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { Users } from '../imports/api/links';

async function insertLink({ title, url }) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

Meteor.startup(async () => {
  // If the Links collection is empty, add some data.
  if ((await LinksCollection.find().countAsync()) === 0) {
    await insertLink({
      title: 'Do the Tutorial',
      url: 'https://react-tutorial.meteor.com/simple-todos/01-creating-app.html',
    });

    await insertLink({
      title: 'Follow the Guide',
      url: 'https://guide.meteor.com',
    });

    await insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com',
    });

    await insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com',
    });
  }

  // We publish the entire Links collection to all clients.
  // In order to be fetched in real-time to the clients
  Meteor.publish('links', function () {
    return LinksCollection.find();
  });
});

//function to register a user
Meteor.methods({
  register: async function ({ email, password }) {
    console.log('🚀 ~ file: main.js:45 ~ password:', password);
    console.log('🚀 ~ file: main.js:45 ~ email:', email);
    // const { email, password } = email1;
    try {
      // check({
      //   email: String,
      //   password: String,
      // });
    } catch (err) {
      throw new Meteor.Error(err.message);
    }
    // const userFound = Accounts.findUserByEmail(email);

    // if (userFound) {
    //   throw new Meteor.Error('Email already exists');
    // }
    const newUser = {
      email,
      password,
    };
    const userInfo = Users.insert(newUser);
    console.log("🚀 ~ file: main.js:66 ~ userInfo:", userInfo)
    return userInfo;
    // const userId = Accounts.createUser({
    //   email,
    //   password,
    // });

    // Usar Accounts.createUser para registrar usuarios
    // const userId = Accounts.createUser({
    //   email,
    //   password,
    // });

    // // Puedes devolver el userId o cualquier otra información que desees
    // return userId;
  },
});
