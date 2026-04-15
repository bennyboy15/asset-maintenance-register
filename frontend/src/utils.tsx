import { Toaster } from "react-hot-toast";
import axios from 'axios'
import { isBefore, isAfter, addDays, startOfDay } from 'date-fns';

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

export function getStatus(targetDate: Date) {
    const today = startOfDay(new Date());
    const twoWeeksFromNow = addDays(today, 14);

    // OVERDUE
    if (isBefore(targetDate, today)) {
        return { label: 'Overdue', color: 'bg-red-600' };
    }

    // UPCOMING
    if (isBefore(targetDate, twoWeeksFromNow)) {
        return { label: 'Upcoming', color: 'bg-yellow-600' };
    }

    // OK
    return { label: 'Ok', color: 'bg-green-600' };
};