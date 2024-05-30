type PickUnion<T, P extends T> = T extends P ? P : never;
