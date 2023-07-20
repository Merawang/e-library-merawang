import axios from "axios";

const useEdit = ({ url, dispatch, type, setMessage, setLoading }) => {
    const edit = async (id, payload) => {
        setLoading(true);
        try {
            const response = await axios.patch(`${url}/${id}`, payload);

            dispatch({type, payload: response.data.data});
            setMessage({ error: false, severity: 'success', message: `Sukses melakukan edit data` })
        }
        catch (error) {
            alert(error.message);
            console.error(error);

            setMessage({ error: true, severity: 'error', message: error.message || `Terjadi kesalahan pada server` });
        }
        finally {
            setLoading(false);
        }
    }

    const handleEdit = async (e, id, payload) => {
        e.stopPropagation();
        e.preventDefault();

        await edit(id, payload)
    }

    return { edit, handleEdit };

}

export default useEdit;