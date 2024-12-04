import './Errrpage.css'

const ErrorPage = () => {
    return (
        <>
            <div className="error-page">
                <h1>404</h1>
                <p>Oops! The page you are looking for doesn't exist.</p>
                <a href="/">Go Back to Home</a>
            </div>
        </>
    )
}

export default ErrorPage;