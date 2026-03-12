export type TypedTemplate<TImplicit, TRest = object> = {
  [K in keyof TRest]: TRest[K];
} & {
  $implicit: TImplicit;
};
