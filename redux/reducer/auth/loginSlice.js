import { createSlice } from "@reduxjs/toolkit";
import { postLogin } from "./authApi";
import * as SecureStore from "expo-secure-store";

const getStore = () => (SecureStore.getItem('user'))
const setStore = (value) => SecureStore.setItem('user', JSON.stringify(value))

const loginSlice = createSlice({
    name: "user",
    initialState: {
        isLoading: false,
        data: getStore() ? JSON.parse(getStore()) : {},
        isModalVisible: false,
        isLogin: getStore() ? true : false,                              // >>>>>>> Logic Ketika belum Login
        isError: false,
        errorMessage: null,
    },
    reducers: {
        closeModal: (state) => {
            state.isModalVisible = false;
        },
        clearError: (state) => {
            state.isError = false;
            state.errorMessage = null
        },
        logout: (state) => {
            state.data = {}
            state.isLogin = false
            SecureStore.deleteItemAsync("user")
        },
    },
    extraReducers: (builder) => {
        builder.addCase(postLogin.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(postLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLogin = true;                       // >>>>>>> Logic Ketika belum Login
            state.data = action.payload;
            setStore(action.payload)
            state.isModalVisible = true;
        });

        builder.addCase(postLogin.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true;
            state.errorMessage = action.payload;
            state.isModalVisible = true;
        });
    },
});

export { postLogin };
export const { closeModal, clearError, logout } = loginSlice.actions
export const selectUser = state => state.user                          // selector
export default loginSlice.reducer