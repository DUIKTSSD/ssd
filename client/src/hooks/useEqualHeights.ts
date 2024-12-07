import {useEffect, useRef} from "react";

export const setEqualHeights = (refClassName: string) => {
    const ref = useRef<HTMLDivElement | null>(null); // Create a ref for the element
    useEffect(() => {
        const setEqualHeights = () => {
            const items = document.querySelectorAll(`.${refClassName}`)

            items.forEach((item) => {
                (item as HTMLElement).style.height = "auto";
            })
            const heights = Array.from(items).map(item => (item as HTMLElement).offsetHeight)
            const maxHeight = Math.max(...heights)
            items.forEach((card) => {
                (card as HTMLElement).style.height = `${maxHeight}px`
            })
        };

        setEqualHeights()

        const handleResize = () => {
            setEqualHeights()
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [refClassName]);
     return ref;
}