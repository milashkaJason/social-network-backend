export const defaultCount = 10;
export const maxCount = 100;
export const defaultPage = 1;

type Props = {
    items: any;
    count: number;
    page: number;
}

export const getPaginatedItems = ({items, count, page}: Props) => {
    let newCount = count;
    if (count > maxCount) {
        newCount = maxCount;
    }
    return items.slice(newCount * (page - 1), newCount * page);
}