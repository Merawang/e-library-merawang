import axios from "axios";

const useAdd = ({ url, dispatch, type, setMessage, setLoading }) => {
    const add = async (payload) => {
        setLoading(true);
        try {
            console.log(payload)
            const response = await axios.post(url, payload)

            console.log(response.data.data)
            dispatch({ type, payload: response.data.data });
            setMessage({ error: false, severity: 'success', message: `Sukses melakukan tambah data` })
        }
        catch (error) {
            const errorMessage = error.response.data.error || error.message || 'Terjadi kesalahan pada server'
            alert(errorMessage);
            console.error(error);

            setMessage({ error: true, severity: 'error', message: errorMessage });
        }
        finally {
            setLoading(false);
        }
    }

    const handleAdd = async (e, payload) => {
        e.stopPropagation();
        e.preventDefault();

        if (payload) {
            await add(payload)
        }

    }

    return { add, handleAdd };

}

export default useAdd;