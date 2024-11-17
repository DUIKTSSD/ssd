import { useEffect, useState, RefObject } from "react";

const useDynamicGridColumns = (containerRef: RefObject<HTMLElement>, defaultColumns: string = 'repeat(3, 1fr)') => {
    const [gridColumns, setGridColumns] = useState<string>(defaultColumns);

    useEffect(() => {
        if (!containerRef.current) return;
        const itemCount = containerRef.current?.childElementCount;
        setGridColumns(`repeat(${itemCount}, 1fr)`);
    }, [containerRef]);

    return gridColumns;
};

export default useDynamicGridColumns;