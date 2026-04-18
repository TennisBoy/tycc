/** Generic interface for objects that have an id field. */
export interface IHasId<T = string> {
  id?: T;
}

/** Generic interface for objects with a key/value pair (id + name). */
export interface IHasKeyValue extends IHasId<string> {
  name?: string;
}

/** Represents an active filter group shown in the DataTableToolbar. */
export interface ActiveFilter {
  title: string;
  appliedFilters: IHasKeyValue[];
}
