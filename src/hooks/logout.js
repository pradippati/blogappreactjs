import axios from 'axios';

const logout = async () => {
    try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:4000/auth/logout', {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirect to login page
    } catch (err) {
        console.error('Error during logout', err);
    }
};

export default logout;
