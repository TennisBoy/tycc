import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Icons } from "./components/ui/icons";
import { Button } from "./components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorId: number;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: undefined,
    errorId: 0,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorId: Date.now() };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Error Boundary Caught Error:
      Message: ${error.message}
      Stack: ${error.stack}
      Component Stack: ${errorInfo.componentStack}`);

    // Log the error to an external service
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-full flex-col items-center justify-center p-4">
          <div className="flex flex-col items-center space-y-4 text-center">
            <Icons.XCircle className="text-destructive h-16 w-16" />
            <h2 className="text-foreground text-2xl font-semibold">Something went wrong</h2>
            <p className="text-muted-foreground">
              {this.state.error?.message ||
                "An unexpected error occurred. Please try refreshing the page."}
            </p>
            <Button variant="default" onClick={() => window.location.reload()} className="mt-4">
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
