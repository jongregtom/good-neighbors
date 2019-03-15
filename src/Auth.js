import auth0 from 'auth0-js';
const redirectUri = (process.env.NODE_ENV === "production") ? 'https://good-neighbors-staging.herokuapp.com/' : 'http://localhost:3000/callback';
console.log('uri', redirectUri);

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'good-neighbors.auth0.com',
      audience: 'https://good-neighbors.auth0.com/userinfo',
      clientID: 'A02LrzuM7sqbnPmk4XFqG5-b94mKu0Nq',
      redirectUri: redirectUri,
      responseType: 'id_token',
      scope: 'openid email profile'
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  signIn() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        // set the time that the id token will expire at
        this.expiresAt = authResult.idTokenPayload.exp * 1000;
        resolve();
      });
    })
  }

  signOut() {
    // clear id token, profile, and expiration
    this.idToken = null;
    this.profile = null;
    this.expiresAt = null;
  }
}

const auth0Client = new Auth();

export default auth0Client;