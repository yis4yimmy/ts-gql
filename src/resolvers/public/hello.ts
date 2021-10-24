import { Query, Resolver } from "type-graphql";

@Resolver()
export class Public {
  @Query(() => String)
  hello(): string {
    return "It's me";
  }
}
