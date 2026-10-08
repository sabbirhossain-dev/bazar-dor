
interface IChange{
    dir: "up" | "down" | "flat"
    pct: number
}

export interface IType{
    id: number | string,
    slug: string,
    nameBn: string,
    category: string,
    categoryNameBn: string,
    categoryIcon: string,
    unit: string,
    image: string,
    today: number,
    yesterday: number,
    lastWeek: number,
    lastMonth: number,
    change: IChange,
    markets: []
}