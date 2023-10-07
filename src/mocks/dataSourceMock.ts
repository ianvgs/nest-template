export const queryRunnerMock = {
    connect: jest.fn(),
    startTransaction: jest.fn(),
    manager: {
        save: jest.fn(),
    },
    commitTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    release: jest.fn(),
};

export const dataSourceMock = {
    createQueryRunner: jest.fn(() => queryRunnerMock),
};