interface Brand {
  _id?: { $oid: string } | string;
  brandName?: unknown;
  yearFounded?: unknown;
  yearCreated?: unknown;
  yearsFounded?: unknown;
  headquarters?: unknown;
  hqAddress?: unknown;
  numberOfLocations?: unknown;
  brand?: unknown;
  [key: string]: unknown;
}

export default Brand;
