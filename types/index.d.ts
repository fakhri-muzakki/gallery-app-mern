export interface APIResponse {
  success: boolean;
  message: string;
  data: Gallery[];
}

export interface Gallery {
  id: string;
  name: string;
  description: string;
  image: string;
  //   createdAt: Date;
  //   updatedAt: Date;
}
