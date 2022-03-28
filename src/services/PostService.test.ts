import PostService from "./PostService";
import { handleError, _checkDataErrors, _prepareParams, sortUsersAlphabetically } from "./PostService";
import PostRequest from "../interfaces/PostRequest";
import User from "../interfaces/User";

import { mockUsers } from "../mockData/mockUser";

describe('PostService', () => {

    jest.spyOn(window, "alert").mockImplementation(() => {});

	test('handleError function', () => {
		
        let error: any;

        error = handleError();
        expect(error).toBeInstanceOf(Error);

        error = handleError(null);
        expect(error).toBeInstanceOf(Error);

        error = handleError("");
        expect(error).toBeInstanceOf(Error);

        error = handleError(896);
        expect(error).toBeInstanceOf(Error);

        error = handleError({});
        expect(error).toBeInstanceOf(Error);

        error = handleError([]);
        expect(error).toBeInstanceOf(Error);

 	});

    test('_checkDataErrors function', () => {
		
        let error: any;

        let postRequest: PostRequest;

        error = _checkDataErrors(postRequest!);
        expect(error).toBeInstanceOf(Error || null);

        postRequest = {
            sl_token: null!,
            page: null!
        };
        error = _checkDataErrors(postRequest!);
        expect(error).toBeInstanceOf(Error || null);

        postRequest = {
            sl_token: "",
            page: null!
        };
        error = _checkDataErrors(postRequest!);
        expect(error).toBeInstanceOf(Error || null);
 	});

    test('_prepareParams function', () => {

        let response: string;

        let postRequest: PostRequest;

        postRequest = {
            sl_token: "",
            page: null!
        };

        response = _prepareParams(postRequest);
        expect(typeof response).toBe("string")

        response = _prepareParams(null!);
        expect(typeof response).toBe("string")

        postRequest = {
            sl_token: null!,
            page: null!
        };

        response = _prepareParams(postRequest);
        expect(typeof response).toBe("string")

    })

    test('sortUsersAlphabetically function', () => {

        let users: User[] = mockUsers;
        let sortedUsers: User[];

        sortedUsers = sortUsersAlphabetically(users);
        expect(sortedUsers[0].name).toBe("Britany Heise");
    })

});
