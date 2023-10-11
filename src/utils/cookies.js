import Cookies from 'cookies'
import cookieCutter from './cookie-cutter'

// Default server side cookies instance
let serverSideCookiesInstance = null

// Set a new server side cookies instance
const setServerSideCookiesInstance = (ctx) => {
  serverSideCookiesInstance = new Cookies(ctx.req, ctx.res)
}

// Get server side cookies instance
const getServerSideCookiesInstance = () => {
  return serverSideCookiesInstance
}

// Remove server side cookies instance
const removeServerSideCookiesInstance = () => {
  serverSideCookiesInstance = null
}

// Set a cookie 
const setItem = (key, value, options = {}) => {
  if (process.browser) {
    cookieCutter.set(key, value, options)
  } else if (serverSideCookiesInstance) {
    serverSideCookiesInstance.set(key, value, options)
  }
}

// Get a cookie 
const getItem = (key) => {
  let item = null

  if (process.browser) {
    item = cookieCutter.get(key)
  } else if (serverSideCookiesInstance) {
    item = serverSideCookiesInstance.get(key)
  }

  return item
}

// Remove a cookie 
const removeItem = (key, options = {}) => {
  // To remove a cookie, use a date in the past, example: { expires: new Date(0) }

  if (process.browser) {
    cookieCutter.set(key, '', { ...options, expires: new Date(0) })
  } else if (serverSideCookiesInstance) {
    serverSideCookiesInstance.set(key, '', { ...options, expires: new Date(0) })
  }
}

export default {
  setServerSideCookiesInstance,
  getServerSideCookiesInstance,
  removeServerSideCookiesInstance,

  setItem,
  getItem,
  removeItem,
}