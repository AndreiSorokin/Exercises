import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = '/api/blogs'


export const fetchBlogs = createAsyncThunk(
   'fetchBlogs',
   async () => {
      try {
         const response = await axios.get(`${baseUrl}`)
         const data = response.data
         return data
      } catch (err) {
         throw err;
      }
   }
)

export const createBlog = createAsyncThunk(
   "createBlog",
   async (newBlogData, { rejectWithValue, getState }) => {
      try {
         const token = getState().user.user.token;
         const config = {
            headers: { Authorization: `Bearer ${token}` },
         };
         const response = await axios.post(baseUrl, newBlogData, config);
         return response.data;
      } catch (error) {
         return rejectWithValue(error);
      }
   }
);

export const deleteBlog = createAsyncThunk(
   'deleteAsyncThunk',
   async (id, { rejectWithValue, getState }) => {
      try {
         const token = getState().user.user.token;
         const config = {
            headers: { Authorization: `Bearer ${token}` },
         };
         await axios.delete(`${baseUrl}/${id}`, config);
         id
      } catch (error) {
         return rejectWithValue(error);
      }
   }
)

export const updateBlog = createAsyncThunk(
   'updateBlog',
   async({ id, newObject }) => {
      try {
         const response = await axios.put(`${baseUrl}/${id}`, newObject);
         return response.data;
      } catch (error) {
         throw error;
      }
   }
)

export const commentBlog = createAsyncThunk(
   'commentBlog',
   async({ id, newComment }) => {
      try {
         const response = await axios.post(`${baseUrl}/${id}/comments`, newComment);
         console.log(response.data)

         return response.data;
      } catch(error) {
         throw error
      }
   }
)


const initialState = {
   blogs: [],
   loading: false,
   error: null,
};

const blogSlice = createSlice({
   name: "blog",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(commentBlog.pending, (state) => {
         return {
            ...state,
            loading: true,
            error: null
         };
      });
      builder.addCase(commentBlog.fulfilled, (state) => {
         return {
            ...state,
            loading: false,
            error: null,
         };
      });
      builder.addCase(commentBlog.rejected, (state, action) => {
         return {
            ...state,
            loading: false,
            error: action.payload,
         };
      });
      builder.addCase(updateBlog.pending, (state) => {
         return {
            ...state,
            loading: true,
            error: null
         }
      })
      builder.addCase(updateBlog.fulfilled, (state, action) => {
         const updatedBlog = action.payload
         const updatedBlogs = state.blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b)
         return {
            ...state,
            loading: false,
            error: null,
            blogs: updatedBlogs
         }
      })
      builder.addCase(updateBlog.rejected, (state, action) => {
         return {
            ...state,
            loading: false,
            error: action.payload
         }
      })
      builder.addCase(deleteBlog.pending, (state) => {
         return {
            ...state,
            loading: true,
            error: null
         }
      })
      builder.addCase(deleteBlog.fulfilled, (state, action) => {
         const id = action.payload
         return {
            error: null,
            pending: false,
            blogs: state.blogs.filter(blog => blog.id !== id)
         }
      })
      builder.addCase(deleteBlog.rejected, (state, action) => {
         return {
            ...state,
            loading: false,
            error: action.payload
         }
      })
      builder.addCase(fetchBlogs.pending, (state) => {
         return {
            ...state,
            loading: true,
            error: null
         }
      })
      builder.addCase(fetchBlogs.fulfilled, (state, action) => {
         return {
            loading: false,
            error: null,
            blogs: action.payload
         }
      })
      builder.addCase(fetchBlogs.rejected, (action) => {
         return {
            loading: false,
            error: action.payload,
         };
      })
      builder.addCase(createBlog.pending, (state) => {
         return {
            ...state,
            loading: true,
            error: null
         };
      });
      builder.addCase(createBlog.fulfilled, (state, action) => {
         return {
            ...state,
            loading: false,
            error: null,
            blogs: [...state.blogs, action.payload]
         };
      });
      builder.addCase(createBlog.rejected, (action) => {
         return {
            loading: false,
            error: action.payload || 'Failed to create blog',
         };
      });
   },
});

export const {} = blogSlice.actions;
const blogReducer = blogSlice.reducer;
export default blogReducer;
