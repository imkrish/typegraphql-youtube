import { graphql, Source } from "graphql";
import Maybe from "graphql/tsutils/Maybe";
import { GraphqlUtil } from "../graphql/graphql.util";

export interface TestGQLOptions {
  source: Source | string;
  variableValues?: Maybe<{ [key: string]: any }>;
}

export class TestUtil {
  static async testGQL(options: TestGQLOptions) {
    const { source, variableValues } = options;
    return graphql({
      schema: await GraphqlUtil.getSchema(),
      source,
      variableValues
    });
  }
}
