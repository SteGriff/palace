import { Appwrite } from "appwrite";
import { Config } from "./config";

export const api = {
  sdk: null,

  provider: () => {
    if (api.sdk) return api.sdk;
    let appwrite = new Appwrite();
    appwrite.setEndpoint(Config.endpoint).setProject(Config.project);
    api.sdk = appwrite;
    return appwrite;
  },

  createAccount: (email, password, name) => {
    return api.provider().account.create('unique()', email, password, name);
  },

  getAccount: () => {
    return api.provider().account.get();
  },

  createAnonSession: () => {
    return api.provider().account.createAnonymousSession();
  },

  createSession: (email, password) => {
    return api.provider().account.createSession(email, password);
  },

  getSession: () => {
    return api.provider().account.getSession('current')
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession('current');
  },

  createDocument: (collectionId, data, read, write) => {
    return api
      .provider()
      .database.createDocument(collectionId, 'unique()', data, read, write);
  },

  listDocuments: (collectionId) => {
    return api.provider().database.listDocuments(collectionId);
  },

  updateDocument: (collectionId, documentId, data, read, write) => {
    return api
      .provider()
      .database.updateDocument(collectionId, documentId, data, read, write);
  },

  deleteDocument: (collectionId, documentId) => {
    return api.provider().database.deleteDocument(collectionId, documentId);
  },
};