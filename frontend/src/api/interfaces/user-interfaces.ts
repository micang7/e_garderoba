import type { components, operations } from '../types';

type UserListResponse = components['schemas']['UserListResponseDto'];
type UserResponse = components['schemas']['UserResponseDto'];
type CreateUserDto = components['schemas']['CreateUserDto'];
type UpdateUserDto = components['schemas']['UpdateUserDto'];
type User = components['schemas']['UserDto'];
type UserQuery = operations['UserController_findAll']['parameters']['query'];

export type {
  UserListResponse,
  UserResponse,
  CreateUserDto,
  UpdateUserDto,
  User,
  UserQuery,
};
