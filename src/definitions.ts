import * as Redux from 'redux'
import * as Navigation from 'react-navigation'

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

// STATES
export type AppState = App
export type UserState = User
export type ProductsState = Products
export type HomeProductsState = HomeProducts
export type PublishProductsState = PublishProducts

export interface RootState {
    user?: UserState
    app?: AppState
    nav?: {}
}