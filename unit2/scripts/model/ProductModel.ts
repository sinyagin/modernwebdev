// Implement "POJO" here to keep data of a single Product item.
module auction.model {

    export class ProductModel {
        id: number;
        title: string;
        thumb: string;
        description: string;
        timeleft: number;
        watchers: number;
        price: number;
    }
}
