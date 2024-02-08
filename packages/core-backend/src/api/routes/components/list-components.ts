import { FilterableComponentProps } from "../../../types/component"
import { IsNumber, IsOptional, IsString } from "class-validator"
import { Type } from "class-transformer"
import { ComponentService } from "../../../services"


export default async (req, res) => {
  const componentService: ComponentService = req.scope.resolve("componentService")


  const { skip, take} = req.listConfig

  const [components, count] = await componentService.listAndCount(
    req.filterableFields,
    req.listConfig
  )
  // Future: Call Other Service To Add Metadata To Catalog Components


  res.json({
    components,
    count,
    offset: skip,
    limit: take,
  })
}



export class GetComponentsParams extends FilterableComponentProps {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  offset?: number = 0

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 50

  @IsString()
  @IsOptional()
  expand?: string

  @IsString()
  @IsOptional()
  fields?: string

  @IsString()
  @IsOptional()
  order?: string
}