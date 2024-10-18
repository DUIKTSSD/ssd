import React, {useEffect, useState} from 'react';
import AdminPageTemplate from "../../components/adminPage/AdminPageTemplate.tsx";
import {MemesData} from "../../components/adminPage/types/adminTypes.ts";

const MemesPage:React.FC = () => {
    const [moderatorData, setModeratorData] = useState<MemesData | null>(null)

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch('/api/memes')
                if(!response.ok) {
                    throw new Error('Internet problem')
                }

                const data = await response.json()

                setModeratorData({
                    ...data,
                    onApprove: () => {
                        console.log('memes approved', data.id)
                    },
                    onReject: () => {
                        console.log("memes rejected", data.id)
                    }
                })
            } catch(err) {
                console.log('Error while response', err)
            }
        };

        fetchData()
    }, [])


    return (
        <div>
            {moderatorData ? (
                <AdminPageTemplate type="memes" moderatorData={moderatorData}/>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MemesPage;