import React from 'react'

function NotFoundPage() {
    return (<div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="text-center">
                <h1 className="text-6x1 text-primary mb-4 font-extrabold">
                    404
                </h1>
                <h2 className="text-2x1 font-semibold mb-4">
                    Page Not Found
                </h2>
                <p className="text-base text-muted-foreground">
                    The page you are looking for might have been removed, had its name changed or is temporarily
                    unavailable.
                </p>
                <br/>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a href="/"
                       className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md text-sm font-bold">
                        Go back to Dashboard
                    </a>
                </div>
            </div>
            <div className="mt-12 text-center">
                <p className="text-sm text-muted-foreground">
                    If you think this is a mistake, please contact us at
                </p>
            </div>
            <footer className="mt-12 test-center">
                <p className="text-sm text-muted-foreground">
                    &copy; 2025 ScrumBoard. All rights reserved
                </p>
            </footer>
        </div>);
}

export default NotFoundPage
