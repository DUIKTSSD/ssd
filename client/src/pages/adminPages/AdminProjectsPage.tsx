import React, {useEffect, useState} from 'react';
import {ProjectsData} from "../../components/adminPage/types/adminTypes.ts";
import AdminPageTemplate from "../../components/adminPage/AdminPageTemplate.tsx";
import AdminModContent from "../../components/adminPage/modules/adminModeratorContent/AdminModContent.tsx";
import axios from "axios";
import Cookies from "js-cookie";


const AdminProjectsPage = () => {

    const [projectsData, setProjectsData] = useState<ProjectsData[]>([])
    const projectsUrl = 'http://localhost:8080/api/projects/admin/toinspection'


    useEffect(() => {
        fetchData().then(r => console.log(r))
    }, []);

    const fetchData = async() => {
            const token = Cookies.get('token')
            const response = await axios.get<ProjectsData[]>(projectsUrl, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true
            })
            setProjectsData(response.data)
        }

    return (
        <div>
            {/*<AdminPageTemplate type="projects" children={<AdminModContent data={[*/}
            {/*    {*/}
            {/*        type: "projects",*/}
            {/*        id: 1,*/}
            {/*        title: "title2",*/}
            {/*        mainText: "lalala",*/}
            {/*        wishes: "human2",*/}
            {/*        technologyStack: "java react etc",*/}
            {/*    },*/}
            {/*    {*/}
            {/*        type: "projects",*/}
            {/*        id: 1,*/}
            {/*        title: "title2",*/}
            {/*        mainText: "lalala",*/}
            {/*        wishes: "human2",*/}
            {/*        technologyStack: "java react etc",*/}
            {}
            {/*    },*/}
            {/*]}/>}/>*/}
            <AdminPageTemplate type="projects" children={<AdminModContent data={projectsData}/>}/>
        </div>
    );
};

export default AdminProjectsPage;