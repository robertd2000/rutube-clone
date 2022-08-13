import { combineReducers } from '@reduxjs/toolkit'
import { reducer as toastrReducer } from 'react-redux-toastr'

import { authSlice } from './auth/auth.slice'

export const rootReducer = combineReducers({
	auth: authSlice.reducer,
	toastr: toastrReducer
})
