import React, {useRef, useState} from 'react';
import axios from 'axios';

const EmployeeUploadForm = (props) => {
    const [file, setFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const filePlaceholder = useRef();
    const reset = () => {
        filePlaceholder.current.value = "";
    };
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (file == null) {
            setErrorMessage('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/employees/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (Object.keys(response.data).length === 0) {
                setErrorMessage("Invalid data, check if column names are correct (name, email, phone).");
            } else {
                setSuccessMessage("Data uploaded successfully!");
                reset();
                setFile(null);
                props.onUploadSuccess(response.data);
            }
        } catch (error) {
            setErrorMessage(error.response.data);
        }
    };

    return (
        <div>
            <h2>CSV uploader</h2>
            {successMessage && <p className="text-success">{successMessage}</p>}
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="file" className="form-label">
                        Select file
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        ref={filePlaceholder}
                        id="file"
                        accept=".csv"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="btn btn-dark">
                    Upload
                </button>
            </form>
        </div>
    );
};
export default EmployeeUploadForm;