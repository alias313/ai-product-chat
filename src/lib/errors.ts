import { Data } from "effect";

export class JsonError extends Data.TaggedError("JsonError")<{ customMessage: string }> {};

export class GenerateTextError extends Data.TaggedError("GenerateTextError")<{ customMessage: string }> {};
