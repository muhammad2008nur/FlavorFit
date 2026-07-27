/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n        query NewToken{\n            newTokens {\n                user{\n                    id\n                }\n            }\n        }\n": typeof types.NewTokenDocument,
    "\n  mutation Login($data: AuthInput!) {\n    login(data: $data) {\n      user {\n        email\n        id\n        role\n      }\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation Logout {\n    logout\n  }\n": typeof types.LogoutDocument,
    "\n  query Me {\n    me {\n      email\n      id\n      role\n      isEmailVerified\n    }\n  }\n": typeof types.MeDocument,
    "\n  mutation Register($data: AuthInput!) {\n    register(data: $data) {\n      user {\n        email\n        id\n        role\n      }\n    }\n  }\n": typeof types.RegisterDocument,
    "\n  mutation RequestPasswordReset($data: RequestPasswordResetTokenInput!) {\n    requestPasswordReset(data: $data)\n  }\n": typeof types.RequestPasswordResetDocument,
    "\n  mutation ResetPassword($data: ResetPasswordInput!) {\n    resetPassword(data: $data)\n  }\n": typeof types.ResetPasswordDocument,
    "\n  mutation VerifyEmail($token: String!) {\n    verifyEmail(token: $token)\n  }\n": typeof types.VerifyEmailDocument,
    "\n  query GetProfile {\n    me {\n      id\n      email\n      profile {\n        id\n        age\n        bio\n        fullName\n        gender\n        avatarUrl\n      }\n      measurements {\n        activityLevel\n        waistCm\n        weightKg\n        armCm\n        chestCm\n        nutritionGoal\n        thighCm\n        goalWeightKg\n        heightCm\n      }\n    }\n  }\n": typeof types.GetProfileDocument,
    "\n  mutation UpdateProfile($data: UserInputUpdate!) {\n    updateProfile(data: $data) {\n      id\n      email\n      profile {\n        id\n        age\n        bio\n        fullName\n        gender\n        avatarUrl\n      }\n      measurements {\n        activityLevel\n        waistCm\n        weightKg\n        armCm\n        chestCm\n        goalWeightKg\n        heightCm\n        nutritionGoal\n        thighCm\n      }\n    }\n  }\n": typeof types.UpdateProfileDocument,
};
const documents: Documents = {
    "\n        query NewToken{\n            newTokens {\n                user{\n                    id\n                }\n            }\n        }\n": types.NewTokenDocument,
    "\n  mutation Login($data: AuthInput!) {\n    login(data: $data) {\n      user {\n        email\n        id\n        role\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Logout {\n    logout\n  }\n": types.LogoutDocument,
    "\n  query Me {\n    me {\n      email\n      id\n      role\n      isEmailVerified\n    }\n  }\n": types.MeDocument,
    "\n  mutation Register($data: AuthInput!) {\n    register(data: $data) {\n      user {\n        email\n        id\n        role\n      }\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation RequestPasswordReset($data: RequestPasswordResetTokenInput!) {\n    requestPasswordReset(data: $data)\n  }\n": types.RequestPasswordResetDocument,
    "\n  mutation ResetPassword($data: ResetPasswordInput!) {\n    resetPassword(data: $data)\n  }\n": types.ResetPasswordDocument,
    "\n  mutation VerifyEmail($token: String!) {\n    verifyEmail(token: $token)\n  }\n": types.VerifyEmailDocument,
    "\n  query GetProfile {\n    me {\n      id\n      email\n      profile {\n        id\n        age\n        bio\n        fullName\n        gender\n        avatarUrl\n      }\n      measurements {\n        activityLevel\n        waistCm\n        weightKg\n        armCm\n        chestCm\n        nutritionGoal\n        thighCm\n        goalWeightKg\n        heightCm\n      }\n    }\n  }\n": types.GetProfileDocument,
    "\n  mutation UpdateProfile($data: UserInputUpdate!) {\n    updateProfile(data: $data) {\n      id\n      email\n      profile {\n        id\n        age\n        bio\n        fullName\n        gender\n        avatarUrl\n      }\n      measurements {\n        activityLevel\n        waistCm\n        weightKg\n        armCm\n        chestCm\n        goalWeightKg\n        heightCm\n        nutritionGoal\n        thighCm\n      }\n    }\n  }\n": types.UpdateProfileDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        query NewToken{\n            newTokens {\n                user{\n                    id\n                }\n            }\n        }\n"): (typeof documents)["\n        query NewToken{\n            newTokens {\n                user{\n                    id\n                }\n            }\n        }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($data: AuthInput!) {\n    login(data: $data) {\n      user {\n        email\n        id\n        role\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($data: AuthInput!) {\n    login(data: $data) {\n      user {\n        email\n        id\n        role\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Logout {\n    logout\n  }\n"): (typeof documents)["\n  mutation Logout {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      email\n      id\n      role\n      isEmailVerified\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      email\n      id\n      role\n      isEmailVerified\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($data: AuthInput!) {\n    register(data: $data) {\n      user {\n        email\n        id\n        role\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Register($data: AuthInput!) {\n    register(data: $data) {\n      user {\n        email\n        id\n        role\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RequestPasswordReset($data: RequestPasswordResetTokenInput!) {\n    requestPasswordReset(data: $data)\n  }\n"): (typeof documents)["\n  mutation RequestPasswordReset($data: RequestPasswordResetTokenInput!) {\n    requestPasswordReset(data: $data)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ResetPassword($data: ResetPasswordInput!) {\n    resetPassword(data: $data)\n  }\n"): (typeof documents)["\n  mutation ResetPassword($data: ResetPasswordInput!) {\n    resetPassword(data: $data)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation VerifyEmail($token: String!) {\n    verifyEmail(token: $token)\n  }\n"): (typeof documents)["\n  mutation VerifyEmail($token: String!) {\n    verifyEmail(token: $token)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProfile {\n    me {\n      id\n      email\n      profile {\n        id\n        age\n        bio\n        fullName\n        gender\n        avatarUrl\n      }\n      measurements {\n        activityLevel\n        waistCm\n        weightKg\n        armCm\n        chestCm\n        nutritionGoal\n        thighCm\n        goalWeightKg\n        heightCm\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProfile {\n    me {\n      id\n      email\n      profile {\n        id\n        age\n        bio\n        fullName\n        gender\n        avatarUrl\n      }\n      measurements {\n        activityLevel\n        waistCm\n        weightKg\n        armCm\n        chestCm\n        nutritionGoal\n        thighCm\n        goalWeightKg\n        heightCm\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProfile($data: UserInputUpdate!) {\n    updateProfile(data: $data) {\n      id\n      email\n      profile {\n        id\n        age\n        bio\n        fullName\n        gender\n        avatarUrl\n      }\n      measurements {\n        activityLevel\n        waistCm\n        weightKg\n        armCm\n        chestCm\n        goalWeightKg\n        heightCm\n        nutritionGoal\n        thighCm\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProfile($data: UserInputUpdate!) {\n    updateProfile(data: $data) {\n      id\n      email\n      profile {\n        id\n        age\n        bio\n        fullName\n        gender\n        avatarUrl\n      }\n      measurements {\n        activityLevel\n        waistCm\n        weightKg\n        armCm\n        chestCm\n        goalWeightKg\n        heightCm\n        nutritionGoal\n        thighCm\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;