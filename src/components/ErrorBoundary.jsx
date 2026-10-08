import React from "react";

/**
 * Catches render errors anywhere below it and shows the message on screen
 * instead of leaving a blank white page.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("App render error:", error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas px-6">
        <div className="panel max-w-md w-full">
          <h1 className="text-xl mb-2">Something went wrong</h1>
          <p className="text-sm text-navy-700 mb-4">
            The page failed to load. Try clearing this site's saved data and reloading.
          </p>
          <pre className="text-xs text-rejected whitespace-pre-wrap break-words mb-4">
            {String(this.state.error?.message || this.state.error)}
          </pre>
          <button
            className="btn-primary w-full"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            Clear saved data and reload
          </button>
        </div>
      </div>
    );
  }
}
