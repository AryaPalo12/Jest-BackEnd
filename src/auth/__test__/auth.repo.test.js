const { authUser } = require("../auth.repo");

describe("auth.repo.js", () => {
    describe("#authUser", () => {
      it("should return a user by email!", async () => {
        const result = await authUser({email: 'testing3@gmail.com'});
        expect(result).toBeTruthy();
        expect(result.fullname).toBe('Bambi');
        expect(result.email).toBe('testing3@gmail.com');
      });
      it('should not return a user with an empty args.', async () => {
        const result = await authUser({email: ''});
        expect(result).toBeFalsy();
      })
});
});