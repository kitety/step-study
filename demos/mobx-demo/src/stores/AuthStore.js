import { computed, observable, action, toJS, reaction } from 'mobx'

import fetcher from 'utils/fetcher'

class AuthStore {
  constructor() {
    reaction(
      () => this.userAuth,
      userAuth => this.getUserData(userAuth.id)
    )
  }

  @observable userAuth//Here we can use cookies (= but...
  @observable userData
  @observable error

  @action
  tryLogin = async (email, password) => {
    const body = {
      email, password
    }
    const resp = await fetcher.post('/api/auth/', body)
    const json = await resp.json()

    if (json.error) {
      this.error = json.message
    } else {
      this.userAuth = json.data
    }
  }

  @action
  getUserData = async (id) => {
    const resp = await fetcher.get(`/api/users/${id}`)
    const json = await resp.json()

    if (json.error) {
      this.error = json.message
    } else {
      this.userData = json.data
    }
  }

  @computed get token () {
    return this.userAuth ?.token || false
  }

  @computed get user () {
    return toJS(this.userData)
  }

  @computed get ownerId () {
    return this.userAuth ?.id ?.toString()
  }
}

export const authStore = new AuthStore()
