import React, {useEffect, useState} from 'react';
import AdminPageTemplate from "../../components/adminPage/AdminPageTemplate.tsx";
import {NewsData} from "../../components/adminPage/types/adminTypes.ts";


const AdminNewsPage:React.FC = () => {
    const [moderatorData, setModeratorData] = useState<NewsData | null>(null)

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch('/api/news')
                if(!response.ok) {
                    throw new Error('Internet problem')
                }
                const data: NewsData = await response.json()

                setModeratorData({
                   ...data,
                    onApprove: () => {
                       console.log('News approved', data.id)
                    },
                    onReject: () => {
                       console.log("News rejected", data.id)
                    }
                })
            } catch(err) {
                console.log("Error while response", err)
            }
        };

        fetchData()
    }, [])

    return (
        <div>
            {moderatorData ? (
                <AdminPageTemplate type="news" moderatorData={moderatorData}/>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AdminNewsPage;