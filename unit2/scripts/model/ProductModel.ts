// Implement "POJO" here to keep data of a single Product item.
module ProductModel {

    export interface Item {
        id: number;
        title: string;
        thumb: string;
        description: string;
        timeleft: number;
        watchers: number;
        price: number;
    }

    export interface Items {
        heading: string;
        items: Item[];
    }
}
