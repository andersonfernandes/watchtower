// @generated
// This file is automatically generated by Kanel. Do not modify manually.

/** Identifier type for public.users */
export type UserId = string & { __brand: 'UsersId' };

/** Represents the table public.users */
export default interface User {
  id: UserId;

  name: string;

  username: string;

  password: string;

  created_at: Date;

  updated_at: Date;
}

/** Represents the initializer for the table public.users */
export interface UsersInitializer {
  /** Default value: gen_random_uuid() */
  id?: UserId;

  name: string;

  username: string;

  password: string;

  /** Default value: CURRENT_TIMESTAMP */
  created_at?: Date;

  /** Default value: CURRENT_TIMESTAMP */
  updated_at?: Date;
}

/** Represents the mutator for the table public.users */
export interface UsersMutator {
  id?: UserId;

  name?: string;

  username?: string;

  password?: string;

  created_at?: Date;

  updated_at?: Date;
}
