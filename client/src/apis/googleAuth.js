export default class googleAuth {
  constructor() {
    this.clientId = '486482926260-1fdi7apjimuftbptbc054antj5ffpmpk.apps.googleusercontent.com'
    this.scope = 'email'
    this.auth = null
  }

  //initialize google auth api
  init = () => {
    return new Promise((res, rej) => {
      window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
          clientId: this.clientId,
          scope: this.scope
        }).then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          res();
          return;
        })
      })
    })
  }

  // get if user is signed in from google api
  isSignedIn() {
    return this.auth.isSignedIn.get()
  }

  // listen for a change in sign-in status
  listen(action) {
    return this.auth.isSignedIn.listen(action)
  }

  // sign a user in using google auth
  signIn() {
    return this.auth.signIn()
  }

    // sign a user out using google auth
  signOut() {
    return this.auth.signOut()
  }

  // get a signed in users id 
  userId() {
    return this.auth.currentUser.get().getId()
  }
}
