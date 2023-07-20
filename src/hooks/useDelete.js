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
            alert(error.message);
            console.error(error);

            setMessage({ error: true, severity: 'error', message: error.message || `Terjadi kesalahan pada server` });
        }
        finally {
            setLoading(false);
        }
    }

    const handleDelete = async (e, id, title) => {
        e.stopPropagation();
        e.preventDefault();

        if (window.confirm(`Apakah kamu yakin ingin menghapus ${title}?`)) {
            await remove(id);
        }

    }

    return { remove, handleDelete };

}

export default useDelete;