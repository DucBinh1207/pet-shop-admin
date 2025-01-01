export type ProvinceType = {
  name: string;
  code: number;
  districts: DistrictType[];
};

export type DistrictType = {
  name: string;
  code: number;
  wards: WardType[];
};

export type WardType = {
  name: string;
};
