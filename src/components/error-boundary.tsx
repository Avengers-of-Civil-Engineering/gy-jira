import React from "react";

type FallbackRenderProps = (props: {
  error: Error | null;
}) => React.ReactElement;

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRenderProps }>,
  { error: Error | null }
> {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    } else {
      return children;
    }
  }
}
