import axios from "axios";

const useSignOut = ({ dispatch, type, setMessage, setLoading }) => {
    const signout = async () => {
        setLoading(true);
        try {
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('accessToken');

            setMessage({ error: false, severity: 'success', message: `Sukses melakukan signout` });
            dispatch({ type, payload: null });
            location.replace('/')
        }
        catch (error) {
            const errorMessage = error?.response?.data?.error || error.message || 'Terjadi kesalahan pada server'
            alert(errorMessage);
            console.error(error);

            setMessage({ error: true, severity: 'error', message: errorMessage });
        }
        finally {
            setLoading(false);
        }
    }

    const handleSignOut = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        signout();

    }

    return { signout, handleSignOut };

}

export default useSignOut;