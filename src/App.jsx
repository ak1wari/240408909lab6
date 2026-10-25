import { useEffect, useReducer, useState } from 'react';
import { fetchPosts } from './api/postsApi.js';
import FilterForm from './components/FilterForm.jsx';
import PostList from './components/PostList.jsx';
import { initialPostsState, postsReducer } from './reducer/postsReducer.js';

function App() {
  const [state, dispatch] = useReducer(postsReducer, initialPostsState);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      dispatch({ type: 'FETCH_START' });

      try {
        const posts = await fetchPosts({ signal: controller.signal });
        dispatch({ type: 'FETCH_SUCCESS', payload: posts });
      } catch (error) {
        if (error.name !== 'AbortError') {
          dispatch({
            type: 'FETCH_ERROR',
            payload: error.message || 'Something went wrong while loading posts.'
          });
        }
      }
    }

    loadPosts();

    return () => {
      controller.abort();
    };
  }, []);

  const normalizedFilter = filter.trim().toLowerCase();
  const filteredPosts = state.posts.filter((post) =>
    post.title.toLowerCase().includes(normalizedFilter)
  );

  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">REACT ASSIGNMENT 6</p>
        <h1>Post Dashboard</h1>
        <p className="subtitle">
          Browse posts from the API and find a post by its title.
        </p>
      </header>

      <section className="dashboard-panel" aria-label="Posts dashboard">
        <div className="dashboard-heading">
          <div>
            <h2>All posts</h2>
            <p className="muted">
              {state.loading
                ? 'Loading your collection'
                : `${filteredPosts.length} ${filteredPosts.length === 1 ? 'post' : 'posts'} shown`}
            </p>
          </div>
          <span className="status-badge">
            {state.loading ? 'Loading' : state.error ? 'Error' : 'Connected'}
          </span>
        </div>

        <FilterForm
          filter={filter}
          onFilterChange={setFilter}
          onClear={() => setFilter('')}
        />

        {state.loading && <p className="state-message">Loading posts...</p>}

        {!state.loading && state.error && (
          <div className="state-message error-message" role="alert">
            <strong>Could not load posts.</strong>
            <p>{state.error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="retry-button"
            >
              Try again
            </button>
          </div>
        )}

        {!state.loading && !state.error && state.posts.length === 0 && (
          <p className="state-message">No posts found.</p>
        )}

        {!state.loading && !state.error && state.posts.length > 0 && filteredPosts.length === 0 && (
          <p className="state-message">No posts match your title filter.</p>
        )}

        {!state.loading && !state.error && filteredPosts.length > 0 && (
          <PostList posts={filteredPosts} />
        )}
      </section>

      <footer className="page-footer">Built with React hooks and the Fetch API</footer>
    </main>
  );
}

export default App;
