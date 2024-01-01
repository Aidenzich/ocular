import { IsEmail, IsEnum, IsOptional, IsString, ValidateNested } from "class-validator"

import { UserRoles } from "../../../models/user"
import UserService from "../../../services/user"
import _ from "lodash"
import { validator } from "../../../utils/validator"
import { EntityManager } from "typeorm"

//"Create a User.
export default async (req, res) => {
  const validated = await validator(UserCreateUserRequest, req.body)

  const userService: UserService = req.scope.resolve("userService")
  const data = _.omit(validated, ["password"])

  const manager: EntityManager = req.scope.resolve("manager")
  const user = await manager.transaction(async (transactionManager) => {
    return await userService
      .withTransaction(transactionManager)
      .create(data, validated.password)
  })

  res.status(200).json({ user: _.omit(user, ["password_hash"]) })
}

export class OrganisationCreateRequest {
  @IsString()
  name: string
}

export class UserCreateUserRequest {
  @IsEmail()
  email: string

  @IsOptional()
  @IsString()
  first_name?: string

  @IsOptional()
  @IsString()
  last_name?: string

  @IsEnum(UserRoles)
  role: UserRoles

  @IsString()
  password: string

  @ValidateNested({ each: true })
  organisation: OrganisationCreateRequest
}
