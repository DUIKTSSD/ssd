export interface ModeratorContentBase {
    type: "projects" | "news" | "gallery" | "memes"|"documentations"|"announcement"|"documentationLinks"|"collectives",
    id: number,
}

export interface ProjectsData extends ModeratorContentBase {
    type: "projects",
    title: string,
    mainText: string,
    technologyStack: string,
    wishes: string,
    status: boolean,
    phoneNumber: string,
    telegramProfile: string,
    team: [],
    leader: {
        id: number,
        username: string,
        email: string
    },
    isLegal: boolean | null
}
export interface NewsData extends ModeratorContentBase {
    type: "news",
    text: string,
    images: [{
        id: number,
        news:null
        image: string,
    }],
    title: string
    createdAt: string
}
export interface AnnouncementData extends ModeratorContentBase {
    type: "announcement",
    title: string,
    image: string,
    dateOfEvent:string
    description: string
    createdAt: string
}

export interface MemesData extends ModeratorContentBase {
    type: "memes",
    image: string,
    author: {
        id: number,
        username: string,
        email: string
    },
    isLegal: boolean | null,
    createdAt: string
}
export interface DocumentationsData extends ModeratorContentBase {
    type: "documentations",
    name:string,
    file: string,
    author: {
        id: number,
        username: string,
        email: string
    },
    createdAt: string
}
export interface DocumentationLinksData extends ModeratorContentBase {
    type: "documentationLinks",
    url:string,
    description: string,

}

export interface ContentResponse<T extends ModeratorContentBase> {
    content: T[];
}
export interface CollectivesData extends ModeratorContentBase {
    type: "collectives",
    name:string,
    image: string,
    phone: string,
    specialty:string,
    description:string,
    inFact:string,
    team: string | null
    duiktGroup: string
}

export interface GalleryData extends ModeratorContentBase {
    type: "gallery",
    image: string,
    owner: string
}