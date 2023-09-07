import React, { ErrorInfo, ReactNode, Suspense } from 'react';
import { ErrorPage } from 'widgets/ErrorPage';

interface ErrorBoundaryPropsI {
   children: ReactNode;
}

interface ErrorBoundaryStateI {
   hasError: boolean;
}

class ErrorBoundary
    extends React.Component<ErrorBoundaryPropsI, ErrorBoundaryStateI> {
    constructor(props: ErrorBoundaryPropsI) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // eslint-disable-next-line no-console
        console.log(error, errorInfo);
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;
        if (hasError) {
            // You can render any custom fallback UI
            // eslint-disable-next-line i18next/no-literal-string
            return (
                <Suspense fallback="">
                    <ErrorPage />
                </Suspense>
            );
        }

        return children;
    }
}

export default ErrorBoundary;
