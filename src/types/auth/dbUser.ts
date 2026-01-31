export type dbUser = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;

  nationalID: string | null;
  nationality: string | null;
  countryFlag: string | null;

  emailVerified: Date | null;

  isAdmin: boolean;
  is_test_user: boolean | null;
};
