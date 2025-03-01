interface IDataSource {
    getOne(id: number): Promise<any>;
    getMany(where?: any): Promise<any[]>;
    getRelated(id: number, relation: string): Promise<any>
}

export default IDataSource;