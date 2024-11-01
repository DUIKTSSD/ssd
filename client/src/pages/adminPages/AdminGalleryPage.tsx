import React, {useEffect, useState} from 'react';
import AdminPageTemplate from "../../components/adminPage/AdminPageTemplate.tsx";
import {GalleryData} from "../../components/adminPage/types/adminTypes.ts";


const AdminGalleryPage: React.FC = () => {
    const [moderatorData, setModeratorData] = useState<GalleryData | null>(null)

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch('/api/gallery')
                if(!response.ok) {
                    throw new Error('Internet problem')
                }

                const data = await response.json()

                setModeratorData({
                    ...data,
                    onApprove: () => {
                        console.log("Photo approved", data.id)
                    },
                    onRejected: () => {
                        console.log("Photo rejected", data.id)
                    }
                })
            } catch(err) {
                console.log("Error while response", err)
            }
        };

        fetchData()
    }, []);


    return (
        <div>
            {moderatorData ? (
                <AdminPageTemplate type="gallery" moderatorData={moderatorData}/>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AdminGalleryPage;