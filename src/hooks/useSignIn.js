import axios from "axios";

const useSignIn = ({ url, dispatch, type, setMessage, setLoading }) => {
    const signin = async (payload) => {
        setLoading(true);
        try {
            const response = await axios.post(url, payload);

            if (response?.data?.success) {
                sessionStorage.setItem('user', JSON.stringify(response?.data?.data?.user));
                sessionStorage.setItem('accessToken', JSON.stringify(response?.data?.data?.accessToken));
                dispatch({ type, payload: response?.data?.data });

                setMessage({ error: false, severity: 'success', message: `Sukses melakukan signin` });
                location.replace('/')
            }
        }
        catch (error) {
            const errorMessage = error?.response?.data?.error || error.message || 'Terjadi kesalahan pada server';
            alert(errorMessage);
            console.error(error);

            setMessage({ error: true, severity: 'error', message: errorMessage });
        }
        finally {
            setLoading(false);
        }
    }

    const handleSignIn = async (e, payload) => {
        e.stopPropagation();
        e.preventDefault();

        if (!!Object.keys(payload).length) {
            await signin(payload)
        }

    }

    return { signin, handleSignIn };

}

export default useSignIn;