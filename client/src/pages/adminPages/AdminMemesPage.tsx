import React, { useEffect, useState } from 'react';
import AdminPageTemplate from "../../components/adminPage/AdminPageTemplate";
import { MemesData } from "../../components/adminPage/types/adminTypes";
import AdminModContent from "../../components/adminPage/modules/adminModeratorContent/AdminModContent.tsx";
import api from "../../api";

const AdminMemesPage: React.FC = () => {
    const [moderatorData, setModeratorData] = useState<MemesData[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchMemes();
    }, []);

    const fetchMemes = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await api.get('/memes/admin/memestoinspection');
            if (response && response.data) {
                setModeratorData(response.data);
            } else {
                setModeratorData([]);
            }
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'Failed to fetch memes');
            setModeratorData(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleApprove = async (memeId: number) => {
        try {
            await api.post(`/memes/admin/approve/${memeId}`);
            setModeratorData(prev => prev ? prev.filter(meme => meme.id !== memeId) : null);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'Failed to approve meme');
        }
    };

    const handleReject = async (memeId: number) => {
        try {
            await api.post(`/memes/admin/reject/${memeId}`);
            setModeratorData(prev => prev ? prev.filter(meme => meme.id !== memeId) : null);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'Failed to reject meme');
        }
    };

    const memesWithHandlers = moderatorData?.map(meme => ({
        ...meme,
        onApprove: () => handleApprove(meme.id),
        onReject: () => handleReject(meme.id)
    })) || [];

    return (
        <AdminPageTemplate type="memes">
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <p>Loading memes...</p>
                </div>
            ) : error ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-red-500">{error}</p>
                </div>
            ) : memesWithHandlers.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                    <p>No memes to moderate</p>
                </div>
            ) : (
                <AdminModContent data={memesWithHandlers} />
            )}
        </AdminPageTemplate>
    );
};

export default AdminMemesPage;