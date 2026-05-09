import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Shown when the default export cannot render in isolation. */
  fallback?: (err: Error, reset: () => void) => ReactNode;
};

type State = { error: Error | null };

export class LearnErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("[Learn preview]", error.message, info.componentStack);
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return (
        this.props.fallback?.(this.state.error, this.reset) ?? (
          <PreviewFailure error={this.state.error} onRetry={this.reset} />
        )
      );
    }
    return this.props.children;
  }
}

function PreviewFailure({
  error,
  onRetry,
}: {
  error: Error;
  onRetry: () => void;
}) {
  return (
    <div className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-6 text-sm text-zinc-700">
      <p className="font-medium text-zinc-900">Preview could not load</p>
      <p className="mt-2 font-mono text-xs text-zinc-600">{error.message}</p>
      <p className="mt-3 text-zinc-600">
        Many animation modules need props, context, or WebGL—wire a custom
        preview in{" "}
        <code className="rounded bg-zinc-200 px-1 py-0.5 text-xs">
          src/learn/animationPreviewOverrides.tsx
        </code>
        .
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 hover:bg-zinc-100"
      >
        Retry
      </button>
    </div>
  );
}
