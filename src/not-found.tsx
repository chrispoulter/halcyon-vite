import { Link } from 'react-router';

export default function NotFound() {
    return (
        <div>
            <h1>Not Found</h1>
            <Link to="/">Home</Link>
        </div>
    );
}
