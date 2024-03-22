import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const baseUrl = "/api/login";

const data = localStorage.getItem("userInformation");
let userState;
if (data) {
   userState = JSON.parse(data);
}

// export const fetchUserProfile = createAsyncThunk(
//    'fetchUserProfile',
//    async(_, { rejectWithValue }) => {
//       try {
//          const token = localStorage.getItem('token')
//          if(!token) {
//             throw new Error('Token not found')
//          }

//          const response = await axios.get(`/api/users`, {
//             headers: {
//                Authorization: `Bearer ${token}`
//             }
//          })
//          console.log(response.data)
//          return response.data
//       } catch(error) {
//          return rejectWithValue(serializeError(error));
//       }
//    }
// )

export const userLogin = createAsyncThunk(
   'userLogin',
   async(credentials, { rejectWithValue, dispatch }) => {
      try {
         const response = await axios.post(baseUrl, credentials);
         localStorage.setItem('token', response.data.token);
         // const login = await dispatch(fetchUserProfile())

         return response.data;
      } catch(error) {
         return rejectWithValue('An error occurred during login');
      }
   }
)

export const userLogout = createAsyncThunk(
   'userLogout',
   async (_, { rejectWithValue }) => {
      try {
         localStorage.removeItem('userInformation');
      } catch (error) {
         return rejectWithValue(error);
      }
   }
)

export const fetchAllUsers = createAsyncThunk(
   'fetchAllUsers',
   async(_, { rejectWithValue }) => {
      try {
         const token = localStorage.getItem('token')
         if(!token) {
            throw new Error('Token not found')
         }

         const response = await axios.get(`/api/users`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
         console.log('response.data', response.data)
         return response.data;
      } catch(error) {
         return rejectWithValue(serializeError(error));
      }
   }
)


const loginSlice = createSlice({
   name: 'auth',
   initialState: {
      user: null,
      error: null,
      isLoading: false,
      users: []
   },
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchAllUsers.pending, (state) => {
         return {
            ...state,
            loading: true,
            error: null
         };
      });
      builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
         return {
            ...state,
            loading: false,
            error: null,
            users: action.payload
         };
      });
      builder.addCase(fetchAllUsers.rejected, (state, action) => {
         return {
            ...state,
            loading: false,
            error: action.error.message ?? "error"
         };
      });
      builder.addCase(userLogin.fulfilled, (state, action) => {  
         return {
            ...state,
            loading: false,
            error: null,
            user: action.payload,
         };
      });
      builder.addCase(userLogin.pending, (state) => {
         return {
            ...state,
            loading: true,
            error: null
         };
      });
      builder.addCase(userLogin.rejected, (state, action) => {
         return {
            ...state,
            loading: false,
            error: action.error.message ?? "error"
         };
      });
      // builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      //    return {
      //       ...state,
      //       loading: false,
      //       error: null,
      //       user: action.payload
      //    };
      // });
      // builder.addCase(fetchUserProfile.pending, (state) => {
      //    return {
      //       ...state,
      //       loading: true,
      //       error: null
      //    };
      // });
      // builder.addCase(fetchUserProfile.rejected, (state, action) => {
      //    return {
      //       ...state,
      //       loading: false,
      //       error: action.error.message ?? "error"
      //    }
      // });
      builder.addCase(userLogout.fulfilled, (state) => {
         return {
            ...state,
            error: null,
            loading: false,
            user: null
         };
      });
      builder.addCase(userLogout.pending, (state) => {
         return {
            ...state,
            error: null,
            loading: true,
            user: state.user
         };
      });
      builder.addCase(userLogout.rejected, (state, action) => {
         return {
            ...state,
            error: action.error.message ?? "error",
            loading: false,
         };
      });
      }
   });

const loginReducer = loginSlice.reducer;
export default loginReducer;