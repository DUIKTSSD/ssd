export interface ModeratorContentBase {
    type: "projects" | "news" | "gallery" | "memes",
    id: number,
    onApprove: () => void,
    onReject: () => void
}

export interface ProjectsData extends ModeratorContentBase {
    type: "projects",
    title: string,
    mainText: string,
    technologyStack: string,
    wishes: string,
}

export interface NewsData extends ModeratorContentBase {
    type: "news",
    title: string,
    description: string,
    author: string,
    image: string
}

export interface MemesData extends ModeratorContentBase {
    type: "memes",
    image: string,
    owner: string
}

export interface GalleryData extends ModeratorContentBase {
    type: "gallery",
    image: string,
    owner: string
}