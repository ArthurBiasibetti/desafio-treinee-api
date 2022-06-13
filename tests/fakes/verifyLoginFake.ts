import * as userService from '../../src/services/user.service';

const verifyLoginFake = jest.spyOn(userService, 'verifyLogin');

export default verifyLoginFake;
