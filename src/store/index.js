import Vue from 'vue'
import Vuex from 'vuex'
import User from '../models/User'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: new User('Иванов Иван Иванович'),
    contacts: [
      {
        id: 1,
        name: 'Сидоров Александр Сергеевич',
        email: 'sidorov@gmail.com',
        phone: '+79998887766',
      },
      {
        id: 2,
        name: 'Смирнов Степан Васильевич',
        email: 'smirnov@gmail.com',
        phone: '+78887776655',
      },
      {
        id: 3,
        name: 'Лазарев Глеб Викторович',
        email: 'lasarev@gmail.com',
        phone: '+77776665544',
      }
    ]
  },
  mutations: {
    addContact(state, contact) {
      state.contacts.push(contact);
    },
    deleteContact(state, contactId) {
      state.contacts = state.contacts.filter(contact => contact.id !== contactId);
    },
    updateContact(state, currentContact) {
      const contact = state.contacts.find(item => item.id === currentContact.id);
      const index = state.contacts.indexOf(contact);
      state.contacts[index] = currentContact;
    },
    authUser(state, auth) {
      state.user.auth = auth;
    }
  },
  actions: {
    async setAuth({ commit }, auth) {
      commit('authUser', auth);
    },
    async saveContact({ commit }, contact) {
      const isOldContact = this.state.contacts.some(item => item.id === contact.id);
      if (isOldContact) {
        commit('updateContact', contact);
      } else {
        commit('addContact', contact);
      }
    },
    async updateContact({ commit }, contact) {
      commit('updateContact', contact);
    },
    async deleteContact({ commit }, id) {
      commit('deleteContact', id);
    },
  },
  getters: {
    getIdOfLastContact(state) {
      if (state.contacts.length > 0) {
        const index = state.contacts.length - 1;
        return state.contacts[index].id
      } else {
        return 0
      }
    },
    getAllContacts(state) {
      return state.contacts;
    },
    getUser(state) {
      return state.user;
    }
  }
})
