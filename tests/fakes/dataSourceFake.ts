import DataSource from '../../src/database/data-source';

const dataSourceFake = jest.spyOn(DataSource, 'getRepository');

export default dataSourceFake;
