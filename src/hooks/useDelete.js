import axios from "axios";

const useDelete = ({ url, dispatch, type, setMessage, setLoading }) => {
    const remove = async (id) => {
        setLoading(true);
        try {
            const response = await axios.delete(`${url}/${id}`);

            dispatch({type, payload: response.data.data});
            setMessage({ error: false, severity: 'success', message: `Sukses melakukan hapus data` })
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

    const handleDelete = async (e, id, title) => {
        e.stopPropagation();
        e.preventDefault();

        if (window.confirm(title)) {
            await remove(id);
        }

    }

    return { remove, handleDelete };

}

export default useDelete;