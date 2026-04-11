import { Toaster } from "react-hot-toast";
import axios from 'axios'

export function ToasterConfig() {
    return (
        <Toaster
            position="top-center"
            toastOptions={{
                duration: 3000,
                style: {
                    fontWeight: 800,
                    borderRadius: '8px',
                },

                success: {
                    style: {
                        background: '#16a34aae', // green
                        color: '#fff',
                    },
                },

                error: {
                    style: {
                        background: '#dc2626b7', // red
                        color: '#fff',
                    },
                },
            }}
        />
    )
}

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
})