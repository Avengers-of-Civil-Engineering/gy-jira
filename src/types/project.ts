export interface Project {
  id: number;
  name: string;
  personId: number;
  // pin: 是否收藏
  pin: boolean;
  organization: string;
  createAt: number;
  updateAt: number;
}
