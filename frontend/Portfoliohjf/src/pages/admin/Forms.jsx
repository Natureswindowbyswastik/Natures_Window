import { useState, useEffect } from "react";
import axios from "axios";


function Forms() {
    const [forms, setForms] = useState([]);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/form/getform`);
                setForms(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchForms();
    }, []);

    return (
        <div className="p-4 text-white  w-full">
            <h2 className="text-2xl font-bold">Submitted Forms</h2>
            {forms.length === 0 ? <p>No forms submitted yet.</p> : (
                <ul className="mt-4 flex w-full flex-col">
                    {forms.map(form => (
                        <li key={form._id} className="bg-grey/40 p-3 mb-2 rounded-md">
                            <p><strong>Name:</strong> {form.firstName} {form.lastName}</p>
                            <p><strong>Email:</strong> {form.email}</p>
                            <p><strong>Phone:</strong> {form.phoneNumber}</p>
                            <p><strong>Title:</strong> {form.title}</p>
                            <p><strong>Message:</strong> {form.message}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Forms