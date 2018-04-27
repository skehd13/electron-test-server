import {LOGIN_OUT, RECEIVE_USERS, REQUEST_USERS, RECEIVE_LOGIN, RECEIVE_MENU, SELECT_MENU} from "./action"
import {combineReducers} from 'redux'

//유저정보에 대한 컨트롤러
function users(state = {}, action) {
    console.log(action)
    switch (action.type){
        case RECEIVE_LOGIN:
        case RECEIVE_USERS:
            return Object.assign({}, state, {
                id:action.users.id,
                password:action.users.password,
                phone:action.users.phone,
                userName:action.users.userName,
                isLogin:action.users.isLogin
            })
        default :
            return state
    }
}
//유저정보에대한 store에대한 reducer
function userById(state = {
    loginState:0,
    loginID:''
}, action) {
    switch (action.type){
        //모든유저정보를 가져와서 유저아이디 : 유저정보 형식으로 저장
        // case REQUEST_USERS:
        case RECEIVE_USERS:
            return Object.assign({}, state, {
                [action.id]: users(state[action.id], action)
            })
        //로그인상태와 로그인된 아이디 저장
        case RECEIVE_LOGIN:
            return Object.assign({}, state, {
                loginState:action.loginState,
                [action.users.id]: users(state[action.users.id], action),
                loginID:action.loginID
            })
        //로그아웃시 로그인아이디 초기화
        case LOGIN_OUT:
            return Object.assign({}, state, {
                loginState:action.loginState,
                loginID:''
            })
        default:
            return state
    }
}

function menus(state = {
    selectIndex : 0
}, action) {
    switch (action.type){
        case RECEIVE_MENU:
            return Object.assign({}, state, {
                items : action.menuList
            })
        case SELECT_MENU:
            return Object.assign({}, state, {
                selectIndex: action.index
            })
        default:
            return state
    }
}

const loginInfoApp = combineReducers({
    userById, menus
})
export default loginInfoApp