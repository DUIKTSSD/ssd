import React from 'react';


interface ProjectRowBase {
    type: "projects" | "news" | "memes" | "gallery";
    id: number,
    onApprove: () => void;
    onReject: () => void;
}

interface ProjectsData extends ProjectRowBase {
    type: "projects",
    title: string,
    owner: string,
    description: string
}

interface NewsData extends ProjectRowBase {
    type: 'news',
    title: string,
    date: string,
    description: string,
    author: string,
    image: string
}

interface MemesData extends ProjectRowBase {
    type: "memes",
    image: string,
    owner: string
}

interface GalleryData extends ProjectRowBase {
    type: "gallery",
    image: string,
    owner: string
}

type ProjectRowProps = ProjectsData | NewsData | MemesData | GalleryData
const ProjectRow:React.FC<ProjectRowProps> = (props) => {

    if(props.type === "projects") {
        return (
            <div className={styles.projectsRow}>
                <p>{props.id}</p>
                <h3>Project: {props.title}</h3>
                <p>Owner: {props.owner}</p>
                <p>Description: {props.description}</p>
                <div className={projectRow.actions}>
                    <button onClick={props.onReject}>Reject</button>
                    <button onClick={props.onApprove}>Approve</button>
                </div>
            </div>
        )
    }
    if(props.type === "news") {
        return (
            <div className={styles.projectRow}>
                <p>{props.id}</p>
                <h3>News: {props.title}</h3>
                <p>Date: {props.date}</p>
                <p>{props.description}</p>
                <div className={projectRow.actions}>
                    <button onClick={props.onReject}>Reject</button>
                    <button onClick={props.onApprove}>Approve</button>
                </div>
            </div>
        )
    }
    if(props.type === "gallery") {
        return (
            <div className={styles.galleryRow}>
                <p>{props.id}</p>
                <p>{props.owner}</p>
                <div className={projectRow.actions}>
                    <button onClick={props.onReject}>Reject</button>
                    <button onClick={props.onApprove}>Approve</button>
                </div>
            </div>
        )
    }
    if(props.type === "memes") {
        return (
            <div className={styles.memesRow}>
                <p>{props.id}</p>
                <p>{props.owner}</p>
                <div className={projectRow.actions}>
                    <button onClick={props.onReject}>Reject</button>
                    <button onClick={props.onApprove}>Approve</button>
                </div>
            </div>
        )
    }
};

export default ProjectRow;