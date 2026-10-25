## File organization
- `src/api/postsApi.js` — fetches and parses posts from the API; checks HTTP errors.
- `src/reducer/postsReducer.js` — pure reducer for `FETCH_START`, `FETCH_SUCCESS`, and `FETCH_ERROR`.
- `src/components/Post.jsx` — presentational component for one post.
- `src/components/PostList.jsx` — renders the posts array with `.map()` and stable keys.
- `src/components/FilterForm.jsx` — controlled title-filter input.
- `src/App.jsx` — owns reducer state and filter state, fetches posts in `useEffect`, and derives filtered posts during render.
- `src/main.jsx` — React entry point.
- `src/styles.css` — application styling.

## Challenges
1. Separating API logic from UI components so the fetch function contains no React or JSX.
2. Using `useReducer` to represent loading, success, and error transitions without mutating state.
3. Handling cleanup with `AbortController` so an in-flight request is cancelled when the effect is cleaned up.
4. Keeping the filter as derived data instead of storing a second, potentially stale copy of the posts.
5. Showing distinct loading, error, empty-list, and no-filter-match messages.
