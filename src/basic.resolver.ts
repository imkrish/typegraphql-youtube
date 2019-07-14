import {Query, Resolver} from "type-graphql";

@Resolver()
export class BasicResolver {

    @Query({ nullable: true })
    hello(): string {
        return 'Chao lok'
    }
}
