export default class googleAuth {
  constructor() {
    this.clientId = '486482926260-1fdi7apjimuftbptbc054antj5ffpmpk.apps.googleusercontent.com'
    this.scope = 'email'
    this.auth = null
  }

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

  isSignedIn() {
    return this.auth.isSignedIn.get()
  }

  listen(action) {
    return this.auth.isSignedIn.listen(action)
  }

  signIn() {
    return this.auth.signIn()
  }

  signOut() {
    return this.auth.signOut()
  }

  userId() {
    return this.auth.currentUser.get().getId()
  }
}
