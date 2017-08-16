import * as Redux from 'redux'

// This file holds our app typings

// BUSINESS LOGIC
export interface App {
    loading: boolean
    logined: boolean
}

export interface User {
    username: string
    sessionToken: string
}

export interface UserProfile {
    id: string
    email: string
}

export interface UserForLogin {
    username: string
    password: string
}

export interface CreatedUser {
    username: string
    objectId: string
}

export interface Product {
    img: string
    name: string
    price: string
    owner?: CreatedUser
    buyer?: CreatedUser
    description: string
}

export interface DraftProduct {
    name: string
    price: string
    img: string
    description: string
}

export type Products = Array<Product>

export type PublishProducts = {
    currentImageUrl: string
}

export type HomeProducts = {
    products: Products
}

// ACTION CREATORS

// ACTIONS
export interface GeneralAction extends Redux.Action {
    payload?: object
}
export interface UserLoginAction extends GeneralAction {
    payload?: UserForLogin
}
export interface UserAction extends GeneralAction {
    payload?: User | UserForLogin | UserProfile
}

export interface ProductsAction extends GeneralAction {
    payload?: User
    success?: Products
    error?: string
}

export interface FetchHomeProductsAction extends GeneralAction {
    payload?: Products
}

export interface UploadImageAction extends GeneralAction {
    payload?: {
        user: User,
        fileData: string
    }
}
export interface UploadImageSucAction extends GeneralAction {
    payload?: {
        url: string,
    }
}
export interface PublishProductAction extends GeneralAction {
    payload?: {
        user: User,
        draftProduct: DraftProduct
    }
}

// ACTION TYPES
export const FETCH_HOME_PRODUCTS = 'FETCH_HOME_PRODUCTS '
export const FETCH_HOME_PRODUCTS_SUC = 'FETCH_HOME_PRODUCTS_SUC'
export const FETCH_HOME_PRODUCTS_FAIL = 'FETCH_HOME_PRODUCTS_FAIL'
export const BOUGHT_PRODUCTS = 'BOUGHT_PRODUCTS'
export const SOLD_PRODUCTS = 'SOLD_PRODUCTS'
export const BOUGHT_PRODUCTS_SUC = 'BOUGHT_PRODUCTS_SUC'
export const SOLD_PRODUCTS_SUC = 'SOLD_PRODUCTS_SUC'
export const BOUGHT_PRODUCTS_FAIL = 'BOUGHT_PRODUCTS_FAIL'
export const SOLD_PRODUCTS_FAIL = 'SOLD_PRODUCTS_FAIL'
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE'
export const UPLOAD_IMAGE_SUC = 'UPLOAD_IMAGE_SUC'
export const UPLOAD_IMAGE_FAIL = 'UPLOAD_IMAGE_FAIL'
export const PUBLISH_PRODUCT = 'PUBLISH_PRODUCT'
export const PUBLISH_PRODUCT_SUC = 'PUBLISH_PRODUCT_SUC'
export const PUBLISH_PRODUCT_FAIL = 'PUBLISH_PRODUCT_FAIL'
export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'
export const USER_REGISTER = 'USER_REGISTER'
export const USER_LOGIN_SUC = 'USER_LOGIN_SUC'
export const USER_LOGOUT_SUC = 'USER_LOGOUT_SUC'
export const USER_REGISTER_SUC = 'USER_REGISTER_SUC'
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL'
export const USER_LOGOUT_FAIL = 'USER_LOGOUT_FAIL'
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL'

// STATES
export type AppState = App
export type UserState = User
export type ProductsState = Products
export type HomeProductsState = HomeProducts
export type PublishProductsState = PublishProducts

export interface RootState {
    user?: UserState
    app?: AppState
    homeProducts?: HomeProductsState
    nav?: {}
}